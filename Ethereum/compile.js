const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); //fs = file system. Fs extra has more functions

//delete the build

const buildPath = path.resolve (__dirname, 'build');
fs.removeSync(buildPath);     // deletes everything inside the build folde.r

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source,1).contracts; //compiles both contracts

//create a Build folder
fs.ensureDirSync(buildPath);

console.log(output);

for (let contract in output) {

  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json'),
    output[contract]
  );
}
