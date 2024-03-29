const JavaScriptObfuscator = require('javascript-obfuscator'),
  minifier = require('string-minify'),
  fs = require('fs'),
  log = console.log;

function build({ srcName, destName }) {
  var code = fs.readFileSync(srcName, 'utf8');
  //log(code);
  var obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    // compact: true,
    // controlFlowFlattening: false,
    // deadCodeInjection: false,
    // debugProtection: false,
    // debugProtectionInterval: false,
    // disableConsoleOutput: false,
    // identifierNamesGenerator: 'hexadecimal',
    // log: false,
    // numbersToExpressions: false,
    // renameGlobals: true,
    // rotateStringArray: true,
    // selfDefending: false,
    // shuffleStringArray: true,
    // simplify: true,
    // splitStrings: false,
    // stringArray: true,
    // stringArrayEncoding: ['base64'],
    // stringArrayIndexShift: true,
    // stringArrayWrappersCount: 1,
    // stringArrayWrappersChainedCalls: true,
    // stringArrayWrappersParametersMaxCount: 2,
    // stringArrayWrappersType: 'variable',
    // stringArrayThreshold: 0.75,
    // unicodeEscapeSequence: false,
    // splitStringsChunkLength: '5'
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  }).getObfuscatedCode();
  //log(obfuscationResult);
  let fileName = (destName ? destName : srcName).split(/(\\|\/)/g).pop();
  fs.writeFile('build/' + fileName, minifier(obfuscationResult), function (err) {
    if (err) log(err);
    log('build/' + fileName + ' was save');
  });
  // var result = UglifyJS.minify(code);
  // console.log(result.error); // runtime error, or `undefined` if no error
  // console.log(result.code);  // minified output: function add(n,d){return n+d}
}
build({ srcName: 'sync.js', destName: 'sync' });
build({ srcName: 's.js', destName: 's' });
build({ srcName: 'c.js', destName: 'c' });
build({ srcName: 'setup/delete.js', destName: 'delete' });
build({ srcName: 'setup/help.js', destName: 'help' });
build({ srcName: 'setup/setup.js', destName: 'setup' });
build({ srcName: 'setup/update.js', destName: 'update' });
build({ srcName: 'rdservice.js', destName: 'rdservice' });
build({ srcName: 'rd.js', destName: 'rd' });
fs.copyFile('./swcfg/bin/Release/@switch.exe', './build/@switch.exe', (err) => {
  if (err) {
    log('Error Found:', err);
  } else {
    log('Copied @switch.exe');
  }
});
fs.copyFile('./setup/package.json', './build/package.json', (err) => {
  if (err) {
    log('Error Found:', err);
  } else {
    log('Copied package.json');
  }
});
