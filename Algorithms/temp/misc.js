// Miscellaneous functions for committees (i.e., subsets of candidates)


function sort_committees(committees) {
    // sorts a list of committees,
    // converts them to lists, and removes duplicates
    var commi = new Set(committees);
    var arr = Array.from(commi);
    return arr.sort();
}    

function enough_approved_candidates(profile, committeesize) {
    // verifies whether a sufficient number of approved candidates exists
    var appr = new Set();
    for (const pref in profile) {
        appr.add(pref);
    }
    if (appr.size < committeesize) {
        var message = `committeesize = ${JSON.stringify(committeesize)} is larger than number of approved candidates`;
        throw message;
    }
}

function str_candset(candset, names=null) {
    // nicely format a single committee
    var namedset = new Set();
    if (names == null) {
        for (const c in candset) {
            namedset.add(`${JSON.stringify(c)}`);
        }
    }
    else {
        for (const c in candset) {
            namedset.add(names[c]);
        }
    }
    var arr = Array.from(namedset);
    return arr.join(', ');
}

function str_candsets(committees, names=null) {
    // nicely format a list of committees
    var output = "";
    var s = committees.sort();
    for (const comm in s) {
        output += ` ${str_candset(comm, names)} \n`;
    }
    return output;
}

function str_committees_header(committees, winning=false) {
    // nicely format a header for a list of committees,
    // stating how many committees there are
    // winning: write "winning committee" instead of "committee"
    var output = "";
    var commstring;
    if (committees == null || committees.length < 1) {
        if (winning) {
            return "No winning committees (this should not happen)";
        }
        else {
            return "No committees";
        }
    }
    if (winning) {
        commstring = "winning committee";
    }
    else {
        commstring = "committee";
    }
    if (committees.length == 1) {
        output += `1 ${commstring}:`;
    }
    else {
        output += `${JSON.stringify(committees.length)} ${commstring}s:`;
    }
    return output;
}


function hamming(a, b) {
    // Hamming distance
    var diffs = [];
    for (const x in a) {
        if (!b.includes(x)) {
            diffs.push(x);
        }
    }
    for (const x in b) {
        if (!a.includes(x)) {
            diffs.push(x);
        }
    }
    return diffs.length;
}