// Calculating all kinds of scores


// returns score function given its name
function get_scorefct(scorefct_str, committeesize) {

    if (scorefct_str === 'pav') {
        return __pav_score_fct;
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

    var marg = [];
    var commi = new Set(committee);
    var intersection = [];
    for (let i = 0; i < profile.num_cand; i++) {
        marg.push(0);        
    }
    for (const pref in profile) {
        for (const c in pref) {
            if (pref.approved.includes(c) && commi.has(c)) {
                intersection.push(c);
                marg[c] += pref.weight * scorefct(intersection.length + 1);
            }
            else {
                marg[c] += pref.weight * scorefct(1);
            }
        }
    }
    for (const c in committee) {
        marg[c] = -1;
    }
    return marg;
}
