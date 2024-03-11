En solidity il existe 2 types de variables : les types de données primitifs et les types de données complexes ou autrement appelés les types de données de référence.

## Types de données primitifs

| Type de données | Description |
| --- | --- |
| `bool` | Valeur booléenne (vrai ou faux) |
| `uint` | Entier non signé |
| `int` | Entier signé |
| `address` | Adresse Ethereum |
| `bytes` | Tableau de bytes |
| `string` | Chaîne de caractères |
| `fixed` | Nombre avec une virgule fixe (Pas encore implémenté) |
| `ufixed` | Nombre avec une virgule fixe non signé (Pas encore implémenté) |

## Types de données de référence

| Type de données | Description |
| --- | --- |
| `array` | Tableau |
| `struct` | Structure |
| `enum` | Enumération |
| `mapping` | Hashmap |
| `contract` | Contrat |
| `function` | Fonction |
| `modifier` | Modificateur |
| `event` | Événement |

## Principes

La différence entre ces 2 types de données est que les types de données primitifs sont stockés directement dans la variable, tandis que les types de données de référence stockent un pointeur vers la case mémoire où les données sont stockées.


## Array

En Solidity, un tableau est une collection de données de même type. Il est possible de déclarer un tableau de la manière suivante :

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint[] public myArray;
}
```

Dans cet exemple, `myArray` est un tableau de type `uint` à taille dynamique. Il est possible de déclarer un tableau de taille fixe en utilisant la syntaxe suivante :

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint[3] public myArray;
}
```

Dans cet exemple, `myArray` est un tableau de type `uint` à taille fixe de 3 éléments.

> Il est également possible de déclarer un tableau de taille fixe dépendant d'une variable :

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint public size = 3;
    uint[] public myArray = new uint[](size);
}
```

Ces tableaux peuvent être manipulés à l'aide de 3 méthodes natives :

| Méthode | Description |
| --- | --- |
| `push` | Ajoute un élément à la fin du tableau |
| `pop` | Supprime le dernier élément du tableau |
| `length` | Retourne la taille du tableau |

> ⚠️ Itérer sur un tableau de taille dynamique peut coûter cher en gaz. Il est recommandé d'utiliser des tableaux de taille fixe si la taille du tableau est connue à l'avance. et globalement de ne jamais itérer sur un tableau de taille dynamique.

## Struct

En Solidity, une structure est une collection de données de différents types. Il est possible de déclarer une structure de la manière suivante :

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    struct MyStruct {
        uint id;
        string name;
    }
}
```

or 

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Library {

    struct Book {
        string title;
        string author;
        uint bookId;
    }

    Book[] public books;
}
```

## Localisation en mémoire

Il est possible de spécifier la localisation en mémoire des variables de type `struct` et `array` en utilisant les mots-clés `memory`, `storage` et `calldata`.

| Localisation | Description |
| --- | --- |
| `memory` | Les variables sont stockées en mémoire et sont effacées à la fin de l'exécution de la fonction, il est possible de les modifier et les lire |
| `storage` | Les variables sont stockées dans la case mémoire de l'ordinateur, elles sont persistantes et peuvent être modifiées et lues |
| `calldata` | Les variables sont stockées dans la mémoire de l'appelant, elles ne peuvent pas être modifiées et sont seulement lisibles |

Ou plus grossièrement:

| Localisation | Description |
| --- | --- |
| `memory` | read/write non persistant |
| `storage` | read/write persistant |
| `calldata` | read-only |

## Enum

En Solidity, une énumération est un type de données qui permet de définir un ensemble de constantes nommées. Il est possible de déclarer une énumération de la manière suivante :

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    enum State { PENDING, ACTIVE, INACTIVE }
}
```


