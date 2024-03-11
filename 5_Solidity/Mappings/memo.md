Les hashmap sont des structures de données qui permettent de stocker des données de manière non ordonnée. Elles sont très utilisées en Solidity pour stocker des données de manière efficace.

## Syntaxe

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    mapping(uint => string) public myMap;
}
```

Dans cet exemple, `myMap` est une hashmap qui stocke des valeurs de type `string` en fonction de clés de type `uint`.

L'utilité des hashmap est de pouvoir stocker un grand nombre de donnée tout en ayant une recherhe dans ses dernières en complexité **O(1).**

# Proof of Victory

![alt text](image.png)