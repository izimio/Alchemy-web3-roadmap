le format ERC-20 est un standard pour les tokens Ethereum. Il définit un ensemble de règles que les tokens doivent respecter pour être utilisés sur la blockchain Ethereum. Le standard ERC-20 est utilisé pour les tokens Ethereum, mais il peut également être utilisé pour d'autres types de tokens. E.g. les tokens ERC-20 peuvent être utilisés pour représenter des actions, des obligations, des biens immobiliers, etc...

## Les fonctions de base d'un contrat ERC-20

Un contrat ERC-20 doit implémenter les fonctions suivantes:

- `totalSupply`: retourne le nombre total de tokens en circulation
- `balanceOf`: retourne le nombre de tokens possédés par une adresse
- `transfer`: transfère un nombre de tokens à une adresse
- `transferFrom`: transfère un nombre de tokens d'une adresse à une autre
- `approve`: autorise une adresse à transférer un nombre de tokens
- `allowance`: retourne le nombre de tokens qu'une adresse est autorisée à transférer

## Exemple de contrat ERC-20

```solidity

pragma solidity ^0.4.24;

contract ERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint private _totalSupply;
    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowed;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor(string name, string symbol, uint8 decimals, uint totalSupply) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
        _totalSupply = totalSupply;
        _balances[msg.sender] = totalSupply;
    }

    function name() public view returns (string) {
        return _name;
    }

    function symbol() public view returns (string) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint) {
        return _balances[owner];
    }

    function transfer(address to, uint value) public returns (bool) {
        require(value <= _balances[msg.sender]);
        require(to != address(0));

        _balances[msg.sender] -= value;
        _balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns (bool) {
        require(value <= _balances[from]);
        require(value <= _allowed[from][msg.sender]);
        require(to != address(0));

        _balances[from] -= value;
        _balances[to] += value;
        _allowed[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint value) public returns (bool) {
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint) {
        return _allowed[owner][spender];
    }
}

```