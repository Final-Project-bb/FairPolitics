const {PythonShell} = require('python-shell');

// let pyshell = new PythonShell('../Algorithms/dynamicrankings/dprsequence.py');
let pyshell = new PythonShell('C://Users/97250/Desktop/dpr/dynamicrankings/dprsequence.py');

var names = ['0','1','2','3'];
var num_cand = 4;
var ballotts = [[0],[0],[0],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                [1],[1],[1],[1],[1],[1],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],
                [0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3],[0,2,3]];
var profile = {names, num_cand, ballotts};
console.log(profile);
var election = [];

pyshell.send(profile, "dseqpav");

pyshell.stdout.on('DPRSequence', function(__init__) {
  election = __init__;
});
console.log(election);



// pyshell.send('32');

// pyshell.on('message', function(message) {
//   console.log("python: " + message);
// })
