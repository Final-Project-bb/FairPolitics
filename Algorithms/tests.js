const DPRSequence = require('./dprsequence');
const { DPRRule, compute, compute_lazy_seqpav, compute_dynamic_seqpav, __phragmen_loads_from_sequence,
    compute_lazy_seqphrag, compute_dynamic_seqphrag, compute_av, get_rulesinfo } = require('./dprrules');
const { sort_committees, enough_approved_candidates, str_candset, str_candsets, str_committees_header, hamming } = require('./misc');
const { get_scorefct, thiele_score, __pav_score_fct, __slav_score_fct, __cc_score_fct, __av_score_fct, __geom_score_fct,
    cumulative_score_fct, marginal_thiele_scores_add, marginal_thiele_scores_remove, monroescore } = require('./scores');

console.log('\n---------------Dynamic seqPAV------------------------');    
var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                [1],[1],[1],[1],[1],[1],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],
                [0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3]];
var profile = [names, num_cand, ballotts];
// console.log(profile);
var election = new DPRSequence(profile, 'dseqpav');
// console.log(election.toString());
var outcomes = election.run_by_name([1]);
var expected_answer = [[[], [0, 1, 2, 3]], [[1], [2, 3, 0]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(outcomes) == JSON.stringify(expected_answer));


console.log('\n---------------lazy seqPAV------------------------');
var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                [1],[1],[1],[1],[1],[1],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],
                [0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3]];
var profile = [names, num_cand, ballotts];
// console.log(profile);
var election = new DPRSequence(profile, 'lseqpav');
// console.log(election.toString());
var outcomes = election.run_by_name([1]);
var expected_answer = [[[], [0, 1, 2, 3]], [[1], [2, 3, 0]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(outcomes) == JSON.stringify(expected_answer));


console.log('\n---------------__phragmen_loads_from_sequence------------------------');
// overloading example
var names = ['0','1','2'];
var num_cand = 3;
var ballotts = [[0],[0,1],[1,2]];
var profile = [names, num_cand, ballotts];
// // console.log(profile);
var loads = __phragmen_loads_from_sequence(profile, [0,1,2]);
var loads_values = [];
for (const key in loads) {
    loads_values.push(loads[key]);
}
var expected_answer = [1/2, 3/4, 7/4];
// console.log("loads.values():");
// console.log(loads_values);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(loads_values) == JSON.stringify(expected_answer));

// normal example
var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0],[0,1],[1,2,3]];
var profile = [names, num_cand, ballotts];
// // console.log(profile);
var loads = __phragmen_loads_from_sequence(profile, [3,2,1]);
var loads_values = [];
for (const key in loads) {
    loads_values.push(loads[key]);
}
var expected_answer = [0, 0, 1, 2];
// console.log("loads.values():");
// console.log(loads_values);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(loads_values) == JSON.stringify(expected_answer));


console.log('\n---------------lazy Phragmen------------------------');
var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0,1],[0,1],[2],[2,3],[2,3]];
var profile = [names, num_cand, ballotts];
// // console.log(profile);
var election = new DPRSequence(profile, 'lseqphrag');
// console.log(election.toString());
var outcomes = election.run_by_name([1], verbose=0, resolute=true);
var expected_answer = [[[], [0, 2, 1, 3]], [[1], [2, 3, 0]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(outcomes) == JSON.stringify(expected_answer));


console.log('\n---------------dynamic Phragmen------------------------');
var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0,1],[0,1],[2],[2,3],[2,3]];
var profile = [names, num_cand, ballotts];
// // console.log(profile);
var election = new DPRSequence(profile, 'dseqphrag');
// console.log(election.toString());
var outcomes = election.run_by_name([1], verbose=0, resolute=true);
var expected_answer = [[[], [0, 2, 1, 3]], [[1], [2, 0, 3]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(outcomes) == JSON.stringify(expected_answer));


console.log('\n---------------------AV----------------------');    
var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0,1],[0,1],[2],[2,3],[2,3]];
var profile = [names, num_cand, ballotts];
// console.log(profile);
var election = new DPRSequence(profile, 'av');
// console.log(election.toString());
var outcomes = election.run_by_name([1, 0], verbose=0, resolute=true);
var expected_answer = [[[], [0, 2, 1, 3]], [[1], [0, 2, 3]], [[1, 0], [2, 3]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
console.log(JSON.stringify(outcomes) == JSON.stringify(expected_answer));