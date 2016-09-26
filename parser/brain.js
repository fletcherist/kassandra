var brain = require('brain')

var net = new brain.NeuralNetwork();

net.train([{input: [1, 1], output: [1]},
           {input: [0, 0], output: [0]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [1]}]);

var output = net.run([1, 0]); 
console.log(output)