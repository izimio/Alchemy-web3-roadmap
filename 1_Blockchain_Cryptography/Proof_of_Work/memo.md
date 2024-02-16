Dans cette leçon nous avons vu plus en profondeur le principe de mining

Le mining est le procédé qui permet de sécuriser la blockchain. Il consiste à ajouter un bloc à la blockchain en résolvant un problème mathématique complexe.

Ce problème mathématique est appelé preuve de travail. Il est difficile à résoudre, mais facile à vérifier.

Le but du mining est de trouver un hash qui commence par un certain nombre de zéros. Pour cela, on utilise un nombre aléatoire appelé nonce. On ajoute ce nonce au bloc, on calcule le hash du bloc, et on vérifie si le hash commence par le bon nombre de zéros.

Si ce n'est pas le cas, on change le nonce et on recommence. C'est un procédé qui demande beaucoup de puissance de calcul.

Le premier mineur qui trouve un hash valide gagne une récompense en bitcoin équivalente aujourd'hui à 6.25 BTC.

Le hash est calculé en utilisant la structure du bloc, le hash du bloc précédent, et le nonce.

```javascript
const { sha256 } = require("ethereum-cryptography/sha256");

function createBlock() {
    return {
        timestamp: Date.now(),
        data: [
            {
                from: "Alice",
                to: "Bob",
                amount: 100
            },
            {
                from: "Bob",
                to: "Alice",
                amount: 50
            },
        ]
        previousHash: "0000000000456c3e6d7f7d3b",
        nonce: 0
    };
}

function mineBlock(block, difficulty) {
    let nonce = 0;
    while (true) {
        block.nonce = nonce;
        const hash = sha256(JSON.stringify(block));
        if (hash.startsWith("0".repeat(difficulty))) {
            return hash;
        }
        nonce++;
    }
}
```

Dans cet exemple, on crée un bloc avec une structure de données arbitraire. On utilise ensuite la fonction mineBlock pour trouver un hash valide. On recommence avec des nonces différents jusqu'à trouver un hash qui commence par le bon nombre de zéros.

Le nombre de zéros nécessaires pour que le hash soit valide est appelé la difficulté. Plus la difficulté est élevée, plus il est difficile de trouver un hash valide.

Tout le principe de sécurité réside dans l'ajout du précédent hash dans le bloc. Cela permet de garantir que la blockchain n'a pas été modifiée.

Si un mineur malveillant voulait modifier un bloc, il devrait recalculer le hash de tous les blocs suivants. Cela demanderait une puissance de calcul énorme.

Le mining est donc un procédé qui garantit la sécurité de la blockchain. C'est un procédé qui demande beaucoup de puissance de calcul, mais qui est nécessaire pour garantir la sécurité de la blockchain.
