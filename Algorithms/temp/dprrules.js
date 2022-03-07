// Dynamic proportional ranking rules.
const assert = require('assert');

class DPRRule {
    // Class for DPR rules containing basic information and function call
    constructor(rule_id, shortname, longname, fct, algorithms=('standard'), resolute=(true, false)) {
        this.rule_id = rule_id;
        this.shortname = shortname;
        this.longname = longname;
        this.fct = fct;
        this.algorithms = algorithms;
        // algorithms should be sorted by speed (fastest first)
        this.resolute = resolute;
    }

    // assert(resolute.length > 0);
    // assert(algorithms.length > 0);

    compute(profile, tau, /**kwargs*/) {
        return this.fct(profile, tau, /**kwargs*/);
    }

    // # def fastest_algo(self):
    // #     for algo in self.algorithms:
    // #         if algo == "gurobi" and not abcrules_gurobi.available:
    // #             continue
    // #         return algo

}


function compute_lazy_seqpav(profile, tau, resolute=true, verbose=0) {

    var score_fct = scores.get_scorefct('pav', profile.length);

    // optional output
    if (verbose > 0) {
        console.log(rules["lseqpav"].longname);
    }
    // end of optional output

    var candidate_scores = [];
    candidate_scores = scores.marginal_thiele_scores_add(score_fct, profile, tau);

    // optional output
    if (verbose > 0) {
        console.log("Using marginal contributions of");
        for (let i = 0; i < profile.num_cand; i++) {
            if (candidate_scores[i] >= 0) {
                console.log(`Candidate ${JSON.stringify(i)}: ${JSON.stringify(candidate_scores[i])}`);
            }
        }
    }
    // end of optional output

    // in lazy rules we can just ignore canidates from tau and remove them later
    var ranking = [];
    // ----------------------------------------line 78-81 python-----------------------------------------
    for (let i = 0; i < candidate_scores.length; i++) {
        ranking[i] = i;        
    }

    // optional output
    if (verbose > 0) {
        console.log(`The ranking, using tau = ${JSON.stringify(tau)} is `);
        console.log(ranking);
    }
    // end of optional output

    return ranking;
}

function compute_dynamic_seqpav(profile, tau, resolute=true, verbose=0) {

    var scorefct_str = 'pav';
    var score_fct = scores.get_scorefct('pav', profile.length);

    // optional output
    if (verbose > 0) {
        console.log(rules["lseqpav"].longname);
    }
    // end of optional output

    var ranking = [];
    var d = [];
    var additional_score_cand = [];
    var next_cand = 0;
    var tied_cands = [];

    // optional output
    if (verbose >= 2) {
        console.log(`starting with the empty committee and tau = ${JSON.stringify(tau)} 
                    (score = ${JSON.stringify(scores.thiele_score(scorefct_str, profile, tau + ranking))})`);
    }
    // end of optional output

    // build the ranking starting with the empty set
    for (let i = 0; i < profile.num_cand; i++) {
        d.concat(tau).concat(ranking);
        additional_score_cand = scores.marginal_thiele_scores_add(score_fct, profile, d);
        // console.log(additional_score_cand);
        next_cand = additional_score_cand[Math.max(additional_score_cand)];
        // check whether all candidates outide of tau have been ranked
        if (Math.max(additional_score_cand) < 0) {
            break;
        }
        ranking.push(next_cand);

        // optional output
        if (verbose >= 2) {
            console.log(`adding candidate number ${JSON.stringify(ranking.length)}: ${JSON.stringify(profile.names[next_cand])}, 
            score increases by ${JSON.stringify(Math.max(additional_score_cand))}  to a total of 
            ${JSON.stringify(scores.thiele_score(scorefct_str, profile, tau + ranking))}`);
            for (let i = 0; i < additional_score_cand.length; i++) {
                if ((i > next_cand) && (additional_score_cand[i] == Math.max(additional_score_cand))) {
                    tied_cands.push(i);
                }                
            }
            if (tied_cands.length > 0) {
                console.log(`tie broken in favor of ${JSON.stringify(next_cand)} candidates ${JSON.stringify(str_candset(tied_cands))} 
                would increase the score by the same amount (${JSON.stringify(Math.max(additional_score_cand))})`);
            }
        }
    }

    // optional output
    if (verbose > 0) {
        console.log(`The ranking, using tau = ${JSON.stringify(tau)} is `);
        console.log(ranking);
    }
    // end of optional output

    return ranking;
}


function compute_av(profile, tau, resolute=true, verbose=0) {
    // Dynamic sequential Phragmen (dynamic-seq-Phragmen)

    // optional output
    if (verbose > 0) {
        console.log(rules["av"].longname);
    }
    // end of optional output

    var ranking = [];
    var appr_scores = [];
    for (let i = 0; i < profile.num_cand; i++) {
        appr_scores.push(0);        
  }
    for (const pref in profile) {
        for (const cand in pref) {
            // (Classic) Approval Voting
            appr_scores[cand] += pref.weight;
        }
    }

    // sort candidates by approval ranking and output ranking\tau
    // ranking = ---------------------------line 348-351 python-------------------------------------------

    // optional output
    if (verbose > 0) {
        console.log(`The ranking, using tau = ${JSON.stringify(tau)} is `);
        console.log(ranking);
    }
    // end of optional output

    return ranking;
}


__RULESINFO = [
    ("lseqpav", "lazy seq-PAV", "lazy sequential PAV", compute_lazy_seqpav, ("standard"), (true, false)),
    ("dseqpav", "dynamic seq-PAV", "dynamic sequential PAV", compute_dynamic_seqpav, ("standard"), (true, false)),
    ("lseqphrag", "lazy seq-Phragmen", "lazy sequential Phragmen", compute_lazy_seqphrag, ("standard"), (true, false)),
    ("dseqphrag", "dynamic seq-Phragmen", "dynamic sequential Phragmen", compute_dynamic_seqphrag, ("standard"), (true, false)),
    ("av", "AV", "approval voting", compute_av, ("standard"), (true, false))
];
rules = {};
for (const ruleinfo in __RULESINFO) {
    rules[ruleinfo[0]] = DPRRule(ruleinfo);
    // rules[ruleinfo[0]] = DPRRule(*ruleinfo);
}