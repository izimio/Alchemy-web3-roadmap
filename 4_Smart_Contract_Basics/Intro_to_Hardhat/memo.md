Afin de dev plus facilement des smart contracts, nous allons utiliser Hardhat. Hardhat est un outil de développement Ethereum qui vous aide à écrire, tester et déployer des smart contracts.

Cependant, comme ses prédecesseurs, Truffle, Ganache, etc., Hardhat est entrain de se faire remplacer par un autre outil, nommé Foundry.

Foundry fait pareil qu'Hardhat, mais en mieux. Il est plus rapide, plus simple, plus sécurisé, et plus puissant. Il est aussi plus facile à utiliser, et plus facile à apprendre.

Voilà comment créer un projet Foundry et une explication des différents éléments du projet.

## Créer un projet Foundry

Pour créer un projet Foundry, il suffit de lancer la commande suivante:

```bash
forge init <project_name>
```

Cela va créer un dossier nommé `project_name` dans le dossier courant, et y mettre un projet Foundry.

## Structure du projet

Un projet Foundry est composé de plusieurs éléments:

- `.github/workflows`: Dossier contenant les fichiers de configuration pour GitHub Actions.
- `lib`: Dossier contenant les libs de Foundry (puis de votre projet).
- `src`: Dossier contenant les smart contracts de votre projet.
- `test`: Dossier contenant les tests de votre projet.
- `README.md`: Fichier contenant la documentation de votre projet.
- `foundry.toml`: Fichier de configuration de Foundry.
- `.gitignore`: Fichier contenant la liste des fichiers à ignorer pour Git.

## Compiler le projet

Pour compiler le projet, il suffit de lancer la commande suivante:

```bash
forge build
```

Cela va compiler les smart contracts de votre projet, et créer un dossier `out` contenant les fichiers compilés et les artefacts.

## Tester le projet

Pour tester le projet, il suffit de lancer la commande suivante:

```bash
forge test
```

Cela va lancer les tests de votre projet, et afficher les résultats.

## Déployer le projet

Pour déployer le projet, il suffit de lancer la commande suivante:

```bash
forge create --rpc-url <rpc_url> --constructor-args <constructor_args> --private-key <private_key> <path_to_contract>:<contract_name>
```

Cela va déployer le smart contract spécifié, en utilisant les arguments spécifiés, et en utilisant la clé privée spécifiée.

## Local Blockchain

Pour lancer une blockchain locale, il suffit de lancer la commande suivante:

```bash
anvil
```

Cela va lancer une blockchain locale, et afficher les informations nécessaires pour s'y connecter.