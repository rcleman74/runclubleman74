# Run Club Léman 74 — Site de l'association

Site vitrine statique (HTML/CSS pur, sans backend) de l'association loi 1901
**Run Club Léman 74** (course à pied, sorties collectives, événements
conviviaux — territoire du Léman, Haute-Savoie). Association créée le
29 mai 2026 à Publier, déclarée à la Préfecture de la Haute-Savoie.

## Déploiement — à savoir avant toute intervention

Ce dépôt est connecté à un projet **Netlify** en déploiement continu :
**tout push sur la branche `main` republie automatiquement le site en
production.** Il n'y a rien d'autre à faire côté Netlify — pas de build,
pas de drag-and-drop, pas d'étape manuelle.

- **Site en ligne :** https://runclubleman74.netlify.app/
- **Dépôt GitHub :** https://github.com/rcleman74/runclubleman74 (public)
- **Branche de production :** `main`
- **Build :** aucun — fichiers statiques servis tels quels depuis la racine
  (`netlify.toml` définit `publish = "."`, `command = ""`)
- Le compte GitHub `rcleman74` et le compte Netlify de l'association sont
  liés au Gmail du club, `rcleman.74@gmail.com`.

**Donc le workflow normal pour toute mise à jour de contenu est : modifier
les fichiers → `git commit` → `git push origin main`. Netlify récupère et
republie automatiquement en 1 à 2 minutes.**

Pousser vers ce dépôt nécessite une authentification (jeton d'accès
personnel *fine-grained*, scope **Contents: Read and write**, limité à ce
seul dépôt). Ce jeton n'est pas stocké ici ; s'il faut en régénérer un,
c'est à faire par la secrétaire de l'association depuis
`https://github.com/settings/personal-access-tokens` (compte `rcleman74`).

## Structure du site

```
index.html       Accueil
le-club.html     Le club / qui sommes-nous (objet associatif + bureau)
sorties.html     Sorties & événements — VOLONTAIREMENT laissé en placeholder,
                 à remplir par le comité (ne pas inventer de contenu)
adhesion.html    Formulaire d'adhésion (saison 2026/2027)
contact.html     Contact
assets/style.css Feuille de style commune (palette navy/denim/cream/red)
assets/logo.png  Logo du club, détouré en rond, fond transparent
```

## Le formulaire d'adhésion (`adhesion.html`)

Formulaire 100% statique, **sans aucun backend/serveur** : la soumission se
fait via un lien `mailto:` (`enctype="text/plain"`) qui ouvre le client mail
du visiteur avec les réponses pré-remplies, à destination de
`rcleman.74@gmail.com`. C'est un choix assumé (pas de Google Forms, pas de
service tiers) — ne pas le remplacer par un formulaire avec backend sans
demande explicite.

## Comité (bureau de l'association)

| Fonction | Nom |
|---|---|
| Président | Mickael Letellier |
| Co-Président | Vincent Candir |
| Secrétaire | Carine Laphin |
| Second Secrétaire | Thomas Gauvin |
| Trésorière | Lucie Le Tellier |
| Co-Trésorière | Océane Dopler |

## Contexte projet plus large

Ce site fait partie du projet Claude **"Comité Du Run Club Leman 74"**, qui
contient aussi les PV d'assemblée générale, la liste des membres du comité,
les accès au Gmail du club, et d'autres documents administratifs de
l'association. Consulter ce projet pour le contexte complet avant de
modifier le contenu (statuts, informations légales, etc.).

## À faire / en attente

- La page **Sorties & événements** est un placeholder à compléter par le
  comité (dates, lieux, niveaux des prochaines sorties) — ne pas y ajouter
  de contenu inventé.
- Réseaux sociaux du club (Instagram, Facebook, Strava...) : liens à
  ajouter sur la page Contact quand ils existeront.
