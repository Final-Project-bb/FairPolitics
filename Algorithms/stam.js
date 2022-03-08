const { DPRRule, compute_lazy_seqpav, compute_dynamic_seqpav, compute_av, __RULESINFO, rules } = require('./dprrules');

module.exports = class Stam {

    constructor(profile, rule_name, info=null) {
        this.profile = profile;
        this.rule_name = DPRRule.rules[rule_name];
        this.outcomes = null;
        this.info = info;
    }
}

var arr = [1,2,3,1,1];
var set = new Set(arr);
console.log(set)
console.log(set.size === arr.length)
console.log(set.has(1))
console.log(set.has(4))