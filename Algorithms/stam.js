const { DPRRule, compute_lazy_seqpav, compute_dynamic_seqpav, compute_av, __RULESINFO, rules } = require('./dprrules');

var arr = [[0],[0],[0,1],[1,2,3]];
// var load = Object.fromEntries(arr);

for (let p = 0; p < arr.length; p++) {
    pref = arr[p];
    for (const c of pref) {
        load = Object.fromEntries(arr);
    }       
}

console.log(load);

