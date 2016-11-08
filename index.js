var fs = require("fs");

fs.readFileSync(process.argv[ 2 ]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    var config = line.split(' ').map(function (i) { return parseInt(i) });

    // CONSTRAINTS:
    if (config[ 0 ] < 1 || config[ 0 ] > 20) {
      throw new Error('"X" should be in range [1, 20]');
    } else if (config[ 1 ] < 1 || config[ 1 ] > 20) {
      throw new Error('"Y" should be in range [1, 20]');
    } else if (config[ 2 ] < 21 || config[ 2 ] > 100) {
      throw new Error('"N" should be in range [21, 100]');
    }

    var addFizz = add(config[ 0 ], 'F');
    var addBuzz = add(config[ 1 ], 'B');

    var lineResult = Array.apply(null, { length: config[ 2 ] }).map(function (it, idx) {
      idx = String(idx + 1);
      var fb = addFizz(idx)(idx);
      fb = addBuzz(fb)(idx);
      return fb.replace(/\d+(\w)/gmi, '$1');
    });

    console.log(lineResult.join(' '));
  }
});

// CURRY
function add (m, letter) {
  return function mutate (val) {
    return function (n) {
      if (n % m === 0) {
        val += letter;
      }
      return val;
    };
  };
}