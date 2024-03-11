Les Events en Solidity servent de logs pour enregistrer des événements qui se produisent lors de l'exécution d'un contrat. Ils sont très utiles pour le débogage et pour la communication avec d'autres contrats.

## Syntaxe

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    event MyEvent(uint indexed _myIndexedValue, string _myValue);

    function myFunction(uint _myValue) public {
        emit MyEvent(_myValue, "Hello World");
    }
}
```

La propriété `indexed` permet de filtrer les événements lors de leur écoute.

## Exemple

```js

const {ethers} = require("ethers");
const MyContract = require("./MyContract.json");

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", MyContract.abi, provider);

contract.on("MyEvent", (myIndexedValue, myValue, event) => {
    console.log(myIndexedValue, myValue);
});

```
