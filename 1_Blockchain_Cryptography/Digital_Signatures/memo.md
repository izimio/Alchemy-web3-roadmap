Ici, on voit les fondement de la blockchain

La blockchain est une technologie de stockage et de transmission d'informations, transparente, sécurisée, et fonctionnant sans organe central de contrôle. Elle est la technologie sur laquelle repose le bitcoin par exemple.

La blockchain utilise énormément de procédés cryptographiques dans son fonctionnement.

La leçon du jour mets ici l'accent sur l'algorithme de hachage sha256

Un algorithme de hachage est une fonction qui prend en entrée une donnée de taille arbitraire et qui produit en sortie une donnée de taille fixe. Cette donnée de sortie est appelée le hash.

Le sha256 est donc un algorithme de hachage qui produit un hash de 256 bits.

Le hash possède plusieurs propriétés intéressantes:
- Il est unique pour une donnée donnée
- Il est rapide à calculer
- Il est impossible de retrouver la donnée d'origine à partir du hash
- Une modification minime de la donnée d'origine produit un hash complètement différent

Ces propriétés font du hash un outil très utile en cryptographie. Il est utilisé dans la blockchain pour garantir l'intégrité des données. Par exemple, chaque bloc de la blockchain contient le hash du bloc précédent. Cela permet de garantir que la blockchain n'a pas été modifiée.

La seule faiblesse du hash est qu'il est possible de trouver deux données différentes qui produisent le même hash. C'est ce qu'on appelle une collision. Cependant, pour un bon algorithme de hachage, trouver une collision est extrêmement difficile.


Aussi, le hash peut être trouvé à l'aide d'une Rainbow Table. C'est une table qui contient des hash et leur donnée d'origine. Cela permet de retrouver la donnée d'origine à partir du hash.

En JS on peut utiliser l'algorithme de hachage sha256 à l'aide de la librairie crypto. Voici un exemple d'utilisation:

```javascript
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash

const rainbow = COLORS.map((c) => {
    return {
        hash: toHex(sha256(utf8ToBytes(c))),
        name: c
    };
})

function findColor(hash) {
    const ret = rainbow.find((e) => {
        return e.hash === toHex(hash);
    });
    return ret.name || "";
}

module.exports = findColor;
```
