Dans le cours précédent on a vu que la blockchain se servait énormément de principes de cryptographie. Un de ces principes est l'algorithme de hachage sha256.

le sha256 permet de garantir l'intégrité des données en transformant 
n'importe quelle donnée en une suite de 256 bits. Cette suite est unique pour chaque donnée.

Cependant, le sha256 n'est pas le seul principe de cryptographie utilisé par la blockchain.

En effet, la blockchain utilise aussi la signature numérique.

La signature numérique est un procédé qui permet de garantir l'intégrité et l'authenticité d'un message, document ou logiciel. Elle est l'équivalent électronique de la signature manuscrite.

Ici la blockhain utilise une logique de signature à l'aide de 
clés asymétriques. C'est à dire que pour signer un message, on utilise une clé privée, et pour vérifier la signature, on utilise une clé publique.

Voici un exemple en JS de signature numérique à l'aide de clés asymétriques:

```javascript
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

function hashMessage(msg) {
    return keccak256(utf8ToBytes(msg));
}

async function signMessage(msg) {
    const hash = hashMessage(msg);

    const signature = secp.sign(hash, PRIVATE_KEY, {
        recovered: true
    });
    return signature
}
```

Et maintenant un exemple de recover de clé publique à partir de la signature:

```javascript
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)
}
```


Un autre point intéressant dans ce procédé est que depuis un message
signé par une clé privée, il est possible de retrouver la clé publique

Le premier digit de la clé publique détermine si la clé est compressée ou non. Si le premier digit est pair, la clé est compressée, sinon elle ne l'est pas.

Dans le cadre de la blockchain Ethereum, on peut connaitre l'adresse de 
l'utilisateur depuis sa clef publique. Pour cela, on prend les 20 derniers bytes du hash de la clef publique. 
> Hashé en keccak256