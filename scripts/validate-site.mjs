import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
const root=join(process.cwd(),"site");
const check=(ok,message)=>{if(!ok)throw Error(message);};
const routes=["index.html","fr/index.html","music-packs.html","fr/music-packs.html","releases.html","fr/releases.html","app.js","styles.css","search-index.json"];
for(const route of routes) check(existsSync(join(root,route)),"Missing site file: "+route);
for(const page of routes.filter(p=>p.endsWith(".html"))){
  const html=readFileSync(join(root,page),"utf8");
  check(html.includes("<h1") && html.includes("</html>"),"Invalid HTML framing: "+page);
  if(page.includes("music-packs"))check(html.includes("music_data.json")&&html.includes("sounds.json")&&html.includes("<pre>"),"Incomplete pack guide: "+page);
  if(page.endsWith("index.html"))check((html.match(/data-panel=/g)||[]).length===6,"Missing wiki panels: "+page);
  check(!html.includes("github.com/LevelsFR/Music-Interface-Wiki/blob/main/docs/MUSIC_PACK_FR.md"),"Outdated repo link: "+page);
  for(const match of html.matchAll(/href="([^"]+)"/g)){
    const target=match[1];
    if(target.startsWith("#") || /^[a-z]+:/.test(target) || target.startsWith("/"))continue;
    const file=target.split("#")[0].split("?")[0];
    if(!file)continue;
    let resolved=resolve(dirname(join(root,page)),file);
    if(resolved.endsWith("/"))resolved=join(resolved,"index.html");
    if(existsSync(resolved) && existsSync(join(resolved,"index.html")))continue;
    check(existsSync(resolved)||existsSync(join(resolved,"index.html")),"Broken relative link in "+page+": "+target);
  }
}
const index=JSON.parse(readFileSync(join(root,"search-index.json"),"utf8"));
check(index.some(x=>x.lang==="en")&&index.some(x=>x.lang==="fr"),"Search index missing a locale");
console.log("Static site checks passed, "+index.length+" indexed guide topics");
