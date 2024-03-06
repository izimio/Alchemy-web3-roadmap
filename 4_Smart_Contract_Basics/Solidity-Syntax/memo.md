Solidity est le langage de programmation majoritairement utilisé sur la Blockchain Ethereum pour écrire des contrats intelligents. Il est similaire à JavaScript et est conçu pour être compilé en bytecode pour l'Ethereum Virtual Machine (EVM).

Les contrats intelligents sont des programmes informatiques qui s'exécutent sur la blockchain Ethereum. Ils sont utilisés pour automatiser des transactions et des processus sur la blockchain Ethereum. Il sont comparables à une API globale qui peut être utilisée par n'importe qui.

Il faut imaginer le principe de smart-contract comme un distributeur automatique. Vous mettez de l'argent dans le distributeur et vous obtenez un produit en retour. Les contrats intelligents fonctionnent de la même manière, sauf qu'ils sont programmés pour effectuer des tâches spécifiques lorsqu'ils reçoivent des fonds.
Un distributeur est accessible à tous, tout comme un contrat intelligent. Tout le monde peut interagir avec un contrat intelligent, à condition de payer les frais de gaz.

# Les Types en Solidity

| Type | Description |
| ---  | ----------- |
| `bool` | Un type de données qui peut être soit `true` soit `false`. |
| `int` | Un type de données qui peut être soit positif, soit négatif, soit nul. |
| `uint` | Un type de données qui ne peut être que positif ou nul. |
| `address` | Un type de données qui stocke une adresse Ethereum. |
| `string` | Un type de données qui stocke une chaîne de caractères. |
| `bytes` | Un type de données qui stocke une chaîne de caractères de taille variable. |
| `bytes32` | Un type de données qui stocke une chaîne de caractères de 32 octets. |
| `mapping` | Un type de données qui stocke des paires clé-valeur. |
| `struct` | Un type de données qui stocke un ensemble de variables. |
| `enum` | Un type de données qui stocke un ensemble de constantes. |
---

> Les types de données comme int et uint peuvent avoir des variants comme int8, int16, int32, int64, int128, int256, uint8, uint16, uint32, uint64, uint128, uint256. Ces variantes définissent la taille des données que le type peut stocker.

Préciser le type de données est important car cela permet de réduire la consommation de gaz. Par exemple, si vous savez que la valeur d'une variable ne dépassera jamais 255, vous pouvez utiliser uint8 au lieu de uint256 pour économiser de l'espace de stockage et des frais de gaz.

# Les Variables en Solidity

Les variables en Solidity sont déclarées en spécifiant le type de données suivi du nom de la variable. Voici un exemple de déclaration de variable :

```solidity
uint256 public myVariable;
```

Dans cet exemple, `uint256` est le type de données et `myVariable` est le nom de la variable. `public` est un modificateur de visibilité qui permet à la variable d'être lue par d'autres contrats.

Il existe plusieurs modificateurs de visibilité en Solidity :

| Modificateur | Description |
| ---          | ----------- |
| `public`     | La variable peut être lue par n'importe qui. |
| `private`    | La variable ne peut être lue que par le contrat qui la contient. |
| `internal`   | La variable ne peut être lue que par le contrat qui la contient et par les contrats qui héritent de ce contrat. |


# Globales

Il existe également des variables globales qui sont disponibles dans tous les contrats Solidity. Voici quelques-unes des variables globales les plus couramment utilisées :

| Variable | Description |
| ---      | ----------- |
| `msg.sender` | L'adresse de l'expéditeur de la transaction. |
| `msg.value`  | La valeur en wei envoyée avec la transaction. |
| `block.number` | Le numéro du bloc actuel. |
| `block.timestamp` | Le timestamp du bloc actuel. |
| `now` | Un alias pour `block.timestamp`. |
| `tx.gasprice` | Le prix du gaz de la transaction. |
| `tx.origin` | L'adresse de l'expéditeur de la transaction d'origine. |

# Les Fonctions en Solidity

Les fonctions en Solidity sont déclarées en spécifiant le type de données de retour suivi du nom de la fonction. Voici un exemple de déclaration de fonction :

```solidity

function myFunction() public returns (uint256) {
    // Code de la fonction
    return 123;
}
```
*
# ByteCode, Opcodes et ABI

Le bytecode est le code qui est exécuté par l'Ethereum Virtual Machine (EVM). Il est généré à partir du code source Solidity à l'aide d'un compilateur Solidity.

Les opcodes sont les instructions exécutées par l'EVM. Chaque opcode effectue une opération spécifique, comme l'ajout de deux nombres ou le stockage d'une valeur dans la mémoire.

L'ABI (Application Binary Interface) est un format standard pour les données qui sont passées entre les contrats intelligents et les applications clientes. Elle définit la structure des données et les types de données qui peuvent être utilisés pour interagir avec les contrats intelligents.

Voici une liste de quelques opcodes couramment utilisés :

| Opcode | Description |
| ---    | ----------- |
| `PUSH1` | Pousse un octet sur la pile. |
| `PUSH2` | Pousse deux octets sur la pile. |
| `MSTORE` | Stocke un mot dans la mémoire. |
| `SLOAD` | Charge un mot de stockage. |
| `SSTORE` | Stocke un mot dans le stockage. |
| `CALL` | Appelle un contrat. |
| `RETURN` | Retourne des données du contrat. |
| `REVERT` | Rejette les modifications de l'état et retourne des données. |
| `CREATE` | Crée un nouveau contrat. |
| `SELFDESTRUCT` | Détruit le contrat actuel et envoie les fonds à une adresse. |

