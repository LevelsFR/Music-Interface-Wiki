# Music Interface Wiki

Official public documentation for **Music Interface 2.0**, by LevelsFR / Our Story Network.

> **Music Interface contains no bundled music.** It is a Minecraft music player and context-aware soundtrack manager, **not a song pack, song downloader or streaming service**. To hear custom tracks or populate the library, enable a compatible Music Pack (Minecraft resource pack) containing your own OGG audio files and track definitions. Minecraft's vanilla music and other music mods' tracks are not automatically imported into the Music Interface library.

For first-time users, start with the [Installation](https://levelsfr.github.io/Music-Interface-Wiki/#installation), [Music Packs](https://levelsfr.github.io/Music-Interface-Wiki/#musicpacks) and [FAQ](https://levelsfr.github.io/Music-Interface-Wiki/#troubleshooting) sections.

**Documentation website:** https://levelsfr.github.io/Music-Interface-Wiki/

**Supported source targets:** Minecraft 1.21.1, 1.21.4, 1.21.5, 1.21.8, 1.21.10, 1.21.11, 26.1, 26.2 and 26.3 — Fabric and NeoForge. Download a JAR matching your exact game version and loader. Each published build and its dependencies must be verified separately.

## Guides

The site covers installation, library use, favorites, playlists, sharing, queue, Radio, Smart Mixes, listening statistics, settings, context-aware playback, Cobblemon battle music, commands, music resource packs, diagnostics and troubleshooting.

- [Open the official wiki](https://levelsfr.github.io/Music-Interface-Wiki/)
- [Music Pack creation (English)](https://levelsfr.github.io/Music-Interface-Wiki/#musicpacks)
- [Création de Music Packs (français)](docs/MUSIC_PACK_FR.md)
- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/music-interface)
- [Modrinth](https://modrinth.com/mod/music-interface)
- [Discord / Our Story Network](https://discord.gg/kb8NSTF45n)

## Publishing

This repository hosts **documentation only**, not the private Music Interface Java sources. The site is a static HTML/CSS/JS wiki whose visual layout, navigation, community links, and GitHub Pages workflow match the established [Recipe Item Sync wiki](https://github.com/LevelsFR/Recipe-Item-Sync-Wiki) template.

The pinned GitHub Actions workflow at `.github/workflows/pages.yml` deploys the `site/` directory on changes to `main`. Set **Settings → Pages → Build and deployment → Source = GitHub Actions** once to activate Pages.

## Permissions

The repository is public for reading, with protected default branch rules. Only accounts explicitly granted repository write access can change its files; users without write permissions cannot update documentation or deploy the site directly. The mod and its assets remain **All Rights Reserved** according to project metadata.
