(() => {
  const root = document.documentElement;
  const body = document.body;
  const lang = root.lang === "fr" ? "fr" : "en";
  const tabs = [...document.querySelectorAll("[data-tab]")];
  const tabLinks = [...document.querySelectorAll("[data-tab-link]")];
  const panels = [...document.querySelectorAll("[data-panel]")];
  const menuButton = document.getElementById("menuButton");
  const themeToggle = document.getElementById("themeToggle");
  const search = document.getElementById("wikiSearch");
  const results = document.getElementById("searchResults");
  const valid = new Set(panels.map(p => p.dataset.panel));
  const normalize = value => (value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const slug = value => normalize(value).replace(/[^a-z0-9\\s-]/g, "").trim().replace(/\\s+/g, "-");
  const entries = [];
  panels.forEach(panel => {
    const tab = panel.dataset.panel;
    const h1 = panel.querySelector("h1")?.textContent.trim() || tab;
    const headings = [...panel.querySelectorAll("h2,h3")];
    headings.forEach((h, i) => {
      const anchor = tab + "--" + slug(h.textContent);
      h.id = anchor;
      let text = "", next = h.nextElementSibling;
      while (next && !/^H[23]$/.test(next.tagName)) { text += " " + next.textContent; next = next.nextElementSibling; }
      entries.push({label: h.textContent.trim(), tab, hash: anchor, text: (h1 + " " + h.textContent + " " + text).replace(/\\s+/g," ").slice(0,5000), type:"section"});
    });
    entries.push({label:h1,tab,hash:tab,text:panel.textContent.replace(/\\s+/g," ").slice(0,1200),type:"tab"});
  });
  function showTab(tab, hash = tab, updateHash = true) {
    if(!valid.has(tab)) tab = "overview";
    panels.forEach(p => p.classList.toggle("active", p.dataset.panel === tab));
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
    tabLinks.forEach(t => t.classList.toggle("active", t.dataset.tabLink === tab));
    if(updateHash) history.replaceState(null, "", "#" + hash);
    body.classList.remove("menu-open");
    requestAnimationFrame(() => {
      if(hash !== tab) document.getElementById(hash)?.scrollIntoView({behavior:"smooth",block:"start"});
      else window.scrollTo({top:0,behavior:"instant"});
    });
  }
  function fromHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    const tab = valid.has(hash) ? hash : (hash.split("--")[0] || "overview");
    showTab(tab, hash || tab, false);
  }
  tabs.forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));
  tabLinks.forEach(a => a.addEventListener("click", e => {e.preventDefault();showTab(a.dataset.tabLink)}));
  menuButton?.addEventListener("click", () => body.classList.toggle("menu-open"));
  document.addEventListener("click", e => { if(window.innerWidth <= 820 && body.classList.contains("menu-open") && !e.target.closest("#sidebar") && !e.target.closest("#menuButton"))body.classList.remove("menu-open");});
  const savedTheme = localStorage.getItem("musicinterface-wiki-theme");
  if(savedTheme === "dark" || savedTheme === "light") root.dataset.theme = savedTheme;
  themeToggle?.addEventListener("click", () => {root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";localStorage.setItem("musicinterface-wiki-theme", root.dataset.theme);});
  function closeResults(){if(!results)return;results.hidden=true;results.replaceChildren();}
  function renderSearch(){
    if(!search||!results)return;
    const q=normalize(search.value.trim());
    if(q.length<2){closeResults();return;}
    let matches=entries.filter(e=>normalize(e.text).includes(q)).map(e=>({...e,score:normalize(e.label).includes(q)?0:1}));
    matches.sort((a,b)=>a.score-b.score || (a.type==="section"?-1:1));
    results.replaceChildren();
    if(!matches.length){const none=document.createElement("div");none.className="search-empty";none.textContent=lang==="fr"?"Aucun résultat":"No result found";results.append(none);}
    matches.slice(0,12).forEach(m=>{
      const a=document.createElement("a");a.className="search-result";a.href="#"+m.hash;
      const strong=document.createElement("strong");strong.textContent=m.label;
      const sub=document.createElement("span");const at=normalize(m.text).indexOf(q);sub.textContent=(at>50?"…":"")+m.text.slice(Math.max(0,at-50),Math.max(0,at-50)+140)+(m.text.length>140?"…":"");
      a.append(strong,sub);a.addEventListener("click",e=>{e.preventDefault();showTab(m.tab,m.hash);search.value="";closeResults();});results.append(a);
    });results.hidden=false;
  }
  search?.addEventListener("input",renderSearch);
  search?.addEventListener("keydown",e=>{if(e.key==="Escape"){search.value="";closeResults();search.blur();}});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search?.focus();}});
  document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))closeResults();});
  window.addEventListener("hashchange",fromHash);
  fromHash();
})();



(() => {
  async function getJson(url, timeout = 6500) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function compact(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return String(value ?? "");
    return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(number);
  }

  async function loadDiscord() {
    const target = document.getElementById("discordStats");
    const badge = document.getElementById("discordBadge");
    if (!target || !badge) return;
    try {
      const data = await getJson("https://discord.com/api/v10/invites/kb8NSTF45n?with_counts=true&with_expiration=true");
      const online = data.approximate_presence_count;
      const members = data.approximate_member_count;
      if (!Number.isFinite(online) || !Number.isFinite(members)) return;
      target.innerHTML = '<span class="status-dot"></span>' + compact(online) + ' online <span class="community-divider">•</span> ' + compact(members) + ' members';
      badge.title = compact(online) + " online • " + compact(members) + " members";
    } catch {
      target.innerHTML = '<span class="status-dot"></span>Join the server';
    }
  }

  async function loadShield(url, targetId, suffix) {
    const target = document.getElementById(targetId);
    if (!target) return;
    try {
      const data = await getJson(url);
      const value = String(data.message || "").trim();
      if (value) target.textContent = value + " " + suffix;
    } catch {}
  }

  loadDiscord();
  loadShield("https://img.shields.io/curseforge/dt/1481143.json", "curseforgeStats", "downloads");
  loadShield("https://img.shields.io/modrinth/dt/music-interface.json", "modrinthStats", "downloads");

  setInterval(loadDiscord, 300000);
  setInterval(() => loadShield("https://img.shields.io/curseforge/dt/1481143.json", "curseforgeStats", "downloads"), 600000);
  setInterval(() => loadShield("https://img.shields.io/modrinth/dt/music-interface.json", "modrinthStats", "downloads"), 600000);
})();