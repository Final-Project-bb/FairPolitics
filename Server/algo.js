const {PythonShell} = require('python-shell');

let pyshell = new PythonShell('C://Users//97250//PycharmProjects//testScript//scriptTestAlgo.py');
  
pyshell.send('32');

pyshell.on('message', function(message) {
  console.log("python: " + message);
})