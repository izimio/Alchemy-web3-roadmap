Cette section traite une nouvelle fois des arbres de merkel mais cette fois-ci dans le cas de la blockchain Ethereum.

L'arbre de Merkle est utilisé pour stocker les transactions dans un block. Cependant, il est utilisé de manière différente que dans Bitcoin.

Dans Ethereum il existe un nouveau type d'arbres de Merkle: l'arbre de Merkle Patricia.

L'arbre de Merkle Patricia est un arbre de Merkle qui stocke les transactions dans un format trie.

Un trie est une structure de données qui stocke des clés sous forme d'arbre. Chaque noeud de l'arbre est un hash de ses enfants.

L'arbre de Merkle Patricia est utilisé pour stocker les transactions dans un block. Il est utilisé pour stocker les transactions, les comptes et les états de la blockchain.

La blockhain Ethereum utilise 4 arbres de Merkle Patricia:
- Un arbre pour stocker les transactions (transactions, logs, etc) **Transactions Trie**
- Un arbre pour stocker les comptes (balances, nonce, etc) **State Trie**
- Un arbre pour stocker les reçus (gas used, logs, events, etc) **Receipts Trie**
- Un arbre pour stocker les données des contrats (storage) **Storage Trie**

Voilà un exemple en ASCII d'un arbre de Merkle Patricia:

```
        (root)
        /     \
      (H)     (P)
      / \     /  \
    (E) (L)  (O) (W)
     |   |    |   |
    (L) (L)  (W) (D)
     |   |
    (P) (O)
```

Les mots sont stockés dans l'arbre de manière à ce que chaque lettre soit un hash de ses enfants.

Les mots ici sont: 
    - HELP
    - HELLO
    - POW
    - PWD

Si nous devions ajouter un nouveau mot comme `POWER` dans l'arbre, nous n'aurions pas besoin de stocker le mot en entier. Nous pourrions simplement stocker les lettres "ER" à la suite de "POW".

Voici un exemple de code en JavaScript pour construire un arbre de Merkle Patricia:

```javascript
class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}

module.exports = TrieNode;
```

```javascript
const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }


    doContains(word, idx = 0, root = this.root) {
        const key = word[idx];

        if(idx == word.length && root.isWord) {
            return true;
        }
        if (root.children[key]) {
            return this.doContains(word, idx + 1, root.children[key]);
        }
        return false;
    }

    contains(word) {
        return this.doContains(word, 0, this.root);
    }

    doInsert(word, idx, node) {
        const key = word[idx];
        if (!key) {
            return node;
        }
        if(node.children[key]) {
             this.doInsert(word, idx + 1, node.children[key]);
        } else {
            let nd = new TrieNode(key);
            nd.isWord = idx == word.length - 1;
            node.children = {...node.children, [key]: nd}; 
            this.doInsert(word, idx + 1, nd);
        }
        return node;
    }

    insert(word) {
        this.root = this.doInsert(word, 0, this.root);
    }
}

module.exports = Trie;
```
