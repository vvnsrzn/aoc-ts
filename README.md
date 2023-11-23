# aoc-ts

**Starter kit des champions pour réussir son AoC avec TypeScript**

## Libs

### Math

- [x] Average
- [x] Sum
- [x] Median

### Fetch and Write

- [x] Fetch the Puzzle
- [x] Write the Puzzle

## How to?

`$ pnpm run dev`

Cette commande va vérifier si le challenge est bien chargé. Dans le cas contraire, elle va télécharger et écrire le puzzle et les instructions dans un dossier `inputs`.

`$ pnpm run test`

Pour réaliser le challenge avec des tests unitaires, vous pouvez lancer cette commande de tests.

`$ pnpm run bench`

Pour vérifier quelle méthode est la plus performante (voir matrix/index.bench.ts).

## Variables d'environnement

Pour récupérer le fichier directement depuis l'AoC, il faut remplir la variable d'environnement `SESSION_COOKIE`

- Se connecter à AoC, ouvrir la console de son navigateur
- Application -> Cookies
- Recopier la valeur du cookie "session"

Si vous souhaitez faire une autre année, renseigner la variable `AOC_YEAR`, autrement ça sera l'année actuelle.

Pour spécifier le jour, renseigner la variable `AOC_DAY`, autrement ça sera le jour actuel.
