(() => {
  "use strict";

  const DB_NAME = "music-interface-pack-builder";
  const DB_VERSION = 1;
  const MAX_ZIP_BYTES = 0xffffffff;
  const versionOptions = [
    { id: "1.21.1", format: 34, modern: false },
    { id: "1.21.4", format: 46, modern: false },
    { id: "1.21.5", format: 55, modern: false },
    { id: "1.21.8", format: 64, modern: false },
    { id: "1.21.10", format: [69, 0], modern: true },
    { id: "1.21.11", format: [75, 0], modern: true },
    { id: "26.1", format: [84, 0], modern: true },
    { id: "26.2", format: [88, 0], modern: true },
    { id: "26.3", format: [97, 1], modern: true }
  ];

  const copy = {
    fr: {
      eyebrow: "Music Interface · outil de création",
      pageTitle: "Crée ton Music Pack",
      pageIntro: "Ajoute tes musiques, règle leur lecture et récupère un pack prêt à activer dans Minecraft.",
      privacyTitle: "Tes fichiers restent chez toi",
      privacyBody: "Les musiques et les images sont traitées dans ce navigateur. Elles ne sont pas envoyées à GitHub ni à un serveur. Tu peux les sauvegarder dans un fichier de projet pour les garder ou les déplacer.",
      stepPack: "Le pack", stepPackHint: "Nom et version",
      stepTracks: "Les musiques", stepTracksHint: "Audio et pochettes",
      stepRules: "La lecture", stepRulesHint: "Quand les jouer",
      stepFinish: "Vérifier et exporter", stepFinishHint: "Ton fichier ZIP",
      previewLabel: "Aperçu", summaryTitle: "Ton pack", summaryTracks: "Musiques", summarySize: "Taille audio",
      summaryHint: "Commence par donner un nom à ton pack.", clearButton: "Effacer ce projet",
      back: "Retour", next: "Continuer", footerPrivacy: "Aucun compte · aucun envoi de fichiers · fonctionne avec Fabric et NeoForge",
      footerGuide: "Lire le guide des Music Packs", guide: "Guide", saved: "Enregistré dans ce navigateur",
      saving: "Enregistrement local…", saveError: "Enregistrement local impossible", sessionOnly: "Session uniquement",
      packHeading: "D'abord, ton pack", packIntro: "Choisis un nom et la version de Minecraft. Le format compatible sera préparé automatiquement.",
      name: "Nom du pack", nameHint: "Ce nom apparaîtra dans la liste des packs de ressources.",
      description: "Description du pack", version: "Version de Minecraft", versionHelp: "Fabric et NeoForge utilisent le même format de Music Pack.",
      packIcon: "Image du pack (facultatif)", chooseImage: "Choisir une image", noImage: "Aucune image choisie", iconHelp: "PNG recommandé. Elle s'affichera dans le menu des packs.",
      importProject: "Ouvrir un projet sauvegardé", projectFile: "Fichier de projet .mipack",
      formatNote: "Le fichier pack.mcmeta sera adapté à la version choisie.",
      tracksHeading: "Ajoute tes musiques", tracksIntro: "Dépose tes fichiers OGG ici. Les noms et les chemins seront créés automatiquement.",
      dropTitle: "Dépose tes fichiers .ogg", dropHint: "Les fichiers restent dans ton navigateur. Tu peux ajouter plusieurs musiques à la fois.",
      chooseAudio: "Choisir des musiques", noTracks: "Aucune musique ajoutée", noTracksHint: "Ajoute au moins une musique OGG pour continuer.",
      title: "Titre", artist: "Artiste", album: "Album", removeTrack: "Retirer", cover: "Pochette", chooseCover: "Ajouter une pochette",
      audioPreview: "Écouter l'aperçu", advanced: "Options avancées", trackId: "Identifiant du fichier", genres: "Genres", moods: "Ambiances", tags: "Tags",
      weight: "Poids aléatoire", energy: "Énergie", volume: "Volume", cooldown: "Délai avant répétition (secondes)",
      fadeIn: "Fondu d'entrée (secondes)", fadeOut: "Fondu de sortie (secondes)", commaHint: "Sépare plusieurs valeurs par des virgules.",
      rulesHeading: "Choisis quand les musiques passent", rulesIntro: "Sans règle, une piste peut être choisie dans la bibliothèque. Tu peux aussi la réserver à une situation.",
      rulesAny: "Bibliothèque (aucune règle)", rulesExplore: "Exploration, hors combat", rulesBattle: "Combat Cobblemon", rulesCustom: "Définir mes règles",
      addRule: "Ajouter une situation", removeRule: "Retirer", rule: "Situation", priority: "Priorité",
      dimensions: "Dimensions", biomes: "Biomes", biomeTags: "Tags de biome", time: "Moment", weather: "Météo", combat: "Combat Cobblemon",
      any: "Indifférent", day: "Jour", night: "Nuit", clear: "Beau temps", rain: "Pluie", thunder: "Orage", yes: "Oui", no: "Non",
      ruleExamples: "Exemples : minecraft:overworld, minecraft:forest, #minecraft:is_forest",
      contextHelp: "Une règle combine ses conditions. Plusieurs règles décrivent plusieurs situations possibles.",
      battleHelp: "Pour lancer une piste en combat, active aussi le mode Context dans les paramètres de Music Interface.",
      reviewHeading: "Prêt à exporter ?", reviewIntro: "Vérifie le résumé, puis télécharge ton pack ou une sauvegarde complète du projet.",
      checkGood: "La structure du pack est prête.", checkName: "Donne un nom au pack pour continuer.",
      checkTrack: "Ajoute au moins une musique OGG.", checkId: "Corrige les identifiants de fichier invalides ou en double.",
      checkCover: "Pochette facultative : les pistes sans image utiliseront l'image de secours du mod.",
      checkRules: "Les règles Cobblemon nécessitent le mode Context activé dans le mod.",
      previewFiles: "Aperçu des fichiers JSON", exportPack: "Télécharger le Music Pack (.zip)", exportProject: "Sauvegarder le projet (.mipack)",
      projectHelp: "Le fichier .mipack contient les musiques et images pour rouvrir le projet ailleurs.",
      clearConfirm: "Effacer ce projet et les fichiers enregistrés dans ce navigateur ?",
      savedToast: "Projet sauvegardé dans ce navigateur.", importedToast: "Projet ouvert.", invalidOgg: "Ce fichier ne semble pas être un OGG valide.",
      invalidCover: "Choisis une image PNG.", invalidProject: "Ce fichier de projet est invalide ou incomplet.",
      unsupportedArchive: "Ce projet utilise une compression non prise en charge. Ouvre un fichier .mipack créé par cet outil.",
      sizeLimit: "Le pack dépasse la limite ZIP classique de 4 Go.", exportFailed: "La création du fichier a échoué. Vérifie l'espace disponible sur ton appareil.",
      context: "Contexte", generalNote: "Une piste sans règle reste disponible pour la lecture de bibliothèque.",
      noCover: "Sans pochette", allReady: "Tout est prêt", errorsTitle: "À corriger avant l'export",
      nameFallback: "Mon pack musical", descriptionFallback: "Mon pack pour Music Interface",
      draftWarning: "Les données enregistrées par le navigateur peuvent être effacées par ses paramètres. Télécharge le fichier .mipack pour garder une copie.",
      languageName: "English", downloadStarted: "Téléchargement prêt."
    },
    en: {
      eyebrow: "Music Interface · creation tool",
      pageTitle: "Create a Music Pack",
      pageIntro: "Add your music, choose when it plays, and download a pack ready for Minecraft.",
      privacyTitle: "Your files stay on your device",
      privacyBody: "Music and images are processed in this browser. They are not sent to GitHub or a server. Save a project file if you want a portable backup.",
      stepPack: "The pack", stepPackHint: "Name and version",
      stepTracks: "The tracks", stepTracksHint: "Audio and covers",
      stepRules: "Playback", stepRulesHint: "When tracks play",
      stepFinish: "Review and export", stepFinishHint: "Your ZIP file",
      previewLabel: "Preview", summaryTitle: "Your pack", summaryTracks: "Tracks", summarySize: "Audio size",
      summaryHint: "Start by naming your pack.", clearButton: "Clear this project",
      back: "Back", next: "Continue", footerPrivacy: "No account · no file uploads · works with Fabric and NeoForge",
      footerGuide: "Read the Music Pack guide", guide: "Guide", saved: "Saved in this browser",
      saving: "Saving locally…", saveError: "Could not save locally", sessionOnly: "This session only",
      packHeading: "First, your pack", packIntro: "Choose a name and Minecraft version. The compatible pack metadata is generated for you.",
      name: "Pack name", nameHint: "This name will appear in Minecraft's resource pack list.",
      description: "Pack description", version: "Minecraft version", versionHelp: "Fabric and NeoForge use the same Music Pack format.",
      packIcon: "Pack image (optional)", chooseImage: "Choose an image", noImage: "No image selected", iconHelp: "PNG recommended. Minecraft shows it in the resource pack menu.",
      importProject: "Open a saved project", projectFile: "Project file .mipack",
      formatNote: "pack.mcmeta will be generated for the selected version.",
      tracksHeading: "Add your music", tracksIntro: "Drop OGG files here. Names and file paths are generated automatically.",
      dropTitle: "Drop your .ogg files", dropHint: "Files stay in your browser. You can add several tracks at once.",
      chooseAudio: "Choose music files", noTracks: "No tracks added", noTracksHint: "Add at least one OGG track to continue.",
      title: "Title", artist: "Artist", album: "Album", removeTrack: "Remove", cover: "Cover", chooseCover: "Add a cover",
      audioPreview: "Preview audio", advanced: "Advanced options", trackId: "File identifier", genres: "Genres", moods: "Moods", tags: "Tags",
      weight: "Random weight", energy: "Energy", volume: "Volume", cooldown: "Repeat cooldown (seconds)",
      fadeIn: "Fade in (seconds)", fadeOut: "Fade out (seconds)", commaHint: "Separate multiple values with commas.",
      rulesHeading: "Choose when tracks play", rulesIntro: "Without a rule, a track can be selected from the library. You can also reserve it for a situation.",
      rulesAny: "Library (no rule)", rulesExplore: "Exploration, out of combat", rulesBattle: "Cobblemon battle", rulesCustom: "Set my own rules",
      addRule: "Add a situation", removeRule: "Remove", rule: "Situation", priority: "Priority",
      dimensions: "Dimensions", biomes: "Biomes", biomeTags: "Biome tags", time: "Time", weather: "Weather", combat: "Cobblemon combat",
      any: "Any", day: "Day", night: "Night", clear: "Clear", rain: "Rain", thunder: "Thunder", yes: "Yes", no: "No",
      ruleExamples: "Examples: minecraft:overworld, minecraft:forest, #minecraft:is_forest",
      contextHelp: "Conditions in one rule are combined. Multiple rules describe alternative situations.",
      battleHelp: "To play a track during battle, also enable Context mode in Music Interface settings.",
      reviewHeading: "Ready to export?", reviewIntro: "Check the summary, then download your pack or a full project backup.",
      checkGood: "The pack structure is ready.", checkName: "Give the pack a name to continue.",
      checkTrack: "Add at least one OGG track.", checkId: "Fix invalid or duplicate file identifiers.",
      checkCover: "Covers are optional. Tracks without one use the mod's fallback image.",
      checkRules: "Cobblemon rules also require Context mode in the mod settings.",
      previewFiles: "Preview generated JSON files", exportPack: "Download Music Pack (.zip)", exportProject: "Save project (.mipack)",
      projectHelp: "The .mipack file contains the music and images so you can reopen the project elsewhere.",
      clearConfirm: "Clear this project and files saved in this browser?",
      savedToast: "Project saved in this browser.", importedToast: "Project opened.", invalidOgg: "This file does not look like a valid OGG.",
      invalidCover: "Choose a PNG image.", invalidProject: "This project file is invalid or incomplete.",
      unsupportedArchive: "This project uses unsupported compression. Open a .mipack file created by this tool.",
      sizeLimit: "The pack is larger than the classic ZIP limit of 4 GB.", exportFailed: "Could not create the file. Check available space on your device.",
      context: "Context", generalNote: "Tracks without rules remain available to library playback.",
      noCover: "No cover", allReady: "Everything is ready", errorsTitle: "Fix these items before exporting",
      nameFallback: "My Music Pack", descriptionFallback: "My pack for Music Interface",
      draftWarning: "Browser storage can be cleared in browser settings. Download the .mipack file to keep a copy.",
      languageName: "Français", downloadStarted: "Download ready."
    }
  };

  const versions = versionOptions;
  const stepContent = document.getElementById("stepContent");
  const saveStatus = document.getElementById("saveStatus");
  const saveStatusText = document.getElementById("saveStatusText");
  const toast = document.getElementById("toast");
  let lang = localStorage.getItem("musicinterface-pack-builder-lang") || (navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");
  let db = null;
  let currentStep = 0;
  let state = freshProject();
  let saveTimer = null;
  let saveChain = Promise.resolve();
  let toastTimer = null;
  let renderUrls = [];
  let previewUrl = null;
  let restoring = false;

  function t(key) { return copy[lang][key] || copy.en[key] || key; }
  function freshProject() {
    return {
      name: t("nameFallback"),
      description: t("descriptionFallback"),
      version: "1.21.1",
      packIcon: null,
      packIconName: "",
      tracks: []
    };
  }
  function makeUid() { return (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)); }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }
  function makeUrl(blob) {
    if (!blob) return "";
    const url = URL.createObjectURL(blob);
    renderUrls.push(url);
    return url;
  }
  function clearRenderUrls() {
    renderUrls.forEach(url => URL.revokeObjectURL(url));
    renderUrls = [];
  }
  function slugify(value) {
    const normalized = String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalized.toLowerCase().replace(/[^a-z0-9_-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "track";
  }
  function uniqueTrackId(base) {
    const used = new Set(state.tracks.map(track => track.id));
    let value = slugify(base);
    let suffix = 2;
    while (used.has(value)) value = slugify(base) + "_" + suffix++;
    return value;
  }
  function humanSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 Mo";
    const units = ["o", "Ko", "Mo", "Go"];
    let value = bytes, index = 0;
    while (value >= 1024 && index < units.length - 1) { value /= 1024; index++; }
    return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en", { maximumFractionDigits: 1 }).format(value) + " " + units[index];
  }
  function langRoot() { return lang === "fr" ? "../fr/" : "../"; }

  function setStaticText() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (copy[lang][key]) element.textContent = copy[lang][key];
    });
    document.getElementById("languageButton").textContent = lang === "fr" ? "EN" : "FR";
    document.getElementById("languageButton").setAttribute("aria-label", t("languageName"));
    document.getElementById("guideLink").textContent = t("guide");
    document.getElementById("guideLink").href = langRoot() + "music-packs.html";
    document.getElementById("footerGuide").href = langRoot() + "music-packs.html";
    document.getElementById("saveStatusText").textContent = db ? t("saved") : t("sessionOnly");
    document.title = (lang === "fr" ? "Créateur de Music Pack" : "Music Pack Builder") + " | Music Interface Wiki";
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) { reject(new Error("IndexedDB unavailable")); return; }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("projects")) database.createObjectStore("projects", { keyPath: "id" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not open local storage"));
    });
  }
  function readSavedProject() {
    return new Promise((resolve, reject) => {
      const request = db.transaction("projects", "readonly").objectStore("projects").get("current");
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error("Could not read local project"));
    });
  }
  function snapshot() {
    return {
      id: "current",
      name: state.name,
      description: state.description,
      version: state.version,
      packIcon: state.packIcon || null,
      packIconName: state.packIconName || "",
      tracks: state.tracks.map(track => ({
        uid: track.uid, id: track.id, title: track.title, author: track.author, album: track.album,
        audioName: track.audioName, audioBlob: track.audioBlob || null, coverName: track.coverName || "",
        coverBlob: track.coverBlob || null, genres: track.genres || "", moods: track.moods || "",
        tags: track.tags || "", weight: track.weight || "1", energy: track.energy || "0.5",
        volume: track.volume || "1", cooldown: track.cooldown || "0", fadeIn: track.fadeIn || "",
        fadeOut: track.fadeOut || "", ruleMode: track.ruleMode || "none",
        contexts: (track.contexts || []).map(rule => ({ ...rule }))
      }))
    };
  }
  function writeSavedProject(value) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("projects", "readwrite");
      transaction.objectStore("projects").put(value);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("Could not save local project"));
      transaction.onabort = () => reject(transaction.error || new Error("Local save was interrupted"));
    });
  }
  function setSaveState(status) {
    saveStatus.classList.remove("saving", "error");
    if (status === "saving") saveStatus.classList.add("saving");
    if (status === "error") saveStatus.classList.add("error");
    saveStatusText.textContent = status === "saving" ? t("saving") : status === "error" ? t("saveError") : db ? t("saved") : t("sessionOnly");
  }
  function scheduleSave() {
    updateSummary();
    if (!db || restoring) { setSaveState("ready"); return; }
    clearTimeout(saveTimer);
    setSaveState("saving");
    saveTimer = setTimeout(() => {
      saveChain = saveChain.then(() => writeSavedProject(snapshot())).then(() => setSaveState("ready")).catch(error => {
        console.error("Local project save failed", error);
        setSaveState("error");
        showToast(t("saveError"));
      });
    }, 350);
  }
  async function flushSave() {
    clearTimeout(saveTimer);
    if (!db) return;
    await saveChain;
    await writeSavedProject(snapshot());
    setSaveState("ready");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
  }
  function updateSummary() {
    const displayName = state.name.trim() || t("nameFallback");
    document.getElementById("previewName").textContent = displayName;
    document.getElementById("previewVersion").textContent = "Minecraft " + state.version;
    document.getElementById("summaryTracks").textContent = String(state.tracks.length);
    const size = state.tracks.reduce((sum, track) => sum + (track.audioBlob ? track.audioBlob.size : 0), 0);
    document.getElementById("summarySize").textContent = humanSize(size);
    document.getElementById("summaryHint").textContent = currentStep === 0 ? t("summaryHint") :
      currentStep === 1 ? t("tracksIntro") : currentStep === 2 ? t("rulesIntro") : t("reviewIntro");
    const art = document.getElementById("previewArt");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = state.packIcon ? URL.createObjectURL(state.packIcon) : null;
    art.replaceChildren();
    if (previewUrl) {
      const image = document.createElement("img");
      image.src = previewUrl;
      image.alt = "";
      art.append(image);
    } else {
      const mark = document.createElement("span");
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "♫";
      art.append(mark);
    }
  }
  function updateStepper() {
    document.querySelectorAll(".step-item").forEach((button, index) => {
      button.classList.toggle("active", index === currentStep);
      button.classList.toggle("done", index < currentStep);
      button.disabled = index > currentStep && !canEnterStep(index);
      if (index === currentStep) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    document.getElementById("backButton").disabled = currentStep === 0;
    const next = document.getElementById("nextButton");
    next.hidden = currentStep === 3;
    next.querySelector("[data-i18n]").textContent = currentStep === 2 ? t("reviewHeading") : t("next");
  }
  function canEnterStep(index) {
    if (index <= 1) return true;
    if (!state.name.trim()) return false;
    if (!state.tracks.length) return false;
    return true;
  }
  function changeStep(index) {
    if (index > currentStep && !canEnterStep(index)) {
      showToast(!state.name.trim() ? t("checkName") : t("checkTrack"));
      return;
    }
    currentStep = Math.max(0, Math.min(3, index));
    render();
    const heading = stepContent.querySelector("h2");
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function render() {
    clearRenderUrls();
    setStaticText();
    updateStepper();
    if (currentStep === 0) renderPackStep();
    if (currentStep === 1) renderTracksStep();
    if (currentStep === 2) renderRulesStep();
    if (currentStep === 3) renderReviewStep();
    updateSummary();
  }
  function heading(title, description) {
    return '<div class="step-heading"><p class="eyebrow">' + t(["stepPack", "stepTracks", "stepRules", "stepFinish"][currentStep]) + '</p><h2 tabindex="-1">' + title + '</h2><p>' + description + '</p></div>';
  }

  function renderPackStep() {
    const versionHtml = versions.map(version => '<option value="' + version.id + '"' + (state.version === version.id ? " selected" : "") + '>Minecraft ' + version.id + '</option>').join("");
    const iconUrl = state.packIcon ? makeUrl(state.packIcon) : "";
    stepContent.innerHTML = heading(t("packHeading"), t("packIntro")) +
      '<div class="form-grid">' +
        '<label class="field wide"><span>' + t("name") + '</span><input id="packName" type="text" maxlength="80" value="' + escapeHtml(state.name) + '" autocomplete="off"><small>' + t("nameHint") + '</small></label>' +
        '<label class="field"><span>' + t("version") + '</span><select id="minecraftVersion">' + versionHtml + '</select><small>' + t("versionHelp") + '</small></label>' +
        '<label class="field"><span>' + t("description") + '</span><input id="packDescription" type="text" maxlength="120" value="' + escapeHtml(state.description) + '"></label>' +
        '<div class="field wide"><span>' + t("packIcon") + '</span><div class="file-control"><label class="file-button" for="packIconInput">' + t("chooseImage") + '</label><input id="packIconInput" type="file" accept=".png,image/png"><span class="file-detail" id="packIconName">' + escapeHtml(state.packIconName || t("noImage")) + '</span><img class="icon-preview' + (iconUrl ? " visible" : "") + '" id="iconPreview" src="' + iconUrl + '" alt=""></div><small>' + t("iconHelp") + '</small></div>' +
      '</div>' +
      '<div class="hint-box"><strong>ⓘ</strong><span>' + t("formatNote") + '</span></div>' +
      '<div class="file-control" style="margin-top:18px"><label class="file-button" for="projectInput">' + t("importProject") + '</label><input id="projectInput" type="file" accept=".mipack"><span class="file-detail">' + t("projectFile") + '</span></div>';
    document.getElementById("packName").addEventListener("input", event => { state.name = event.target.value; scheduleSave(); });
    document.getElementById("packDescription").addEventListener("input", event => { state.description = event.target.value; scheduleSave(); });
    document.getElementById("minecraftVersion").addEventListener("change", event => { state.version = event.target.value; scheduleSave(); });
    document.getElementById("packIconInput").addEventListener("change", onPackIcon);
    document.getElementById("projectInput").addEventListener("change", onProjectInput);
  }

  async function onPackIcon(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!isPng(file)) { showToast(t("invalidCover")); event.target.value = ""; return; }
    state.packIcon = file;
    state.packIconName = file.name;
    scheduleSave();
    renderPackStep();
  }
  function isPng(file) {
    return file && (file.type === "image/png" || file.name.toLowerCase().endsWith(".png"));
  }
  function isOgg(file) { return file && file.name.toLowerCase().endsWith(".ogg"); }
  async function hasOggHeader(file) {
    const bytes = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    return bytes.length === 4 && bytes[0] === 0x4f && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53;
  }

  function renderTracksStep() {
    stepContent.innerHTML = heading(t("tracksHeading"), t("tracksIntro")) +
      '<div class="drop-zone" id="dropZone"><span class="drop-icon" aria-hidden="true">↑</span><div class="drop-copy"><strong>' + t("dropTitle") + '</strong><span>' + t("dropHint") + '</span></div><label class="file-button" for="audioInput">' + t("chooseAudio") + '</label><input id="audioInput" type="file" accept=".ogg,audio/ogg,audio/vorbis" multiple></div>' +
      '<div class="track-list" id="trackList"></div>';
    const input = document.getElementById("audioInput");
    input.addEventListener("change", async event => { await addAudioFiles(event.target.files); event.target.value = ""; });
    const zone = document.getElementById("dropZone");
    zone.addEventListener("dragover", event => { event.preventDefault(); zone.classList.add("drag-over"); });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", async event => {
      event.preventDefault(); zone.classList.remove("drag-over");
      await addAudioFiles([...event.dataTransfer.files].filter(isOgg));
    });
    drawTrackCards();
  }
  async function addAudioFiles(fileList) {
    for (const file of [...fileList]) {
      if (!isOgg(file) || !await hasOggHeader(file)) { showToast(t("invalidOgg")); continue; }
      const id = uniqueTrackId(file.name.replace(/\.ogg$/i, ""));
      state.tracks.push({
        uid: makeUid(), id, title: file.name.replace(/\.ogg$/i, "").replace(/[_-]+/g, " "),
        author: "", album: "", audioName: file.name, audioBlob: file,
        coverName: "", coverBlob: null, genres: "", moods: "", tags: "",
        weight: "1", energy: "0.5", volume: "1", cooldown: "0", fadeIn: "", fadeOut: "",
        ruleMode: "none", contexts: []
      });
    }
    scheduleSave();
    drawTrackCards();
  }
  function drawTrackCards() {
    const target = document.getElementById("trackList");
    if (!target) return;
    if (!state.tracks.length) {
      target.innerHTML = '<div class="empty-state"><span class="empty-note" aria-hidden="true">♫</span><strong>' + t("noTracks") + '</strong><span>' + t("noTracksHint") + '</span></div>';
      return;
    }
    target.innerHTML = state.tracks.map(track => {
      const imageUrl = track.coverBlob ? makeUrl(track.coverBlob) : "";
      const audioUrl = track.audioBlob ? makeUrl(track.audioBlob) : "";
      return '<article class="track-card" data-track-card="' + escapeHtml(track.uid) + '">' +
        '<div class="track-topline"><div class="cover-thumb">' + (imageUrl ? '<img src="' + imageUrl + '" alt="">' : '<span aria-hidden="true">♫</span>') + '</div>' +
        '<div class="track-main"><div class="track-title-row"><h3 data-title-display>' + escapeHtml(track.title || track.id) + '</h3><button class="remove-track" type="button" data-action="remove-track" data-track="' + escapeHtml(track.uid) + '">' + t("removeTrack") + '</button></div>' +
        '<span class="track-filename">' + escapeHtml(track.audioName) + ' · ' + humanSize(track.audioBlob ? track.audioBlob.size : 0) + '</span>' +
        (audioUrl ? '<audio class="track-audio" controls preload="metadata" aria-label="' + escapeHtml(t("audioPreview") + " " + track.title) + '" src="' + audioUrl + '"></audio>' : "") +
        '</div></div>' +
        '<div class="track-fields">' +
          fieldInput(track, "title", t("title"), "text") +
          fieldInput(track, "author", t("artist"), "text") +
          fieldInput(track, "album", t("album"), "text") +
        '</div>' +
        '<div class="file-control" style="margin-top:10px"><label class="small-button" for="cover-' + escapeHtml(track.uid) + '">' + t("chooseCover") + '</label><input id="cover-' + escapeHtml(track.uid) + '" data-cover-input="' + escapeHtml(track.uid) + '" type="file" accept=".png,image/png"><span class="file-detail">' + escapeHtml(track.coverName || t("noCover")) + '</span></div>' +
        '<details class="track-options"><summary>' + t("advanced") + '</summary><div class="track-fields">' +
          fieldInput(track, "id", t("trackId"), "text") + fieldInput(track, "genres", t("genres"), "text", "ambient, orchestral") +
          fieldInput(track, "moods", t("moods"), "text", "calm, intense") + fieldInput(track, "tags", t("tags"), "text", "exploration, battle") +
          fieldInput(track, "weight", t("weight"), "number", "", "min=\"1\" step=\"1\"") +
          fieldInput(track, "energy", t("energy"), "number", "", "min=\"0\" max=\"1\" step=\"0.1\"") +
          fieldInput(track, "volume", t("volume"), "number", "", "min=\"0\" max=\"1\" step=\"0.1\"") +
          fieldInput(track, "cooldown", t("cooldown"), "number", "", "min=\"0\" step=\"1\"") +
          fieldInput(track, "fadeIn", t("fadeIn"), "number", "", "min=\"0\" step=\"1\"") +
          fieldInput(track, "fadeOut", t("fadeOut"), "number", "", "min=\"0\" step=\"1\"") +
        '</div></details></article>';
    }).join("");
    target.querySelectorAll("[data-field]").forEach(input => {
      input.addEventListener("input", onTrackField);
      input.addEventListener("change", onTrackField);
    });
    target.querySelectorAll("[data-cover-input]").forEach(input => input.addEventListener("change", onCoverInput));
    target.querySelectorAll("[data-action=remove-track]").forEach(button => button.addEventListener("click", () => {
      state.tracks = state.tracks.filter(track => track.uid !== button.dataset.track);
      scheduleSave(); drawTrackCards();
    }));
  }
  function fieldInput(track, key, label, type, placeholder, extra) {
    const value = track[key] == null ? "" : String(track[key]);
    return '<label class="field"><span>' + label + '</span><input data-field="' + key + '" data-track="' + escapeHtml(track.uid) + '" type="' + type + '" value="' + escapeHtml(value) + '"' +
      (placeholder ? ' placeholder="' + escapeHtml(placeholder) + '"' : "") + (extra ? " " + extra : "") + '></label>';
  }
  function onTrackField(event) {
    const track = state.tracks.find(item => item.uid === event.target.dataset.track);
    if (!track) return;
    const key = event.target.dataset.field;
    track[key] = event.target.type === "number" ? event.target.value : event.target.value;
    if (key === "title") event.target.closest(".track-card").querySelector("[data-title-display]").textContent = track.title || track.id;
    scheduleSave();
  }
  async function onCoverInput(event) {
    const track = state.tracks.find(item => item.uid === event.target.dataset.coverInput);
    const file = event.target.files && event.target.files[0];
    if (!track || !file) return;
    if (!isPng(file)) { showToast(t("invalidCover")); event.target.value = ""; return; }
    track.coverBlob = file; track.coverName = file.name;
    scheduleSave(); drawTrackCards();
  }

  function createRule(values) {
    return Object.assign({ uid: makeUid(), priority: "30", dimensions: "", biomes: "", biome_tags: "", time: "", weather: "", combat: "" }, values || {});
  }
  function presetRule(mode) {
    if (mode === "exploration") return [createRule({ priority: "10", combat: "false" })];
    if (mode === "battle") return [createRule({ priority: "100", combat: "true" })];
    return [];
  }
  function renderRulesStep() {
    stepContent.innerHTML = heading(t("rulesHeading"), t("rulesIntro")) +
      '<div class="hint-box"><strong>ⓘ</strong><span>' + t("contextHelp") + '</span></div>' +
      '<div id="rulesList"></div><p class="rule-warning">' + t("battleHelp") + '</p>';
    drawRules();
  }
  function drawRules() {
    const list = document.getElementById("rulesList");
    if (!list) return;
    list.innerHTML = state.tracks.map(track => {
      const mode = track.ruleMode || "none";
      const options = [
        ["none", t("rulesAny")], ["exploration", t("rulesExplore")], ["battle", t("rulesBattle")], ["custom", t("rulesCustom")]
      ].map(item => '<option value="' + item[0] + '"' + (mode === item[0] ? " selected" : "") + '>' + item[1] + '</option>').join("");
      const rules = mode === "custom" ? (track.contexts || []).map((rule, index) => renderRule(track, rule, index)).join("") : "";
      return '<section class="track-card"><div class="rule-card-head"><strong>' + escapeHtml(track.title || track.id) + '</strong><span class="track-filename">' + escapeHtml(track.id) + '</span></div>' +
        '<label class="field"><span>' + t("context") + '</span><select data-mode-track="' + escapeHtml(track.uid) + '">' + options + '</select></label>' +
        (mode === "custom" ? rules + '<div class="rule-shortcuts"><button class="small-button" type="button" data-add-rule="' + escapeHtml(track.uid) + '">＋ ' + t("addRule") + '</button></div>' : '<p class="field-hint" style="margin:9px 0 0">' + (mode === "none" ? t("generalNote") : t("contextHelp")) + '</p>') +
        '</section>';
    }).join("");
    list.querySelectorAll("[data-mode-track]").forEach(select => select.addEventListener("change", () => {
      const track = state.tracks.find(item => item.uid === select.dataset.modeTrack);
      if (!track) return;
      track.ruleMode = select.value;
      track.contexts = select.value === "custom" ? (track.contexts && track.contexts.length ? track.contexts : [createRule()]) : presetRule(select.value);
      scheduleSave(); drawRules();
    }));
    list.querySelectorAll("[data-add-rule]").forEach(button => button.addEventListener("click", () => {
      const track = state.tracks.find(item => item.uid === button.dataset.addRule);
      if (track) { track.contexts.push(createRule()); scheduleSave(); drawRules(); }
    }));
    list.querySelectorAll("[data-remove-rule]").forEach(button => button.addEventListener("click", () => {
      const track = state.tracks.find(item => item.uid === button.dataset.track);
      if (track) { track.contexts = track.contexts.filter(rule => rule.uid !== button.dataset.removeRule); scheduleSave(); drawRules(); }
    }));
    list.querySelectorAll("[data-rule-field]").forEach(input => {
      input.addEventListener("change", updateRuleField);
      input.addEventListener("input", updateRuleField);
    });
  }
  function renderRule(track, rule, index) {
    const select = (key, label, options) => '<label class="field"><span>' + label + '</span><select data-rule-field="' + key + '" data-track="' + escapeHtml(track.uid) + '" data-rule="' + escapeHtml(rule.uid) + '">' +
      options.map(option => '<option value="' + option[0] + '"' + (String(rule[key] || "") === option[0] ? " selected" : "") + '>' + option[1] + '</option>').join("") + '</select></label>';
    const text = (key, label) => '<label class="field"><span>' + label + '</span><input type="text" data-rule-field="' + key + '" data-track="' + escapeHtml(track.uid) + '" data-rule="' + escapeHtml(rule.uid) + '" value="' + escapeHtml(rule[key] || "") + '" placeholder="' + escapeHtml(t("ruleExamples")) + '"></label>';
    return '<div class="rule-card"><div class="rule-card-head"><strong>' + t("rule") + " " + (index + 1) + '</strong><button type="button" data-track="' + escapeHtml(track.uid) + '" data-remove-rule="' + escapeHtml(rule.uid) + '">' + t("removeRule") + '</button></div>' +
      '<div class="rule-fields">' + text("dimensions", t("dimensions")) + text("biomes", t("biomes")) + text("biome_tags", t("biomeTags")) +
      select("time", t("time"), [["", t("any")], ["day", t("day")], ["night", t("night")]]) +
      select("weather", t("weather"), [["", t("any")], ["clear", t("clear")], ["rain", t("rain")], ["thunder", t("thunder")]]) +
      select("combat", t("combat"), [["", t("any")], ["true", t("yes")], ["false", t("no")]]) +
      '<label class="field"><span>' + t("priority") + '</span><input type="number" min="0" step="1" data-rule-field="priority" data-track="' + escapeHtml(track.uid) + '" data-rule="' + escapeHtml(rule.uid) + '" value="' + escapeHtml(rule.priority || "0") + '"></label></div></div>';
  }
  function splitValues(value) {
    return String(value || "").split(",").map(item => item.trim()).filter(Boolean);
  }
  function numberOr(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }
  function updateRuleField(event) {
    const track = state.tracks.find(item => item.uid === event.target.dataset.track);
    const rule = track && track.contexts.find(item => item.uid === event.target.dataset.rule);
    if (!rule) return;
    const key = event.target.dataset.ruleField;
    rule[key] = key === "dimensions" || key === "biomes" || key === "biome_tags" ? splitValues(event.target.value) : event.target.value;
    scheduleSave();
  }

  function buildTrackData(track) {
    const id = String(track.id || "").trim();
    const item = {
      id,
      title: String(track.title || id).trim(),
      author: String(track.author || "").trim(),
      album: String(track.album || "").trim(),
      sound: "musicinterface:custom/" + id,
      enabled: true,
      weight: Math.max(1, parseInt(track.weight, 10) || 1),
      energy: Math.max(0, Math.min(1, numberOr(track.energy, 0.5))),
      volume: Math.max(0, Math.min(1, numberOr(track.volume, 1))),
      cooldown: Math.max(0, parseInt(track.cooldown, 10) || 0)
    };
    if (track.coverBlob) item.cover = "musicinterface:textures/covers/" + id + ".png";
    if (splitValues(track.genres).length) item.genres = splitValues(track.genres);
    if (splitValues(track.moods).length) item.moods = splitValues(track.moods);
    if (splitValues(track.tags).length) item.tags = splitValues(track.tags);
    if (track.fadeIn !== "") item.fade_in = Math.max(0, parseInt(track.fadeIn, 10) || 0);
    if (track.fadeOut !== "") item.fade_out = Math.max(0, parseInt(track.fadeOut, 10) || 0);
    const contexts = (track.contexts || []).map(rule => {
      const output = { priority: Math.max(0, parseInt(rule.priority, 10) || 0) };
      ["dimensions", "biomes", "biome_tags"].forEach(key => { if (rule[key] && rule[key].length) output[key] = rule[key]; });
      if (rule.time) output.time = [rule.time];
      if (rule.weather) output.weather = [rule.weather];
      if (rule.combat === "true") output.combat = true;
      if (rule.combat === "false") output.combat = false;
      return output;
    }).filter(rule => Object.keys(rule).length > 1);
    if (contexts.length) item.contexts = contexts;
    return item;
  }
  function buildPackFiles() {
    const version = versions.find(item => item.id === state.version) || versions[0];
    const pack = { description: state.description.trim() || state.name.trim() || t("descriptionFallback") };
    if (version.modern) {
      pack.min_format = version.format;
      pack.max_format = version.format;
    } else {
      pack.pack_format = version.format;
    }
    const tracks = state.tracks.map(buildTrackData);
    const sounds = {};
    state.tracks.forEach(track => {
      sounds["custom/" + track.id] = { sounds: [{ name: "musicinterface:custom/" + track.id, stream: true }] };
    });
    const entries = [
      { path: "pack.mcmeta", blob: new Blob([JSON.stringify({ pack }, null, 2) + "\n"], { type: "application/json" }) },
      { path: "assets/musicinterface/music_data.json", blob: new Blob([JSON.stringify(tracks, null, 2) + "\n"], { type: "application/json" }) },
      { path: "assets/musicinterface/sounds.json", blob: new Blob([JSON.stringify(sounds, null, 2) + "\n"], { type: "application/json" }) }
    ];
    if (state.packIcon) entries.push({ path: "pack.png", blob: state.packIcon });
    state.tracks.forEach(track => {
      entries.push({ path: "assets/musicinterface/sounds/custom/" + track.id + ".ogg", blob: track.audioBlob });
      if (track.coverBlob) entries.push({ path: "assets/musicinterface/textures/covers/" + track.id + ".png", blob: track.coverBlob });
    });
    return { entries, tracks, sounds, pack };
  }
  function checkProject() {
    const errors = [];
    const warnings = [];
    if (!state.name.trim()) errors.push(t("checkName"));
    if (!state.tracks.length) errors.push(t("checkTrack"));
    const ids = new Set();
    for (const track of state.tracks) {
      if (!/^[a-z0-9_-]+$/.test(track.id)) errors.push(t("checkId") + " (" + track.id + ")");
      if (ids.has(track.id)) errors.push(t("checkId") + " (" + track.id + ")");
      ids.add(track.id);
      if (!track.audioBlob) errors.push(t("checkTrack") + " (" + track.title + ")");
      if (!track.coverBlob) warnings.push(t("checkCover") + " (" + track.title + ")");
      if ((track.contexts || []).some(rule => rule.combat === "true")) warnings.push(t("checkRules") + " (" + track.title + ")");
    }
    return { errors, warnings };
  }
  function renderReviewStep() {
    const result = checkProject();
    const checks = [];
    if (result.errors.length) {
      checks.push('<li class="review-item bad"><span class="state-icon">!</span><span><strong>' + t("errorsTitle") + '</strong><br>' + result.errors.map(escapeHtml).join("<br>") + '</span></li>');
    } else {
      checks.push('<li class="review-item good"><span class="state-icon">✓</span><span>' + t("checkGood") + '</span></li>');
    }
    result.warnings.slice(0, 6).forEach(message => checks.push('<li class="review-item warn"><span class="state-icon">!</span><span>' + escapeHtml(message) + '</span></li>'));
    const packData = buildPackFiles();
    const jsonPreview = [
      "pack.mcmeta\n" + JSON.stringify({ pack: packData.pack }, null, 2),
      "assets/musicinterface/music_data.json\n" + JSON.stringify(packData.tracks, null, 2),
      "assets/musicinterface/sounds.json\n" + JSON.stringify(packData.sounds, null, 2)
    ].join("\n\n");
    stepContent.innerHTML = heading(t("reviewHeading"), t("reviewIntro")) +
      '<ul class="review-list">' + checks.join("") + '</ul>' +
      '<details class="file-preview"><summary>' + t("previewFiles") + '</summary><pre id="jsonPreview"></pre></details>' +
      '<div class="export-actions"><button class="primary-button" type="button" id="downloadPack" ' + (result.errors.length ? "disabled" : "") + '>↓ ' + t("exportPack") + '</button><button class="secondary-button" type="button" id="downloadProject">↧ ' + t("exportProject") + '</button></div>' +
      '<p class="export-note">' + t("projectHelp") + "<br>" + t("draftWarning") + '</p>';
    document.getElementById("jsonPreview").textContent = jsonPreview;
    document.getElementById("downloadPack").addEventListener("click", exportPack);
    document.getElementById("downloadProject").addEventListener("click", exportProject);
  }

  async function crc32(blob) {
    const table = crc32.table || (crc32.table = makeCrcTable());
    let crc = 0xffffffff;
    const stream = blob.stream ? blob.stream() : null;
    if (stream) {
      const reader = stream.getReader();
      while (true) {
        const result = await reader.read();
        if (result.done) break;
        const bytes = result.value;
        for (let index = 0; index < bytes.length; index++) crc = table[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
      }
    } else {
      const bytes = new Uint8Array(await blob.arrayBuffer());
      for (let index = 0; index < bytes.length; index++) crc = table[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }
  function makeCrcTable() {
    const table = new Uint32Array(256);
    for (let index = 0; index < 256; index++) {
      let value = index;
      for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
      table[index] = value >>> 0;
    }
    return table;
  }
  function zipTime(date) {
    const safeYear = Math.max(1980, date.getFullYear());
    return { time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
      date: ((safeYear - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate() };
  }
  async function createZip(entries) {
    if (entries.length > 65535) throw new Error(t("sizeLimit"));
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    let centralSize = 0;
    const stamp = zipTime(new Date());
    for (const entry of entries) {
      const name = encoder.encode(entry.path);
      const blob = entry.blob instanceof Blob ? entry.blob : new Blob([entry.blob]);
      const size = blob.size;
      if (size > MAX_ZIP_BYTES || offset + size > MAX_ZIP_BYTES) throw new Error(t("sizeLimit"));
      const crc = await crc32(blob);
      const local = new Uint8Array(30 + name.length);
      const localView = new DataView(local.buffer);
      localView.setUint32(0, 0x04034b50, true);
      localView.setUint16(4, 20, true);
      localView.setUint16(6, 0x0800, true);
      localView.setUint16(8, 0, true);
      localView.setUint16(10, stamp.time, true);
      localView.setUint16(12, stamp.date, true);
      localView.setUint32(14, crc, true);
      localView.setUint32(18, size, true);
      localView.setUint32(22, size, true);
      localView.setUint16(26, name.length, true);
      local.set(name, 30);
      localParts.push(local, blob);
      const central = new Uint8Array(46 + name.length);
      const centralView = new DataView(central.buffer);
      centralView.setUint32(0, 0x02014b50, true);
      centralView.setUint16(4, 20, true);
      centralView.setUint16(6, 20, true);
      centralView.setUint16(8, 0x0800, true);
      centralView.setUint16(10, 0, true);
      centralView.setUint16(12, stamp.time, true);
      centralView.setUint16(14, stamp.date, true);
      centralView.setUint32(16, crc, true);
      centralView.setUint32(20, size, true);
      centralView.setUint32(24, size, true);
      centralView.setUint16(28, name.length, true);
      centralView.setUint32(42, offset, true);
      central.set(name, 46);
      centralParts.push(central);
      centralSize += central.length;
      offset += local.length + size;
    }
    if (offset + centralSize > MAX_ZIP_BYTES) throw new Error(t("sizeLimit"));
    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(8, entries.length, true);
    endView.setUint16(10, entries.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);
    return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
  }
  function safeDownloadName(value) { return slugify(value).replace(/_+/g, "-") || "music-pack"; }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = filename; link.style.display = "none";
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  async function exportPack() {
    const result = checkProject();
    if (result.errors.length) { showToast(result.errors[0]); return; }
    const button = document.getElementById("downloadPack");
    button.disabled = true;
    try {
      await flushSave();
      const pack = buildPackFiles();
      const blob = await createZip(pack.entries);
      downloadBlob(blob, safeDownloadName(state.name) + ".zip");
      showToast(t("downloadStarted"));
    } catch (error) {
      console.error("Pack export failed", error);
      showToast(error.message || t("exportFailed"));
    } finally {
      button.disabled = false;
    }
  }
  async function exportProject() {
    try {
      await flushSave();
      const manifest = {
        format: "music-interface-pack-project",
        version: 1,
        project: { name: state.name, description: state.description, minecraftVersion: state.version, packIcon: state.packIcon ? "pack.png" : null },
        tracks: state.tracks.map(track => ({
          uid: track.uid, id: track.id, title: track.title, author: track.author, album: track.album,
          audio: "audio/" + track.id + ".ogg", audioName: track.audioName,
          cover: track.coverBlob ? "covers/" + track.id + ".png" : null, coverName: track.coverName,
          genres: track.genres, moods: track.moods, tags: track.tags, weight: track.weight,
          energy: track.energy, volume: track.volume, cooldown: track.cooldown, fadeIn: track.fadeIn,
          fadeOut: track.fadeOut, ruleMode: track.ruleMode, contexts: track.contexts
        }))
      };
      const entries = [{ path: "project.json", blob: new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" }) }];
      if (state.packIcon) entries.push({ path: "pack.png", blob: state.packIcon });
      state.tracks.forEach(track => {
        entries.push({ path: "audio/" + track.id + ".ogg", blob: track.audioBlob });
        if (track.coverBlob) entries.push({ path: "covers/" + track.id + ".png", blob: track.coverBlob });
      });
      const blob = await createZip(entries);
      downloadBlob(blob, safeDownloadName(state.name) + ".mipack");
      showToast(t("downloadStarted"));
    } catch (error) {
      console.error("Project export failed", error);
      showToast(error.message || t("exportFailed"));
    }
  }

  async function onProjectInput(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const files = await readStoredZip(file);
      const raw = files.get("project.json");
      if (!raw) throw new Error(t("invalidProject"));
      const manifest = JSON.parse(await raw.text());
      if (manifest.format !== "music-interface-pack-project" || manifest.version !== 1 || !manifest.project || !Array.isArray(manifest.tracks)) throw new Error(t("invalidProject"));
      const imported = {
        name: String(manifest.project.name || t("nameFallback")),
        description: String(manifest.project.description || t("descriptionFallback")),
        version: versions.some(version => version.id === manifest.project.minecraftVersion) ? manifest.project.minecraftVersion : "1.21.1",
        packIcon: manifest.project.packIcon ? files.get("pack.png") || null : null,
        packIconName: manifest.project.packIcon ? "pack.png" : "",
        tracks: []
      };
      for (const item of manifest.tracks) {
        const audio = files.get(item.audio);
        if (!audio) throw new Error(t("invalidProject"));
        const cover = item.cover ? files.get(item.cover) || null : null;
        if (!await hasOggHeader(audio)) throw new Error(t("invalidProject"));
        imported.tracks.push({
          uid: String(item.uid || makeUid()), id: String(item.id || ""), title: String(item.title || ""),
          author: String(item.author || ""), album: String(item.album || ""), audioName: String(item.audioName || item.audio),
          audioBlob: audio, coverBlob: cover, coverName: String(item.coverName || ""),
          genres: String(item.genres || ""), moods: String(item.moods || ""), tags: String(item.tags || ""),
          weight: String(item.weight || "1"), energy: String(item.energy || "0.5"), volume: String(item.volume || "1"),
          cooldown: String(item.cooldown || "0"), fadeIn: String(item.fadeIn || ""), fadeOut: String(item.fadeOut || ""),
          ruleMode: String(item.ruleMode || "none"), contexts: Array.isArray(item.contexts) ? item.contexts.map(rule => createRule(rule)) : []
        });
      }
      state = imported;
      currentStep = 0;
      scheduleSave();
      render();
      showToast(t("importedToast"));
    } catch (error) {
      console.error("Project import failed", error);
      showToast(error.message === t("unsupportedArchive") ? error.message : t("invalidProject"));
    } finally {
      event.target.value = "";
    }
  }
  async function readStoredZip(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let end = -1;
    const lower = Math.max(0, bytes.length - 65557);
    for (let index = bytes.length - 22; index >= lower; index--) {
      if (view.getUint32(index, true) === 0x06054b50) { end = index; break; }
    }
    if (end < 0) throw new Error(t("invalidProject"));
    const count = view.getUint16(end + 10, true);
    let cursor = view.getUint32(end + 16, true);
    const files = new Map();
    const decoder = new TextDecoder();
    for (let index = 0; index < count; index++) {
      if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error(t("invalidProject"));
      const method = view.getUint16(cursor + 10, true);
      const storedCrc = view.getUint32(cursor + 16, true);
      const compressed = view.getUint32(cursor + 20, true);
      const uncompressed = view.getUint32(cursor + 24, true);
      const nameLength = view.getUint16(cursor + 28, true);
      const extraLength = view.getUint16(cursor + 30, true);
      const commentLength = view.getUint16(cursor + 32, true);
      const localOffset = view.getUint32(cursor + 42, true);
      const name = decoder.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLength));
      cursor += 46 + nameLength + extraLength + commentLength;
      if (!name || name.startsWith("/") || name.split("/").includes("..")) throw new Error(t("invalidProject"));
      if (method !== 0 || compressed !== uncompressed) throw new Error(t("unsupportedArchive"));
      if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error(t("invalidProject"));
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const localName = decoder.decode(bytes.subarray(localOffset + 30, localOffset + 30 + localNameLength));
      if (localName !== name) throw new Error(t("invalidProject"));
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const blob = new Blob([bytes.slice(dataStart, dataStart + uncompressed)]);
      if (await crc32(blob) !== storedCrc) throw new Error(t("invalidProject"));
      files.set(name, blob);
    }
    return files;
  }

  function validateCurrentIds() {
    const seen = new Set();
    return state.tracks.every(track => {
      if (!/^[a-z0-9_-]+$/.test(track.id) || seen.has(track.id)) return false;
      seen.add(track.id); return true;
    });
  }
  async function clearProject() {
    if (!window.confirm(t("clearConfirm"))) return;
    if (db) {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction("projects", "readwrite");
        transaction.objectStore("projects").delete("current");
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
      }).catch(() => {});
    }
    state = freshProject();
    currentStep = 0;
    render(); setSaveState("ready");
  }

  function addLanguageAndThemeHandlers() {
    document.getElementById("languageButton").addEventListener("click", () => {
      lang = lang === "fr" ? "en" : "fr";
      localStorage.setItem("musicinterface-pack-builder-lang", lang);
      render();
    });
    document.getElementById("themeButton").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("musicinterface-wiki-theme", next);
    });
    document.getElementById("clearButton").addEventListener("click", clearProject);
    document.getElementById("backButton").addEventListener("click", () => changeStep(currentStep - 1));
    document.getElementById("nextButton").addEventListener("click", () => {
      if (currentStep === 0 && !state.name.trim()) { showToast(t("checkName")); return; }
      if (currentStep === 1 && !state.tracks.length) { showToast(t("checkTrack")); return; }
      changeStep(currentStep + 1);
    });
    document.querySelectorAll(".step-item").forEach(button => button.addEventListener("click", () => changeStep(Number(button.dataset.step))));
  }

  async function init() {
    const savedTheme = localStorage.getItem("musicinterface-wiki-theme");
    if (savedTheme === "dark" || savedTheme === "light") document.documentElement.dataset.theme = savedTheme;
    addLanguageAndThemeHandlers();
    try {
      db = await openDatabase();
      const saved = await readSavedProject();
      if (saved) {
        restoring = true;
        state = {
          name: String(saved.name || t("nameFallback")), description: String(saved.description || t("descriptionFallback")),
          version: versions.some(version => version.id === saved.version) ? saved.version : "1.21.1",
          packIcon: saved.packIcon || null, packIconName: String(saved.packIconName || ""),
          tracks: Array.isArray(saved.tracks) ? saved.tracks.map(track => ({
            ...track, uid: String(track.uid || makeUid()), contexts: Array.isArray(track.contexts) ? track.contexts.map(rule => createRule(rule)) : []
          })) : []
        };
        restoring = false;
      }
    } catch (error) {
      console.warn("Local browser storage is unavailable", error);
      db = null;
    }
    render();
    setSaveState("ready");
  }

  window.addEventListener("beforeunload", () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    clearRenderUrls();
  });
  init();
})();