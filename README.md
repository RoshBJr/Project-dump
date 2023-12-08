[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/eDiKs7tr)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11039370)

>[Lien vers ma Solution sur `Firebase Hosting`](https://tp2-idj-1a294.web.app/)

# TP #2 : Intégration `React`/`Firebase` 
## Environnement nuagique `Firebase` à intégrer : `Firestore`, `Firebase Authentication`, `Firebase Storage`, et `Firebase Hosting`

## Travail d'équipe permis (mais pas plus de 2 personnes par équipe).

>Si vous travaillez en équipe, les deux personnes doivent accepter les fichiers du TP sur *GitHub Classroom*.

>Vous travaillez ensuite chacun.e sur votre version de code, que ce soit dans l'environnement nuagique `Codespaces` ou localement (ou une combinaison des deux, en autant que vous faites vos fusions et synchronisations du code correctement).

>Divisez le travail dans l'équipe de façon à simplifier/faciliter ces fusions (expérimentez, c'est le moment idéal !)

## Objectif/exigences généraux
* Vous créez une application `React` monopage nommée *Image du jour* dont les fonctionnalités sont les mêmes que l'application `PHP` donnée en exemple (*démo* dans l'image au bas de ce devis), et disponible en tout temps à l'URL **[suivante](https://csemaan.webdev.cmaisonneuve.qc.ca/idj/)** (cette page est accessible à partir des ordinateurs du *Collège* normalement, mais de l'extérieur du Collège, il faut configurer l'accès `VPN` : si vous avez des questions, on en parle en classe ou sur *Teams*)

* Vous devez créer une application ayant les mêmes fonctionnalités que l'application `PHP` donnée en *démo*, mais par contre la conception graphique, et l'interactivité peuvent s'en écarter partiellement ou talaement (à vous de décider !)

* Votre application doit être modulaire, adaptative (*mobile first*), visuellement attrayante et ayant une IU réactive et animée.

* Les images utilisées dans l'application sont stockées dans `Firebase Storage`

* La gestion des utilisateurs est faite avec `Firebase Authentication` (uniquement `Google Provider` est demandé, mais si vous voulez implémenter plus de modes d'authentification, vous êtes bien sûr libre de le faire)

* Les données utilisateurs de l'application sont stockées et gérées dans `Firebase Firestore` ; certaines données doivent être gérées en temps réel (par exemple, le *plébiscite*, les *commentaires*, et les *votes* sur les commentaires)

* Votre application doit être hébergée sur `Firebase Hosting`, mais attention, les fichiers de déploiement doivent être obfusqués et compressés, et produits sans fichiers `sourcemap` (autrement dit attendez mes instructions en classe avant de déployer !)

* Utilisez `Sass` pour produire votre code `CSS` : un fichier par composant SVP ! 

* Les composants `React` doivent utiliser la syntaxe *fonctionnelle* (la seule que nous avons vu en classe)

* Préférez le code *déclaratif* (ou *fonctionnel*, ou *expressif*) au lieu du code *impératif* partout où c'est possible : on en parle en classe

## Étapes à suivre
1. Cliquez le bouton *Open in GitHub Codespaces* ou si vous préférez, *clonez* le dépôt sur votre machine locale

2. Un gabarit CRA est déjà fourni : installez les modules de base de l'appli (ou laissez le temps à `Codespaces` de finir l'installation :wink:)

3. Les modules essentiels sont déjà spécifiés dans le fichier `package.json` fourni, mais au besoin installez les autres *modules* au fur et à mesure qu'ils sont requis dans votre solution

4. Commencez par produire la structure, le contenu et le format des composants statiques de l'interface utilisateur ; l'interface minimale et l'interactivité sont illustrées dans la démo jointe au bas de ces instructions (image `gif` animée), cependant la conception graphique et la mise en page peuvent être complètement différents ; n'oubliez pas de personnaliser les `title`, `meta/description`, et `favicon` de votre page Web

5. Utilisez des composants IU d’une librairie externe au besoin (par exemple `MUI`)

