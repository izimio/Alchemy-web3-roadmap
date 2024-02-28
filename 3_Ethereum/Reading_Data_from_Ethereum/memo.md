La Blockchain est maintenu grâce à des nœuds. Un nœud est un ordinateur qui fait tourner un logiciel Ethereum. Il est possible de faire tourner un nœud Ethereum sur un ordinateur personnel. Cependant, cela nécessite beaucoup de ressources et de temps. C'est pourquoi la plupart des gens utilisent des services de nœuds Ethereum gérés par des entreprises spécialisées.

Il existe deux types de nœuds Ethereum :
- **Nœud complet** : Un nœud complet est un nœud qui stocke l'intégralité de la blockchain Ethereum. Cela signifie que le nœud complet stocke toutes les transactions et tous les contrats intelligents qui ont été exécutés sur la blockchain Ethereum. Les nœuds complets sont utilisés pour valider les transactions et créer de nouveaux blocs.

- **Nœud léger** : Un nœud léger est un nœud qui ne stocke pas l'intégralité de la blockchain Ethereum. Cela signifie que le nœud léger ne stocke que les en-têtes de blocs et les en-têtes de transactions. Les nœuds légers sont utilisés pour se connecter à la blockchain Ethereum et pour envoyer des transactions.

Il existe même un troisième type de nœud Ethereum appelé **nœud archive**. Un nœud archive est un nœud qui stocke l'intégralité de la blockchain Ethereum, y compris les données de tous les contrats intelligents. Les nœuds archive sont utilisés pour explorer l'historique complet de la blockchain Ethereum.

Afin d'accéder aux informations de la Blockchain il est donc nécéssaure de se connecter à un nœud à l'un de ces nœuds.

Il existe plusieurs grands services fournisseurs de nœuds Ethereum :

- **Infura** : Infura est un service de nœud Ethereum géré par ConsenSys. Il permet de se connecter à un nœud Ethereum sans avoir à faire tourner un nœud Ethereum. Infura est utilisé par de nombreuses applications Ethereum, car il est facile à utiliser et fiable.

- **Alchemy** : Alchemy est un autre service de nœud Ethereum géré par une entreprise privée. Il est similaire à Infura, mais il offre des fonctionnalités supplémentaires comme des outils de surveillance et des analyses de données. <3

- **Etherscan** : Etherscan est un explorateur de blockchain Ethereum qui offre un service de nœud Ethereum. Il est utilisé par de nombreuses personnes pour explorer la blockchain Ethereum et pour envoyer des transactions.

Ensuite, au niveau de la programmation, il existe plusieurs bibliothèques pour se connecter à un nœud Ethereum :

- **Web3.js** : Web3.js est une bibliothèque JavaScript qui permet de se connecter à un nœud Ethereum. Elle est utilisée par de nombreuses applications Ethereum pour envoyer des transactions et exécuter des contrats intelligents.

- **Ethers.js** : Ethers.js est une autre bibliothèque JavaScript qui permet de se connecter à un nœud Ethereum. Elle est similaire à Web3.js, mais elle offre des fonctionnalités supplémentaires comme la gestion des portefeuilles Ethereum.

Voici un exemple de code pour se connecter à un nœud Ethereum avec Ethers.js :

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io");
```

Afin de récupérer des informations sur la blockchain Ethereum, il est possible d'utiliser les méthodes de la bibliothèque Ethers.js. Par exemple, pour récupérer le dernier bloc de la blockchain Ethereum, il est possible d'utiliser la méthode `getBlockNumber` :

```javascript

provider.getBlockNumber().then((blockNumber) => {
    console.log("Block number: " + blockNumber);
});
```

Ces informations sont récupérées en utilisant le protocole JSON-RPC. Le protocole JSON-RPC est un protocole de communication qui permet de se connecter à un nœud Ethereum et d'envoyer des requêtes pour récupérer des informations sur la blockchain Ethereum.

Il existe plusieurs méthodes JSON-RPC pour récupérer des informations sur la blockchain Ethereum :

- **eth_blockNumber** : Cette méthode permet de récupérer le numéro du dernier bloc de la blockchain Ethereum.

- **eth_getBlockByNumber** : Cette méthode permet de récupérer les informations d'un bloc spécifique de la blockchain Ethereum.

- **eth_getTransactionByHash** : Cette méthode permet de récupérer les informations d'une transaction spécifique de la blockchain Ethereum.

- **eth_getTransactionReceipt** : Cette méthode permet de récupérer les informations de la réception d'une transaction spécifique de la blockchain Ethereum.

- **eth_call** : Cette méthode permet d'appeler une méthode d'un contrat intelligent sans créer de transaction sur la blockchain Ethereum.

- **eth_sendTransaction** : Cette méthode permet d'envoyer une transaction à la blockchain Ethereum.

...




