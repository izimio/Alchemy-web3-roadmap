const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = '006f8fa6d791ab56d63e1a87298b4f6958057d6f8445b74b47d4fdb904925857';

app.post('/gift', (req, res) => {
  const {name, proof} = req.body;
  if (!name || !proof){
    return res.status(400).send('Missing name or proof');
  }
  if (!proof[0]){
    return res.status(400).send('Invalid proof');
  }
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.status(200);
    res.send("You got a toy robot!");
  }
  else {
    res.status(403);
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
