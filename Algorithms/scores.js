// Calculating all kinds of scores
const { sort_committees, enough_approved_candidates, str_candset, str_candsets, str_committees_header, hamming } = require('./misc');

// returns score function given its name
function get_scorefct(scorefct_str, committeesize) {

    if (scorefct_str === 'pav') {
        return '__pav_score_fct';
    }
    else if (scorefct_str === 'slav') {
        return __slav_score_fct;
    }
    else if (scorefct_str === 'cc') {
        return __cc_score_fct;
    }
    else if (scorefct_str === 'av') {
        return __av_score_fct;
    }
    else if (scorefct_str.startsWith('geom')) {
        // var base = 
        // base = Fraction(scorefct_str[4:])
        // return functools.partial(__geom_score_fct, base=base)
    }
    else {
        throw `Score function ${JSON.stringify(scorefct_str)} does not exist.`;
    }
}

function thiele_score(scorefct_str, profile, committee) {
    // computes the Thiele score of a committee subject to a given score function (scorefct_str)
    var scorefct = get_scorefct(scorefct_str, committee.length);
    var score = 0;
    var commi = new Set(committee);
    for (const vote in profile) {
        var cand_in_com = 0;
        for (const i in vote.approved) {
            if (commi.has(i)) {
                cand_in_com += 1;
                score += vote.weight * scorefct(cand_in_com);
            }
        }
    }
    return score;
}

function __pav_score_fct(i) {

    if (i === 0) {
        return 0;
    }
    else {
        return 1/i;
    }
}

function __slav_score_fct(i) {

    if (i === 0) {
        return 0;
    }
    else {
        return 1/(2*i-1);
    }
}
    
function __cc_score_fct(i) {

    if (i === 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function __av_score_fct(i) {

    if (i >= 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function __geom_score_fct(i, base) {

    if (i === 0) {
        return 0;
    }
    else {
        return 1/(Math.pow(base, i-1));
    }
}

function cumulative_score_fct(scorefct, cand_in_com) {

    var sum = 0;
    for (let i = 0; i < cand_in_com; i++) {
        sum += scorefct(i + 1);
    }
    return sum;
}

// returns a list of length num_cand
// the i-th entry contains the marginal score increase
// gained by adding candidate i
function marginal_thiele_scores_add(scorefct, profile, committee) {

    // console.log(`${JSON.stringify(scorefct)}`); // undefined
    // var scorefunc = window['scorefct'];
    var marg = [];
    var pref = [];
    var intersection = [];
    for (let i = 0; i < profile[1]; i++) {
        marg.push(0);        
    }
    for (let p = 0; p < profile[2].length; p++) {
        pref = profile[2][p];
        intersection = pref.filter(x => committee.includes(x));
        for (const c of pref) {
            if (intersection.length > 0) {
                marg[c] += __pav_score_fct(intersection.length + 1);
            }
            else {
                marg[c] += __pav_score_fct(1);
            }
        }       
    }
    for (const c of committee) {
        marg[c] = -1;
    }
    return marg;
}

function marginal_thiele_scores_remove(scorefct, profile, committee) {

    var marg_util_cand = [];
    var intersection = [];
    var commi = new Set(committee);
    var satisfaction = 0; 
    for (let i = 0; i < profile.num_cand; i++) {
        marg_util_cand.push(0);        
    }
    // marginal utility gained by adding candidate to the committee
    for (const pref in profile) {
        for (const c in pref) {
            if (pref.approved.includes(c) && commi.has(c)) {
                intersection.push(c);
            }
            satisfaction = intersection.length;
            marg_util_cand[c] += pref.weight * scorefct(satisfaction);
        }
    }
    for (let i = 0; i < profile.num_cand; i++) {
        if (!commi.has(i)) {
            // do not choose candidates that already have been removed
            marg_util_cand[i] = Math.max(marg_util_cand) + 1;
        }        
    }
    return marg_util_cand;
}

function monroescore(profile, committee) {

    if (profile.length%committee.length == 0) {
        // faster
        return monroescore_matching(profile, committee);
    }
    else {
        return monroescore_flowbased(profile, committee);
    }
}

// function monroescore_matching(profile, committee) {
//     // Returns Monroe score of a given committee.
//     // Uses a matching-based algorithm that works only if
//     // the committee size divides the number of voters
//     if (profile.length%committee.length != 0) {
//         throw ValueError;
//     }
//     var graph = {};
//     var sizeofdistricts = Math.floor(profile.length/committee.length);
//     for (const cand in committee) {
//         var interestedvoters = [];
//         for (let i = 0; i < profile.length; i++) {
//             if (profile[i].includes(cand)) {
//                 interestedvoters.push(i);
//             }            
//         }
//         for (let j = 0; j < sizeofdistricts; j++) {

//         }
        
//     }
//     for cand in committee:
//         for j in range(sizeofdistricts):
//             graph[str(cand) + "/" + str(j)] = interestedvoters
//     m, _, _ = matching.bipartiteMatch(graph)
//     return len(m)
// }  


module.exports = {
    get_scorefct,
    thiele_score,
    __pav_score_fct,
    __slav_score_fct,
    __cc_score_fct,
    __av_score_fct,
    __geom_score_fct,
    cumulative_score_fct,
    marginal_thiele_scores_add,
    marginal_thiele_scores_remove,
    monroescore
}