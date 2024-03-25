### Les Librairies dans les Contrats Intelligents

Les librairies dans les contrats intelligents représentent des éléments essentiels pour la modularité et la réutilisabilité du code sur la blockchain. Voici quelques points clés à retenir sur les librairies :

#### Qu'est-ce qu'une Librairie ?

Une librairie est un contrat qui peut être déployé indépendamment et réutilisé par d'autres contrats. Elle permet de réduire la taille du code et d'éviter la duplication de celui-ci. Les librairies sont déployées une seule fois sur la blockchain et peuvent être utilisées par plusieurs contrats.

#### Déploiement et Utilisation

Pour déployer une librairie, on utilise le mot-clé `library` au lieu de `contract`. Une fois déployée, elle est accessible à tout contrat qui en a besoin. Cela favorise la modularité et la gestion efficace du code sur la blockchain.

#### Caractéristiques Principales

- **Réduction de la Duplication de Code :** Les librairies permettent d'éviter la répétition de code en fournissant des fonctionnalités réutilisables.
  
- **Modularité :** En permettant aux développeurs de séparer les fonctionnalités en modules distincts, les librairies favorisent la modularité du code.

- **Déploiement Unique :** Une fois déployée, une librairie peut être utilisée par plusieurs contrats, ce qui réduit la charge sur la blockchain en évitant la redondance des déploiements.

#### Limitations

- **Absence de Stockage d'État :** Contrairement aux contrats traditionnels, les librairies ne peuvent pas stocker d'état. Elles sont plutôt conçues pour fournir des fonctionnalités et des méthodes.

- **Absence d'Héritage :** Contrairement aux contrats, les librairies ne peuvent pas être héritées. Elles sont conçues pour être utilisées en tant que modules autonomes.
