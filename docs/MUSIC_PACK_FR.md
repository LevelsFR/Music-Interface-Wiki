# Créer un Music Pack pour Music Interface 2.0

**Un guide accessible pour ajouter vos musiques, pochettes et thèmes adaptés aux situations dans Minecraft.**

Music Interface utilise des **resource packs Minecraft** pour charger les chansons. Il n'est pas nécessaire de coder en Java. Le format des pistes est commun à Fabric et NeoForge. En revanche, les informations de compatibilité de Minecraft dans `pack.mcmeta` doivent correspondre à votre version du jeu.

Pour apprendre à utiliser le lecteur, la Radio, les playlists, les paramètres et les commandes, consultez le [guide général](https://levelsfr.github.io/Music-Interface-Wiki/#overview). Le guide général est actuellement en anglais.

## Réponses rapides

- **Comment attribuer une musique à un événement ?** Avec `contexts` dans `music_data.json` ou dans le fichier facultatif `music_contexts.json`.
- **Les tags suffisent-ils pour une musique de combat ?** Non. `tags`, `genres` et `moods` servent à décrire les pistes et à améliorer les recommandations et la Radio.
- **Comment choisir une musique de menu ?** Entrez son `id` dans le réglage **Title-screen track ID**. Un identifiant vide autorise la sélection automatique.
- **Comment activer la musique de combat Cobblemon ?** Choisissez **Context** pour **Cobblemon Battle Music** et définissez une règle `combat: true`.
- **Peut-on utiliser plusieurs Music Packs ?** Oui, sous forme de dossiers ou de ZIP. Chaque piste doit idéalement avoir son propre ID.

## 1. Créer le dossier du pack

Ouvrez le dossier de votre **instance Minecraft**, puis créez `Mon Music Pack` dans `resourcepacks/` :

```text
.minecraft/
└── resourcepacks/
    └── Mon Music Pack/
        ├── pack.mcmeta
        ├── pack.png                         (facultatif)
        └── assets/
            └── musicinterface/
                ├── music_data.json
                ├── music_contexts.json      (facultatif)
                ├── sounds.json
                ├── sounds/
                │   └── custom/
                │       ├── route_01.ogg
                │       └── battle_theme.ogg
                └── textures/
                    └── covers/
                        ├── route_01.png
                        └── battle_theme.png
```

**Respectez exactement les chemins.** Le mod recherche le namespace `assets/musicinterface/`. Utilisez de préférence des noms de fichiers en minuscules, sans espace ni accent.

### Méthode encore plus simple : générer un modèle

Dans le lecteur Music Interface, utilisez le **bouton de génération d'un pack modèle**. Survolez le bouton pour afficher son info-bulle. Le mod crée `resourcepacks/MusicInterface Template/`, avec des dossiers, des fichiers JSON et une pochette d'exemple, **sans écraser les fichiers déjà présents**.

Remplacez la piste d'exemple par votre fichier OGG et adaptez les chemins dans les JSON. Selon votre version de Minecraft, il faudra aussi adapter `pack.mcmeta`.

## 2. Préparer pack.mcmeta

Minecraft lit `pack.mcmeta` pour déterminer la compatibilité du resource pack. Pour la **base Minecraft 1.21.1**, le générateur du mod utilise :

```json
{
  "pack": {
    "pack_format": 34,
    "description": "Mon Music Pack pour Music Interface"
  }
}
```

**Attention : ne recopiez pas automatiquement `pack_format: 34` sur les versions 1.21.4, 1.21.11 ou 26.x.** Le format des resource packs évolue avec Minecraft. Certaines versions attendent également d'autres champs. Adaptez `pack.mcmeta` aux exigences de votre **version exacte de Minecraft**. Le format Music Interface des chansons, lui, n'a pas besoin d'une variante Fabric ou NeoForge.

Si Minecraft signale une incompatibilité du pack, vérifiez d'abord `pack.mcmeta`.

## 3. Ajouter les fichiers audio OGG

Placez votre première musique ici :

```text
assets/musicinterface/sounds/custom/route_01.ogg
```

Le fichier doit contenir de **véritables données audio OGG**. Renommer un MP3 en OGG ne le convertit pas. Utilisez des noms simples et cohérents.

## 4. Déclarer les sons dans sounds.json

Minecraft doit connaître chaque son avant de pouvoir le jouer. Créez `assets/musicinterface/sounds.json` avec ce contenu :

```json
{
  "custom/route_01": {
    "sounds": [
      {
        "name": "musicinterface:custom/route_01",
        "stream": true
      }
    ]
  },
  "custom/battle_theme": {
    "sounds": [
      {
        "name": "musicinterface:custom/battle_theme",
        "stream": true
      }
    ]
  }
}
```

L'événement sonore `musicinterface:custom/route_01` correspond au fichier `assets/musicinterface/sounds/custom/route_01.ogg`. On n'écrit **ni le dossier `sounds/`, ni l'extension `.ogg`** dans le nom du son du JSON.

Conservez `"stream": true` pour les longues musiques.

## 5. Ajouter les pistes dans music_data.json

Créez `assets/musicinterface/music_data.json`. La racine du fichier doit être un **tableau JSON**, entre crochets. Exemple avec une musique d'exploration et une de combat :

```json
[
  {
    "id": "route_01",
    "title": "Route 01",
    "author": "Votre Nom",
    "album": "Exploration",
    "sound": "musicinterface:custom/route_01",
    "cover": "musicinterface:textures/covers/route_01.png",
    "enabled": true,
    "weight": 1,
    "genres": ["ambient"],
    "moods": ["calm"],
    "tags": ["overworld", "exploration"],
    "energy": 0.3,
    "contexts": [
      {
        "combat": false,
        "priority": 10
      }
    ]
  },
  {
    "id": "battle_theme",
    "title": "Battle Theme",
    "author": "Votre Nom",
    "album": "Battles",
    "sound": "musicinterface:custom/battle_theme",
    "cover": "musicinterface:textures/covers/battle_theme.png",
    "enabled": true,
    "weight": 2,
    "genres": ["orchestral"],
    "moods": ["intense"],
    "tags": ["battle", "combat"],
    "energy": 0.9,
    "contexts": [
      {
        "combat": true,
        "priority": 100
      }
    ]
  }
]
```

La piste `route_01` correspond à une situation sans combat. La piste `battle_theme` peut correspondre à un combat Cobblemon. **Il faut aussi passer le réglage Cobblemon Battle Music sur Context**, comme expliqué plus bas.

### Référence des champs

| Champ | Type | Utilité |
| --- | --- | --- |
| `id` | texte | Identifiant unique de la piste, obligatoire |
| `sound` | identifiant de ressource | Événement sonore déclaré dans `sounds.json`, obligatoire |
| `title` | texte | Titre affiché ; l'ID sert de valeur par défaut |
| `author` / `album` | textes | Artiste et album |
| `cover` | identifiant de ressource | Image PNG ; facultative avec image de secours |
| `enabled` | booléen | Piste activée initialement ; défaut `true` |
| `weight` | entier | Poids relatif du tirage aléatoire ; minimum et défaut `1` |
| `genres` / `moods` / `tags` | texte ou tableau de textes | Descriptions utilisées par la Radio, les mixes et les recommandations |
| `energy` | nombre | Proximité énergétique pour la Radio, entre `0.0` et `1.0` ; défaut `0.5` |
| `cooldown` | entier | Délai minimal en secondes avant une autre sélection automatique ; défaut `0` |
| `volume` | nombre | Multiplicateur de volume de la piste, entre `0.0` et `1.0` ; défaut `1.0` |
| `fade_in` / `fade_out` | entiers | Durées facultatives des fondus de la piste, en secondes |
| `context_fallback` | booléen | Rend la piste éligible au fallback **Dedicated** ; défaut `false` |
| `contexts` | objet ou tableau | Règles de sélection automatique selon le contexte |
| `duration` | texte | Métadonnée facultative acceptée par le parseur ; pas nécessaire pour calculer la durée réelle |

Les champs facultatifs peuvent être omis. Un pack au format simple des versions précédentes reste lisible par le parseur 2.0.

Il n'existe pas de liste imposée de genres, moods et tags. Utilisez des valeurs cohérentes entre vos pistes, comme `calm`, `ambient`, `exploration` ou `orchestral`, pour améliorer les correspondances de la Radio.

## Tags et contextes

Les deux notions ne jouent pas le même rôle :

- **Tags, genres et moods :** ils décrivent **le style** de la musique. Un tag `battle` améliore les rapprochements avec d'autres musiques semblables, mais ne lance **pas** automatiquement la piste en combat.
- **Contexts :** ils indiquent **quand la musique peut être sélectionnée** par le système de lecture automatique.

Exemple de champs **à l'intérieur d'une piste** :

```json
{
  "tags": ["battle", "boss"],
  "contexts": [
    {
      "combat": true,
      "priority": 100
    }
  ]
}
```

C'est la propriété `contexts` qui pose la condition de combat. Ce bloc illustre des champs, il ne constitue pas à lui seul un `music_data.json` complet.

### Champs autorisés dans une règle de contexte

| Champ | Exemple | Fonctionnement |
| --- | --- | --- |
| `priority` | `100` | La priorité numérique la plus haute gagne ; défaut `0` |
| `dimensions` | `["minecraft:overworld"]` | Identifiants des dimensions |
| `biomes` | `["minecraft:plains"]` | Identifiants des biomes |
| `biome_tags` | `["#minecraft:is_forest"]` | Tags de biomes ; le préfixe `#` est accepté |
| `time` | `["day"]` | Valeurs possibles : `day`, `night` |
| `weather` | `["clear", "rain"]` | Valeurs possibles : `clear`, `rain`, `thunder` |
| `combat` | `true` | Booléen indiquant si un combat Cobblemon pris en charge est actif |

Une propriété acceptant une liste peut contenir **une chaîne seule** ou **un tableau**. Dans une même propriété, plusieurs valeurs se lisent comme un **OU**. Entre les propriétés d'une même règle, les conditions se combinent comme un **ET**. Plusieurs objets de règles permettent de décrire plusieurs situations alternatives.

Exemple : musique pour **la pluie ou l'orage, de nuit, dans les plaines de l'Overworld, hors combat** :

```json
{
  "dimensions": ["minecraft:overworld"],
  "biomes": ["minecraft:plains"],
  "time": ["night"],
  "weather": ["rain", "thunder"],
  "combat": false,
  "priority": 30
}
```

**La priorité est explicite.** Une règle avec davantage de critères ne gagne pas automatiquement face à une règle plus simple. C'est le nombre défini dans `priority` qui départage les contextes correspondants.

## 6. Musique d'exploration et Ambient

Ajoutez cette propriété dans une piste destinée à l'exploration :

```json
"contexts": [
  {
    "combat": false,
    "priority": 10
  }
]
```

Vous pouvez ajouter `"biomes": ["minecraft:forest"]` dans cette règle pour limiter la piste à la forêt, ou encore utiliser `time` et `weather`.

**Ambient** est aussi un mode de lecture global : le lecteur peut laisser un intervalle entre deux morceaux. Le mode **Continuous** supprime cet intervalle volontaire. Il n'est pas nécessaire d'ajouter un tag spécial pour activer ces modes.

## 7. Musique de combat Cobblemon

Dans la piste de combat, utilisez :

```json
"contexts": [
  {
    "combat": true,
    "priority": 100
  }
]
```

Puis dans Music Interface :

1. Installez une version de Cobblemon compatible avec votre loader et votre version de Minecraft, lorsqu'elle existe.
2. Activez **Context Music** dans les paramètres du mod.
3. Passez **Cobblemon Battle Music** sur **Context**. Le réglage par défaut, **External**, suspend la musique Music Interface pendant les combats Cobblemon détectés.
4. Choisissez **Context Transition: Crossfade** si vous souhaitez que le mod change une piste déjà lancée **par le système contextuel** lors d'un changement de contexte. Par défaut, **Finish** laisse la piste se terminer.
5. Prévoyez également des pistes hors combat ou un fallback pour le retour à l'exploration.

L'intégration s'appuie sur des événements de combat Cobblemon pris en charge. Elle ne détecte pas automatiquement tous les systèmes de combat des autres mods. Une musique lancée manuellement, la file d'attente, une playlist ou la Radio peuvent être prioritaires sur la lecture contextuelle.

## 8. Choisir une musique pour l'écran titre

La méthode recommandée passe par les **paramètres du lecteur**, pas par un tag `menu` :

1. Ajoutez une piste normale aux fichiers `music_data.json` et `sounds.json`, par exemple avec l'ID `main_menu_theme`.
2. Dans Music Interface, activez **Custom Menu Music**.
3. Renseignez **Title-screen track ID** avec `main_menu_theme`.

Si le champ est **vide**, Music Interface peut sélectionner automatiquement une piste de la bibliothèque pour l'écran titre. Un champ vide **ne désactive pas** la musique. Pour couper les musiques personnalisées du menu, désactivez **Custom Menu Music**.

L'option **Allow Vanilla Menu Music** concerne séparément la musique du menu d'origine de Minecraft. Les règles de contexte du monde ne servent pas à filtrer les pistes proposées automatiquement sur l'écran titre.

## 9. Placer les contextes dans music_contexts.json

Pour séparer les règles des informations sur les chansons, créez le fichier facultatif `assets/musicinterface/music_contexts.json`.

Premier format accepté : un **objet associant chaque ID à ses règles** :

```json
{
  "route_01": [
    {
      "combat": false,
      "priority": 10
    },
    {
      "biomes": ["minecraft:forest"],
      "time": ["day"],
      "combat": false,
      "priority": 30
    }
  ],
  "battle_theme": [
    {
      "combat": true,
      "priority": 100
    }
  ]
}
```

Deuxième format accepté : un **tableau** où chaque règle indique le champ `track` :

```json
[
  {
    "track": "route_01",
    "combat": false,
    "priority": 10
  },
  {
    "track": "battle_theme",
    "combat": true,
    "priority": 100
  }
]
```

Ces règles sont **ajoutées** aux éventuels `contexts` déjà déclarés directement dans `music_data.json`. Si plusieurs packs fournissent des règles externes pour le même ID, la définition externe du pack le plus prioritaire l'emporte sur les autres définitions externes. Un ID inexistant produit un avertissement.

Pour débuter, choisissez **l'une des deux méthodes** plutôt que de déclarer deux fois les mêmes règles.

## 10. Que se passe-t-il si aucune règle ne correspond ?

Le réglage **Context Fallback** propose :

- **Library** (par défaut) : sélection dans les pistes disponibles de la bibliothèque quand aucun contexte explicite ne correspond.
- **Dedicated** : uniquement des pistes portant `"context_fallback": true` dans cette situation.

Exemple d'**objet représentant une seule piste**, à placer dans le tableau `music_data.json` :

```json
{
  "id": "route_01",
  "title": "Route 01",
  "sound": "musicinterface:custom/route_01",
  "context_fallback": true,
  "contexts": [
    {
      "combat": false,
      "priority": 10
    }
  ]
}
```

## 11. Ajouter les pochettes

Placez les images PNG dans `assets/musicinterface/textures/covers/`. Référencez chaque image dans la piste :

```json
"cover": "musicinterface:textures/covers/route_01.png"
```

Une pochette n'est pas obligatoire pour la lecture. Le lecteur dispose d'une image de secours. En cas de chemin invalide, les diagnostics peuvent signaler la ressource manquante. **La couleur du contour des notifications Now Playing est calculée automatiquement à partir de la couleur dominante de la pochette.** Si aucune pochette exploitable n'est disponible, une couleur par défaut est utilisée. Aucun réglage ni champ JSON ne permet actuellement de choisir librement cette couleur.

## 12. Activer, actualiser et cumuler les Music Packs

1. Placez le **dossier** ou le fichier **ZIP** dans `resourcepacks/`.
2. Activez-le dans le menu **Resource Packs** de Minecraft.
3. Ouvrez Music Interface et vérifiez la bibliothèque.
4. Après toute modification, utilisez `F3+T` pour recharger les ressources.

Music Interface fusionne les fichiers `music_data.json` des packs actifs. En cas de collision entre deux pistes portant le même `id`, **la définition du pack le plus prioritaire l'emporte**. Conservez des IDs stables et uniques : les favoris et playlists les utilisent.

La commande cliente `/musicinterface_diagnostics` affiche le nombre de packs, les pistes, les collisions d'IDs et les avertissements, notamment les sons ou pochettes manquants. Sous NeoForge, `/musicinterface diagnostics` existe également côté client ; sur certains serveurs, une commande de même nom peut être réservée aux administrateurs.

## 13. Résoudre les problèmes courants

| Problème | Vérification |
| --- | --- |
| Minecraft indique un pack incompatible | Adaptez `pack.mcmeta` à votre version exacte |
| Aucune piste n'apparaît | Vérifiez le chemin, l'activation, le tableau JSON, puis `F3+T` |
| La piste apparaît, mais reste muette | Vérifiez l'OGG réel, l'événement dans `sounds.json` et le champ `sound` |
| La pochette ne s'affiche pas | Vérifiez le PNG et le chemin `cover` |
| Le tag `battle` ne déclenche rien | Définissez `combat: true` et activez le mode Cobblemon `context` |
| Une piste est jouée au mauvais endroit | Contrôlez les règles, leurs priorités, le fallback et la source de lecture active |
| Le contexte change, mais pas la musique | Le mode par défaut est `finish` ; `crossfade` concerne la lecture contextuelle |
| Un ID de menu vide joue toujours de la musique | C'est normal : vide signifie sélection automatique |
| Une piste écrase celle d'un autre pack | Modifiez l'ID ou l'ordre de priorité des packs |
| Rien ne joue juste après l'entrée dans un monde | Vérifiez le silence initial et les délais du mode Ambient |
| Le modèle est incompatible avec une version 26.x | Corrigez le `pack.mcmeta` généré pour cette version |

**Conseil :** commencez avec un seul fichier OGG et une seule piste valide, puis ajoutez les métadonnées et les contextes. Si vous distribuez des chansons ou des illustrations, vérifiez que vous disposez des droits nécessaires.

Voir également le [guide général Music Interface 2.0](docs/PROJECT_GUIDE.md) et le [Music Pack guide en anglais](https://levelsfr.github.io/Music-Interface-Wiki/#musicpacks).