6. Produisez les fonctionnalités requises par l'interactivité de votre application : 
    1. Afficher une *image du jour* pour le jour courant, et toutes les données associées à partir de `Firestore` 
       Une *image* a les caractéristiques suivantes : 
       1. *identifiant* : je suggère d'utiliser la date du jour en format **AAAAMMJJ**
       2. *description* (optionnel)
       3. *url* : adresse *http* sur `Firebase Storage` de l'image
       4. *statut aime* ou *plebiscite* de l'image : un tableau contenant les identifiants des utilisateurs ayant *aimé* cette image
       5. Un ensemble de commentaires associés à l'image (affichés par date d'ajout en ordre chronologique descendant)

       Un commentaire a les caractéristiques suivantes : 
       1. *identifiant* : je suggère de laisser `Firestore` le générer dynamiquement
       2. *texte* : texte du commentaire
       3. *nom de l'utilisateur* : nom de l'utilisateur ayant laissé le commentaire
       4. *identifiant de l'utilisateur* : identifiant de l'utilisateur ayant laissé ce commentaire
       5. *timestamp* : temps en millisecondes dans l'ère Unix (pas affiché, mais utilisé pour ordonner l'affichage des commentaires)
       6. *votes* : un tableau associatif (*map*) contenant les votes laissés par les utilisateurs sur ce commentaire

       Un utilisateur a les caractéristiques suivantes : 
       1. *identifiant* : c'est l'identifiant retourné par `Firebase Authentication`
       2. *nom* : c'est la valeur retournée par `Google Provider`
       3. *avatar* : c'est la valeur retournée par `Google Provider`
       4. *courriel* : c'est la valeur retournée par `Google Provider`

       (suggestion 1 : une seule *collection* `Firestore` est nécessaire pour gérer les images avec toutes leurs données associées, et une deuxième collection **séparée** pour gérer les utilisateurs)

       >IMPORTANT : l'affichage du *plébisicite*, des *commentaires* et des *votes* doivent raffraîchir l'interface utilisateur de tous les navigateurs connectés à l'application **en temps réel** (sans nécéssiter un rffraîchissement manuel de la page Web)

       >IMPORTANT : l'affichage d'un *commentaire* est *priorisé*/*pénalisé* selon le différentiel de votes *positifs*/*négatifs* qu'il a reçu (à vous de déterminer le mode exacte d'implémentation de cette fonctionnalité : vous n'êtes pas obligé de vous en tenir à ce qui est montré dans la *démo*)

    2. Afficher l'image du jour pour le jour *précédent* ou le jour *suivant*, ou le *premier* jour (date de la première image du jour), ou le *dernier* jour (jour courant ou *aujourd'hui*)
    3. Se connecter/déconnecter avec `Google` (utiliser `Firebase Authentication`)
    4. Aimer/Désaimer une image (seul un utilisateur connecté peut faire ça) 
    5. Ajouter un commentaire à une image (seul un utilisateur connecté peut faire ça)
    6. Supprimer un commentaire à une image (seul l'utilisateur connecté et ayant laissé le commentaire peut faire ça)
    7. Voter sur un commentaire à une image (seul un utilisateur connecté peut faire ça) : le vote peut être *positif* (👍), *négatif* (👎), ou *neutre* (ni 👍, ni 👎)

7. Gérez les messages de l'interface utilisateur (messages dits *toast*) comme dans l'application *démo* fournie 
    Suggestion : utilisez uniquement le CSS pour gérer ces messages

8. Compilez le code source de votre solution complétée et déployez-le sur `Firebase Hosting` : testez extensivement **toutes** les fonctionnalités, à partir de plusieurs ordinateurs différents, avec des *utilisateurs* différents

8. Synchronisez votre solution complétée avec le dépôt GitHub qui vous a été assigné lorsque vous avez accepté le travail (c'est le dépôt distant (*remote*) déjà défini dans votre projet)

9. :bangbang: :warning: :x: NON, NON, et NON : pour ce travail, **NE DÉPLOYEZ PAS** votre solution sur `GitHub Pages` (sinon, risque de plagiat) :bangbang: :warning: :x:

### Gardez une copie personnelle de votre travail : le dépôt de remise sur `582-4PA` sera supprimé une fois la correction complétée et les notes publiées.

---

>ATTENTION : la démo ci-dessous est pour inspiration seulement, en particulier la gestion des utilisateurs dans le TP #2 doit être faite avec `Google Authentication Provider` et non pas avec *pseudo/mot de passe* comme illustrée dans cette démo.

<img src="/demo.gif" alt="demo de la solution" title="Démo de la version PHP" />
