En solidity, il est possible d'intérargir avec d'autres contracts.

Pour se faire il existe 2 manières:

- Soit en utilisant l'adresse du contract et en utilisant l'interface du contract
- Soit en utilisant l'adresse du contract et en utilisant la fonction call

Dans les 2 cas, il est nécessaire de connaitre l'adresse du contract avec lequel on souhaite interagir.

## Exemple

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICounter {
    function inc() external;
    function get() external view returns (uint);
}

contract CounterUser {
    ICounter public counter;

    constructor(ICounter _counter) {
        counter = _counter;
    }

    function incCounter() public {
        counter.inc();
    }

    function getCounter() public view returns (uint) {
        return counter.get();
    }
}
```

Dans cet exemple, le contract `CounterUser` interagit avec le contract `Counter` en utilisant l'interface `ICounter`.

## Exemple

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint public count;

    function inc() public {
        count++;
    }

    function get() public view returns (uint) {
        return count;
    }
}
// address: 0x87451f5b3c3d3f3f3f3f3f3f3f3f3f3f3f3f3f3f

contract CounterUser {
    address public counter = 0x87451f5b3c3d3f3f3f3f3f3f3f3f3f3f3f3f3f3f;

    function incCounter() public {
        (bool success, ) = counter.call(abi.encodeWithSignature("inc()"));
        require(success, "CounterUser: inc failed");
    }

    function getCounter() public view returns (uint) {
        (bool success, bytes memory data) = counter.staticcall(abi.encodeWithSignature("get()"));
        require(success, "CounterUser: get failed");
        return abi.decode(data, (uint));
    }
}
```

Dans cet exemple, le contract `CounterUser` interagit avec le contract `Counter` en utilisant la fonction `call`.

# Revert

Il est important de noter que si la fonction appelée avec `call` ou `staticcall` échoue, le contrat appelant doit gérer l'erreur en utilisant `require`.

En effet, en Solidity il est possible de gérer les cas d'erreur renvoyés par l'OP code `REVERT`

Il existe 3 manières de gérer les erreurs:

- `require`: Permet de renvoyer un message d'erreur et de stopper l'exécution du contrat
- `revert`: Permet de renvoyer un message d'erreur et de stopper l'exécution du contrat
- `assert`: Permet de renvoyer un message d'erreur et de stopper l'exécution du contrat

Il est important de noter que `revert` et `assert` ne renvoient pas de message d'erreur dans la version 0.8.0 de Solidity mais uniquement une custom error.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error CounterError();

revert CounterError();
```

# Overload the pramètres d'envoi

Lors d'un call, il est possible de spécifier d'écraser les pramètres par défaut du call.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint public count;

    function pay() public payable {
        require(msg.value > 0.5 ether);
    }
}

contract CounterUser {
    address public counter = 0x87451f5b3c3d3f3f3f3f3f3f3f3f3f3f3f3f3f3f;

    function payCounter() public payable {

        (bool success, ) = counter.call{value: 0.4 ether}(abi.encodeWithSignature("pay()"));
        // this won't work

        (bool success, ) = counter.call{value: 1 ether}(abi.encodeWithSignature("pay()"));
       // This will work
    }
}
```