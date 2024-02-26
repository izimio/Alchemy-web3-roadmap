const axios = require('axios');
const niceList = require('../utils/niceList.json');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {

  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();
  let name = '';
  while (name === '') {
    name = await new Promise((resolve) => {
      readline.question('Enter a name: ', resolve);
    });
  }
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  try {
    const { data } = await axios.post(`${serverUrl}/gift`, {
      name,
      proof,
    });
    console.log("Yay !", data);
  } catch (error) {
    console.error(error.response.data);
  }
  readline.question('Press any key to continue...', () => {
    console.clear();
    main();
  });

}

main();