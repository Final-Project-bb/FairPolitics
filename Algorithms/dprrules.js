// Dynamic proportional ranking rules.
const DPRSequence = require('./dprsequence');
const { sort_committees, enough_approved_candidates, str_candset, str_candsets, str_committees_header, hamming } = require('./misc');
const { get_scorefct, thiele_score, __pav_score_fct, __slav_score_fct, __cc_score_fct, __av_score_fct, __geom_score_fct,
    cumulative_score_fct, marginal_thiele_scores_add, marginal_thiele_scores_remove, monroescore } = require('./scores');
// const assert = require('assert');

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

    // compute(profile, tau, ...args) {
    //     return this.fct(profile, tau, ...args);
    // }

    // # def fastest_algo(self):
    // #     for algo in self.algorithms:
    // #         if algo == "gurobi" and not abcrules_gurobi.available:
    // #             continue
    // #         return algo

}

function compute(profile, rule_name, tau, ...args) {
    return rule_name[3](profile, rule_name, tau, ...args);
}

function compute_lazy_seqpav(profile, rule_name, tau, verbose=0, resolute=true) {

    var scorefct_str = 'pav';
    var score_fct = get_scorefct(scorefct_str, profile[2].length);

    // optional output
    if (verbose > 0) {
        console.log(`${JSON.stringify(this.rule_name[2])}`);
    }
    // end of optional output

    var ranking = [];
    var candidate_scores = [];
    var temp = [];
    candidate_scores = marginal_thiele_scores_add(score_fct, profile, tau);

    // optional output
    if (verbose > 0) {
        console.log("Using marginal contributions of");
        for (let i = 0; i < profile[1]; i++) {
            if (candidate_scores[i] >= 0) {
                console.log(`Candidate ${JSON.stringify(i)}: ${JSON.stringify(candidate_scores[i])}`);
            }
        }
    }
    // end of optional output

    // in lazy rules we can just ignore canidates from tau and remove them later
    temp = [...candidate_scores];
    temp.sort();
    temp.reverse();
    for (const x of temp) {
        var i = candidate_scores.indexOf(x);
        if (i != -1 && !ranking.includes(i)) {
            ranking.push(i);
        }
        else {
            while (i != -1) {
                i = candidate_scores.indexOf(x, i+1);
                if (i != -1 && !ranking.includes(i)) {
                    ranking.push(i);
                    break;
                }
            }
        }
    }
    ranking = ranking.filter(x => !tau.includes(x));

    // optional output
    if (verbose > 0) {
        console.log(`The ranking, using tau = ${tau} is ${ranking}`);
    }
    // end of optional output

    return ranking;
}

function compute_dynamic_seqpav(profile, rule_name, tau, verbose=0, resolute=true) {

    var scorefct_str = 'pav';
    var score_fct = get_scorefct(scorefct_str, profile[2].length); 

    // optional output
    if (verbose > 0) {
        console.log(`${JSON.stringify(this.rule_name[2])}`);
    }
    // end of optional output

    var ranking = [];
    var d = [];
    var additional_score_cand = [];
    var tied_cands = [];
    var next_cand = 0;

    // optional output
    if (verbose >= 2) {
        console.log(`starting with the empty committee and tau = ${tau} 
                    (score = ${JSON.stringify(thiele_score(scorefct_str, profile, tau + ranking))})`);
    }
    // end of optional output

    // build the ranking starting with the empty set
    for (let i = 0; i < profile[1]; i++) {
        d = tau.concat(ranking);
        additional_score_cand = marginal_thiele_scores_add(score_fct, profile, d);
        next_cand = additional_score_cand.indexOf(Math.max(...additional_score_cand));
        // check whether all candidates outide of tau have been ranked
        if (Math.max(...additional_score_cand) < 0) {
            break;
        }
        ranking.push(next_cand);

        // optional output
        if (verbose >= 2) {
            console.log(`adding candidate number ${JSON.stringify(ranking.length)}: ${JSON.stringify(profile[0][next_cand])}, 
            score increases by ${JSON.stringify(Math.max(...additional_score_cand))}  to a total of 
            ${JSON.stringify(thiele_score(scorefct_str, profile, tau + ranking))}`);
            for (let i = 0; i < additional_score_cand.length; i++) {
                if ((i > next_cand) && (additional_score_cand[i] == Math.max(...additional_score_cand))) {
                    tied_cands.push(i);
                }                
            }
            if (tied_cands.length > 0) {
                console.log(`tie broken in favor of ${JSON.stringify(next_cand)} candidates ${str_candset(tied_cands)} 
                would increase the score by the same amount (${JSON.stringify(Math.max(...additional_score_cand))})`);
            }
        }
    }

    // optional output
    if (verbose > 0) {
        console.log(`The ranking, using tau = ${tau} is ${ranking}`);
    }
    // end of optional output

    return ranking;
}


function compute_av(profile, rule_name, tau, verbose=0, resolute=true) {
    // Dynamic sequential Phragmen (dynamic-seq-Phragmen)

    // optional output
    if (verbose > 0) {
        console.log(`${JSON.stringify(this.rule_name[2])}`);
    }
    // end of optional output

    var ranking = [];
    var appr_scores = [];
    var temp = [];
    for (let i = 0; i < profile[1]; i++) {
        appr_scores.push(0);        
    }
    for (let p = 0; p < profile[2].length; p++) {
        pref = profile[2][p];
        for (const c of pref) {
            // (Classic) Approval Voting
            appr_scores[c] += 1;
        }       
    }

    // sort candidates by approval ranking and output ranking\tau
    temp = [...appr_scores];
    temp.sort();
    temp.reverse();
    for (const x of temp) {
        var i = appr_scores.indexOf(x);
        if (i != -1 && !ranking.includes(i)) {
            ranking.push(i);
        }
        else {
            while (i != -1) {
                i = appr_scores.indexOf(x, i+1);
                if (i != -1 && !ranking.includes(i)) {
                    ranking.push(i);
                    break;
                }
            }
        }
    }
    ranking = ranking.filter(x => !tau.includes(x));

    // optional output
    if (verbose > 0) {
        console.log(`The ranking, using tau = ${tau} is ${ranking}`);
    }
    // end of optional output

    return ranking;
}


function get_rulesinfo(rule_name) {

    var __RULESINFO = [
        ['lseqpav', 'lazy seq-PAV', 'lazy sequential PAV', compute_lazy_seqpav, 'standard', [true, false]],
        ['dseqpav', 'dynamic seq-PAV', 'dynamic sequential PAV', compute_dynamic_seqpav, 'standard', [true, false]],
        // ['lseqphrag', "lazy seq-Phragmen", "lazy sequential Phragmen", compute_lazy_seqphrag, ("standard"), (true, false)],
        // ['dseqphrag', "dynamic seq-Phragmen", "dynamic sequential Phragmen", compute_dynamic_seqphrag, ("standard"), (true, false)],
        ['av', 'AV', 'approval voting', compute_av, 'standard', [true, false]]
    ];

    for (let i = 0; i < __RULESINFO.length; i++) {
        var rule = __RULESINFO[i];
        if (rule[0] === rule_name) {
            return __RULESINFO[i];
        }        
    }
    return null;
}


module.exports = {
    DPRRule,
    compute,
    compute_lazy_seqpav,
    compute_dynamic_seqpav,
    compute_av,
    get_rulesinfo
}