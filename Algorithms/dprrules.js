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
    var temp = [];
    var candidate_scores = [];
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

function __phragmen_loads_from_sequence(profile, sequence, verbose=0) {
    // Algorithm for computing Phragmen-loads w.r.t. to a sequence of candidates

    var load = {};
    var supp_cand = [];
    var sort_values = [];
    var load_values = [];
    var loads_of_first_supps = [];
    var supporters = [];

    
    for (let i = 0; i < profile[2].length; i++) {
        load[i] = 0;
    }
    
    // compute loads w.r.t. sequence
    for (const cand of sequence) {
        // sort supporters of cand by load
        // supp_cand = [];//------------------------------------------------------------------------------------
        for (let p = 0; p < profile[2].length; p++) {
            pref = profile[2][p];
            if (pref.includes(cand)) {
                supp_cand.push(p);
            }            
        }

        supp_cand.sort(function (a, b) {
            return load[a] - load[b];
        });
        
        // for (const k in supp_cand) {
        //     sort_values.push(load[k]);
        // }
        // console.log("induced_loads[cand]:");
        // console.log(sort_values);
        // sort_values.sort(function(a, b) {
        //     return a[1] - b[1];
        // });
        // sort_values.sort();
        // supp_cand = [];
        // for (const k of sort_values) {
        //     supp_cand.push(sort_values[0]);
        // }

        // optional output
        if (verbose >= 2) {
            console.log(`Adding load for candidate ${JSON.stringify(cand)}`);
            console.log(`N_c of candidate = ${JSON.stringify(supp_cand)}`);
            console.log(`Current loads are ${JSON.stringify(load)}`);
        }
        // end of optional output

        // find supporter-group with minimal load distribution
        var cutoff_index = 0;
        var new_load = 0;
        var load_sum = 0;
        var load_diff = 0;

        for (let i = 0; i < supp_cand.length; i++) {
            // compute difference of max induced load and current load of the next candidate
            // if we take the first index-many candidates
            for (const l in load) {
                for (let j = 0; j < i+1; j++) {
                    if (supp_cand[j] == l) {
                        loads_of_first_supps.push(load[l]);
                    }                    
                }
            }

            // optional output
            if (verbose >= 2) {
                console.log(`loads of the first ${JSON.stringify(index)} voters in N_c are ${JSON.stringify(loads_of_first_supps)}`);
            }
            // end of optional output

            load_sum = loads_of_first_supps.reduce((partialSum, a) => partialSum + a, 0);
            // load_sum = sum(load[supp_cand[:index]])  ---->> also in source code this line was in comment
            new_load = (1+load_sum)/(i+1);

            if (i == supp_cand.length-1) {
                // if we make it to the last supporter, she will be taken
                cutoff_index = i+1;

                // optional output
                if (verbose >= 2) {
                    console.log("Load difference was positive throughout N_c thus all voters in N_c share load.");
                }
                // end of optional output

                break;
            }

            //-------------------- line 203 -----------------------------
            load_diff = new_load - load[supp_cand[i+1]];

            if (load_diff <= 0) {
                cutoff_index = i+1;

                // optional output
                if (verbose >= 2) {
                    console.log("Load difference for the next candidate is <= 0");
                    console.log(`cutoff index is ${JSON.stringify(cutoff_index)}`);
                }
                // end of optional output

                break;
            }
        }

        //-------------------- line 214 -----------------------------
        for (let i = 0; i < cutoff_index; i++) {
            supporters.push(supp_cand[i]);
        }

        // optional output
        if (verbose >= 2) {
            console.log(`Supporters carrying the load are ${JSON.stringify(supporters)}`);
            console.log(`Their new load is ${JSON.stringify(new_load)}`);
        }
        // end of optional output

        // assign new loads
        for (const v of supporters) {
            load[v] = new_load;
        }
    }

    return load;
}

function compute_lazy_seqphrag(profile, rule_name, tau, verbose=0, resolute=true) {
    // Lazy sequential Phragmen (lazy-seq-Phragmen)

    // optional output
    if (verbose > 0) {
        console.log(`${JSON.stringify(this.rule_name[2])}`);
    }
    // end of optional output

    var no_supporters = [];
    var weights = new Array(profile[1]);
    var ranking = [];
    var cands = [];
    var curr_tau = [];
    var key_sorted = [];
    var sort_values = [];
    var approvers_weight = {};
    var induced_loads = {};
    var sorted_induced_loads = {};
    var temp = {};

    weights.fill(0);

    for (let i = 0; i < profile[1]; i++) {
        for (let p = 0; p < profile[2].length; p++) {
            pref = profile[2][p];
            for (const c of pref) {
                if (c == i) {
                    weights[i] += 1;
                }
            } 
        }
    }

    for (let i = 0; i < profile[1]; i++) {
        approvers_weight[i] = weights[i];
    }
    
    //********************************* lines 240-242 *********************************

    for (let i = 0; i < profile[1]; i++) {
        if(!tau.includes(i)) {
            cands.push(i);
        }        
    }

    for (let i = 0; i < profile[2].length; i++) {
        induced_loads[i] = 0;
    }
    
    for (const cand of cands) {
        curr_tau = tau.concat(cand);
        induced_loads[cand] = __phragmen_loads_from_sequence(profile, curr_tau, verbose);
        temp = induced_loads[cand];
        key_sorted = Object.keys(temp).sort(function (a, b) {
            return temp[a]-temp[b];
        });
        key_sorted.reverse();
        sorted_induced_loads[cand] = key_sorted; 
    }

    // optional output
    if (verbose > 0) {
        console.log(`Induced loads by adding candidate x to tau are ${induced_loads}`);
    }
    // end of optional output

    // ************************************ line 263 ***************************************
    // //----------------------------------------------------------------------
    // for(const i in sorted_induced_loads) {
    //     for (const j in sorted_induced_loads[i]) {
    //         sort_values.push([j, sorted_induced_loads[i][j]]);
    //     }
    // }
    // key_sorted = [];
    // key_sorted = Object.keys(sort_values).sort(function (a, b) {
    //     return sort_values[a]-sort_values[b];
    // });
    //----------------------------------------------------------------------

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
        ['lseqphrag', 'lazy seq-Phragmen', 'lazy sequential Phragmen', compute_lazy_seqphrag, 'standard', [true, false]],
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
    __phragmen_loads_from_sequence,
    compute_lazy_seqphrag,
    compute_av,
    get_rulesinfo
}