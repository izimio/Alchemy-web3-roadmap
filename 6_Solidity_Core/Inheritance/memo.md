Les principes d'héritage en Solidity sont les mêmes qu'en CPP ou Java, Scala etc...

En Solidity, un contrat peut hériter d'un ou plusieurs contrats. Cela permet de réutiliser du code et de créer des contrats plus modulaires.

## Exemple de contrat hérité

```solidity

pragma solidity ^0.4.24;

contract Owned {
    address private _owner;
    
    modifier isOwner() {
        require(msg.sender == _owner);
        _;
    }
    
    constructor() public {
        _owner = msg.sender;
    }
}

contract Mortal is Owned {
    function kill() isOwner public {
        selfdestruct(_owner);
    }
}

```

Dans cet exemple, le contrat `Mortal` hérite du contrat `Owned`. Le contrat `Mortal` a donc accès à toutes les fonctions et variables du contrat `Owned`.

Les logiques sont les mêmes qu'en language OOP avec les AContrats et les IContrats.

## Ovveride

Il est possible de surcharger une fonction héritée. Par exemple:

```solidity

pragma solidity ^0.4.24;

contract Owned {
    address private _owner;
    
    modifier isOwner() {
        require(msg.sender == _owner);
        _;
    }
    
    constructor() public {
        _owner = msg.sender;
    }
    
    function kill() isOwner virtual  public {
        selfdestruct(_owner);
    }
}

contract Mortal is Owned {
    function kill() isOwner override public {
        // Ajout de la logique de la fonction kill
        // ...
    }
}

```
