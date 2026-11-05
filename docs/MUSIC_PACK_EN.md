# Creating a Music Pack for Music Interface 2.0

**A beginner-friendly guide to adding your own songs, cover art and music for specific situations in Minecraft.**

Music Interface reads music from a standard Minecraft **resource pack**. You do not need to program a mod. The track metadata format works on Fabric and NeoForge, but vanilla resource-pack compatibility metadata must match the Minecraft version you use.

For the player, settings, queues, playlists and Radio, see the [complete user guide](docs/PROJECT_GUIDE.md).

## Quick answers

- **Where are songs assigned to events?** In a track's `contexts` field or optional `music_contexts.json`.
- **Are tags enough for battle music?** No. `tags`, `genres` and `moods` describe songs for Radio and recommendations; they do not trigger events.
- **How do I pick one menu theme?** Enter its song `id` in the **Title-screen track ID** setting. Blank allows automatic menu selection.
- **How does Cobblemon music work?** Set **Cobblemon Battle Music** to **Context** and use a `combat: true` context rule.
- **Can I combine packs?** Yes, including folders and ZIP files. Keep song IDs unique.

## 1. Create the pack folder

Open the folder of your Minecraft **instance**, then create `My Music Pack` inside its `resourcepacks/` directory:

```text
.minecraft/
└── resourcepacks/
    └── My Music Pack/
        ├── pack.mcmeta
        ├── pack.png                         (optional)
        └── assets/
            └── musicinterface/
                ├── music_data.json
                ├── music_contexts.json      (optional)
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

**Exact spelling matters.** Music Interface reads the namespace `assets/musicinterface/`. Use lowercase names without spaces or accents for resource paths.

### Easier option: generate a template

Open the Music Interface player and use its **template generation** control (hover for the tooltip). The mod creates `resourcepacks/MusicInterface Template/` with folders, basic JSON and an example cover. It **does not overwrite existing template files**.

Replace the example track with your own OGG, then update its paths and IDs. The generated `pack.mcmeta` is a baseline example that may require changes for your Minecraft version.

## 2. Set up pack.mcmeta

Minecraft reads `pack.mcmeta` before enabling a resource pack. The project generator uses this for the **Minecraft 1.21.1 baseline**:

```json
{
  "pack": {
    "pack_format": 34,
    "description": "My Music Pack for Music Interface"
  }
}
```

**Do not copy `pack_format: 34` blindly to 1.21.4, 1.21.11 or 26.x.** Resource-pack metadata changes between Minecraft versions. Some versions also require different/additional format fields. Use the requirements for your **exact Minecraft version**. The music metadata documented below is independent of Fabric versus NeoForge.

If Minecraft reports that the pack is incompatible, fix `pack.mcmeta` first.

## 3. Add OGG files

Put your song here:

```text
assets/musicinterface/sounds/custom/route_01.ogg
```

Use actual **OGG audio**, not an MP3 renamed to OGG. Short, consistent file names are easiest to manage.

## 4. Register sounds in sounds.json

Minecraft needs a sound event entry for each OGG. Save this file as `assets/musicinterface/sounds.json`:

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

The event `musicinterface:custom/route_01` points to `assets/musicinterface/sounds/custom/route_01.ogg`. Omit the file extension and the `sounds/` folder from the JSON name. Keep `"stream": true` for long music.

## 5. Register tracks in music_data.json

Save a **JSON array** inside `assets/musicinterface/music_data.json`. Here are two tracks:

```json
[
  {
    "id": "route_01",
    "title": "Route 01",
    "author": "Your Name",
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
    "author": "Your Name",
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

`route_01` can match when no battle is active; `battle_theme` can match while a compatible Cobblemon battle is active. **You still need to enable Cobblemon's Context mode in settings**, as explained below.

### Track fields

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | Unique song identifier, required |
| `sound` | resource ID | Registered sound event, required |
| `title` | string | Display title; defaults to ID |
| `author` / `album` | strings | Artist and collection |
| `cover` | resource ID | PNG cover; optional, fallback if missing |
| `enabled` | boolean | Initially enabled, default `true` |
| `weight` | integer | Relative weight in random order, minimum/default `1` |
| `genres` / `moods` / `tags` | string or string array | Descriptive labels for Radio, mixes and recommendations |
| `energy` | number | Radio energy similarity, clamped `0.0` to `1.0`, default `0.5` |
| `cooldown` | integer | Seconds before repeat eligibility in autoplay, default `0` |
| `volume` | number | Track volume multiplier, clamped `0.0` to `1.0`, default `1.0` |
| `fade_in` / `fade_out` | integers | Optional per-track fade durations in seconds |
| `context_fallback` | boolean | Included in **Dedicated** fallback, default `false` |
| `contexts` | object or array | Rules controlling contextual autoplay |
| `duration` | string | Accepted optional metadata; not required for playback timing |

Optional fields can be omitted. Simple older track definitions remain valid in the 2.0 parser.

Use consistent labels, such as `calm` or `orchestral`, across your library to make Radio similarity useful. No fixed genre, mood or tag vocabulary is required.

## Tags vs contexts

A tag answers **"what kind of music is this?"** A context answers **"when can the scheduler choose it?"**

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

This block shows **fields within a track**, not a standalone `music_data.json` file. Only `contexts` creates the battle condition; `tags` helps with similarity.

### Context rule fields

| Field | Example | Behavior |
| --- | --- | --- |
| `priority` | `100` | Highest matching numeric priority wins; default `0` |
| `dimensions` | `["minecraft:overworld"]` | Dimension identifiers |
| `biomes` | `["minecraft:plains"]` | Biome identifiers |
| `biome_tags` | `["#minecraft:is_forest"]` | Biome tag IDs; `#` prefix accepted |
| `time` | `["day"]` | `day` or `night` |
| `weather` | `["clear", "rain"]` | `clear`, `rain` or `thunder` |
| `combat` | `true` | Boolean: supported Cobblemon combat active or inactive |

For list properties, you may use a single string or an array. Multiple values **in one property** mean OR; different properties **in one rule** must all match (AND). Several rule objects represent alternative situations.

For example, this rule matches **rain or thunder, at night, on plains in the Overworld, outside combat**:

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

**Priority is explicit:** a more specific rule is not automatically stronger than a general rule. A missing `contexts` rule does not restrict a song to any particular biome. Unrestricted/legacy songs can remain eligible during library fallback.

## 6. Ambient / exploration music

Put this property into an exploration track:

```json
"contexts": [
  {
    "combat": false,
    "priority": 10
  }
]
```

To select forest music, add `"biomes": ["minecraft:forest"]` inside that rule. For time or weather, add `time` or `weather`.

**Ambient** is also a global playback mode: it can leave a delay between tracks. It is not a special tag or context value. **Continuous** removes the intentional delay.

## 7. Cobblemon battle music

For a song meant to play during a detected battle:

```json
"contexts": [
  {
    "combat": true,
    "priority": 100
  }
]
```

Also configure the mod:

1. Install compatible Cobblemon for the loader/game version, where available.
2. Turn **Context Music** on in Music Interface.
3. Set **Cobblemon Battle Music** to **Context**. Its default **External** mode suspends Music Interface music while a Cobblemon battle is detected.
4. Select **Context Transition: Crossfade** if you want an already-playing *context-managed* song to change during context switches. Default **Finish** allows it to finish.
5. Provide non-combat tracks, or a fallback library, for when battles end.

The integration observes supported Cobblemon battle events, not arbitrary Minecraft damage or other combat mods. A manual track, pending queue, Radio or playlist may take priority over context autoplay.

## 8. Title-screen music

A menu track is assigned **through player settings**, not by adding a `menu` tag:

1. Add your menu song to `music_data.json` and `sounds.json`, with ID `main_menu_theme`.
2. In Music Interface settings, enable **Custom Menu Music**.
3. Set **Title-screen track ID** to `main_menu_theme`.

A **blank** title-screen track ID lets the mod choose automatically from the library on the title screen. To stop custom title-screen music, turn **Custom Menu Music** **off**. The **Allow Vanilla Menu Music** switch only controls Minecraft's own music. In-world context filtering is not applied to title-screen selection.

## 9. Optional music_contexts.json

If you prefer to keep context rules separate from song metadata, create `assets/musicinterface/music_contexts.json`. A JSON **object keyed by track ID** is supported:

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

An **array of rules** is also supported:

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

External rules are **added to** a track's inline rules. When multiple packs supply external rules for the same track ID, the higher-priority pack's external definition wins. A reference to an unknown track ID produces a warning.

For simple packs, choose either inline `contexts` **or** `music_contexts.json`, to avoid duplicating rules unintentionally.

## 10. Fallback when nothing matches

In **Context Fallback** settings, select:

- **Library** (default): choose from available tracks if no explicit context matches.
- **Dedicated**: choose only songs marked `"context_fallback": true` if no rule matches.

Example **single track** for the `music_data.json` array:

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

## 11. Covers, pack priority and reload

Place covers under `assets/musicinterface/textures/covers/` and reference them by resource ID:

```json
"cover": "musicinterface:textures/covers/route_01.png"
```

**Toast colors:** the Now Playing toast automatically samples its border accent from the track's cover artwork. If no usable cover is available, it uses a built-in fallback accent. There is no setting or Music Pack JSON field for choosing an arbitrary outline color.

Enable the folder or ZIP pack in Minecraft's **Resource Packs** menu. After editing, press `F3+T`. Music Interface rebuilds the track list from active packs; it does not accumulate old definitions.

When two packs define the same `id`, the higher-priority pack wins. Prefer stable, unique IDs: playlists and favorites store these IDs.

Use the local `/musicinterface_diagnostics` client command to see active packs, duplicate IDs, missing audio events, missing covers and parse warnings. NeoForge also registers `/musicinterface diagnostics` locally; a server command with the same name may require administrator permissions.

## 12. Common problems

| Problem | What to check |
| --- | --- |
| Minecraft says the pack is incompatible | Edit `pack.mcmeta` for the exact game version |
| Nothing appears | Correct namespace and JSON array, enable pack, press `F3+T` |
| Song shows but does not play | Actual OGG, exact `sounds.json` event and `music_data.json` `sound` |
| Wrong/missing cover | Check PNG and `cover` resource path |
| Battle tag does nothing | Add `combat: true` context and select Cobblemon Battle Music `context` |
| Track plays at the wrong time | Check matching rules, numerical priority, fallback and active playback source |
| Context does not interrupt | Default transition is `finish`; `crossfade` only affects contextual playback |
| Blank title ID plays music | Expected: blank means library-based selection |
| Same ID exists in two packs | Rename an ID or change resource-pack order |
| No music after joining world | World-entry silence and Ambient delay may still be active |
| Template marked incompatible on another version | Adapt baseline `pack.mcmeta` to that game version |

**Advice:** start with one OGG and one JSON entry, make it play, then add contexts and metadata. Keep permissions for the recordings and artwork you distribute.

See [Music Interface user guide](docs/PROJECT_GUIDE.md) and [French Music Pack guide](WIKI_CREATION_PACK_MUSIQUE.md).
