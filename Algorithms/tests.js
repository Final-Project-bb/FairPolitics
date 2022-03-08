const DPRSequence = require('./dprsequence');
const { DPRRule, compute, compute_lazy_seqpav, compute_dynamic_seqpav, compute_av, get_rulesinfo } = require('./dprrules');
const { sort_committees, enough_approved_candidates, str_candset, str_candsets, str_committees_header, hamming } = require('./misc');
const { get_scorefct, thiele_score, __pav_score_fct, __slav_score_fct, __cc_score_fct, __av_score_fct, __geom_score_fct,
    cumulative_score_fct, marginal_thiele_scores_add, marginal_thiele_scores_remove, monroescore } = require('./scores');

console.log('---------------Dynamic seqPAV------------------------');    
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
console.log("outcomes:");
console.log(outcomes);
console.log("expected_answer: ");
console.log(expected_answer);
console.log(outcomes == expected_answer);


// console.log('---------------lazy seqPAV------------------------');
// var names = ['0','1','2','3'];
// var num_cand = 4;
// var ballotts = [[0],[0],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
//                 [1],[1],[1],[1],[1],[1],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],
//                 [0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3]];
// var profile = [names, num_cand, ballotts];
// // console.log(profile);
// var election = new DPRSequence(profile, 'lseqpav');
// // console.log(election.toString());
// var outcomes = election.run_by_name([1]);
// var expected_answer = [[[], [0, 1, 2, 3]], [[1], [2, 3, 0]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
// console.log(outcomes == expected_answer);


// console.log('---------------------AV----------------------');    
// var names = ['0','1','2','3'];
// var num_cand = 4;
// var ballotts = [[0],[0,1],[0,1],[2],[2,3],[2,3]];

// var profile = [names, num_cand, ballotts];
// // console.log(profile);
// var election = new DPRSequence(profile, 'av');
// // console.log(election.toString());
// var outcomes = election.run_by_name([1, 0], verbose=0, resolute=true);
// var expected_answer = [[[], [0, 2, 1, 3]], [[1], [0, 2, 3]], [[1, 0], [2, 3]]];
// console.log("outcomes:");
// console.log(outcomes);
// console.log("expected_answer: ");
// console.log(expected_answer);
// console.log(outcomes == expected_answer);