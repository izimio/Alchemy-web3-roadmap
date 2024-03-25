# Storage

Les cases mémoires en Solidty sont gérés de façon assez simple.

Commencant à 0x0 (abréviation de 0x000000...0) et jusqu'à 0xfffff...f.

# DelegateCall

Le `delegatecall` est une fonctionnalité de Solidity qui permet de déléguer l'appel d'une fonction à une autre adresse.

```solidity
contract A {
    uint public n;

    function setN(uint _n) {
        address(B).delegatecall(bytes4(keccak256("setN(uint256)")), _n);
    }
}

contract B {
    uint public n;
    function setN(uint _n) {
        n = _n;
    }
}

```

Dans cet exemple, le contract A délègue l'appel de la fonction `setN` à l'adresse du contract B.
Le principe d'un `delegatecall` est d'utiliser des fonctionnalités d'un autre contrat tout en gardant le contexte:
- Storage
- msg.sender
- msg.value

d'un autre contrat.

# Evolution of Proxy Patterns

Depuis leur première invention, les proxu ont beaucoup évolué. Il existe des proxy très "multi-tache" et d'autres plus minimaliste et simple. Le plus petit proxy ne fait que 47 bytes de code.