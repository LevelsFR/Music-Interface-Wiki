import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const tick = String.fromCharCode(96);
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-");
function inline(s, lang) {
  const reCode = new RegExp(tick + "([^" + tick + "]+)" + tick, "g");
  return esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_,label,url) => {
    if (lang === "fr") url = url.replace("https://levelsfr.github.io/Music-Interface-Wiki/fr/#overview","./#overview").replace("https://levelsfr.github.io/Music-Interface-Wiki/#overview","./#overview").replace("docs/PROJECT_GUIDE.md","./#overview").replace("https://levelsfr.github.io/Music-Interface-Wiki/fr/music-packs.html","./music-packs.html").replace("https://levelsfr.github.io/Music-Interface-Wiki/#musicpacks","./music-packs.html");
    else url = url.replace("docs/PROJECT_GUIDE.md","./#overview").replace("WIKI_CREATION_PACK_MUSIQUE.md","./fr/music-packs.html");
    return '<a href="'+esc(url)+'">'+label+'</a>';
  }).replace(reCode,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>");
}
function render(md,lang) {
  const lines=md.replace(/\r/g,"").split("\n"), output=[], headings=[];let para=[],list="";
  function flush(){if(para.length){output.push("<p>"+inline(para.join(" "),lang)+"</p>");para=[];}if(list){output.push("</"+list+">");list="";}}
  for(let i=0;i<lines.length;i++){
    const s=lines[i],h=/^(#{1,4})\s+(.+)$/.exec(s);
    if(s.startsWith(tick.repeat(3))){flush();const b=[];while(++i<lines.length && !lines[i].startsWith(tick.repeat(3)))b.push(lines[i]);output.push("<pre><code>"+esc(b.join("\n"))+"</code></pre>");continue;}
    if(h){flush();const level=h[1].length,id=slug(h[2]);headings.push({level,id,title:h[2],start:i});output.push("<h"+level+' id="'+id+'">'+inline(h[2],lang)+"</h"+level+">");continue;}
    if(!s.trim()){flush();continue;}
    if(s.startsWith("|")){flush();const rows=[];while(i<lines.length&&lines[i].startsWith("|")){rows.push(lines[i].split("|").slice(1,-1).map(v=>v.trim()));i++;}i--;output.push("<div class='guide-table-scroll'><table><thead><tr>"+rows[0].map(v=>"<th>"+inline(v,lang)+"</th>").join("")+"</tr></thead><tbody>"+rows.slice(2).map(row=>"<tr>"+row.map(v=>"<td>"+inline(v,lang)+"</td>").join("")+"</tr>").join("")+"</tbody></table></div>");continue;}
    const li=/^\s*([-*]|\d+\.)\s+(.+)$/.exec(s);
    if(li){if(para.length){output.push("<p>"+inline(para.join(" "),lang)+"</p>");para=[];}const ty=/^\d/.test(li[1])?"ol":"ul";if(list!==ty){if(list)output.push("</"+list+">");output.push("<"+ty+">");list=ty;}output.push("<li>"+inline(li[2],lang)+"</li>");continue;}
    if(list){output.push("</"+list+">");list="";}
    if(s.startsWith("> ")){flush();output.push("<blockquote>"+inline(s.slice(2),lang)+"</blockquote>");continue;}
    para.push(s.trim());
  }flush();
  const toc=headings.filter(h=>h.level===2||h.level===3).map(h=>'<a class="toc-level-'+h.level+'" href="#'+h.id+'">'+esc(h.title)+'</a>').join("\n");
  const idx=headings.filter(h=>h.level===2||h.level===3).map((h,i)=>{
    const next=headings.find(k=>k.start>h.start&&(k.level<=h.level));
    const end=next?next.start:Math.min(lines.length,h.start+50);
    return {lang,title:h.title,url:(lang==="fr"?"fr/":"")+"music-packs.html#"+h.id,text:lines.slice(h.start,Math.min(end,h.start+40)).join(" ").slice(0,1400)};
  });
  return {content:output.join("\n"),toc,index:idx};
}
const all=[];
for(const lang of ["en","fr"]){
  const path=join(root,"site",lang==="fr"?"fr/music-packs.html":"music-packs.html");
  const mdPath=join(root,"docs",lang==="fr"?"MUSIC_PACK_FR.md":"MUSIC_PACK_EN.md");
  const current=readFileSync(path,"utf8"),md=readFileSync(mdPath,"utf8"),result=render(md,lang);
  if(!current.includes('<div class="guide-body">')||!current.includes('<nav class="guide-toc">'))throw Error("Missing guide markup: "+path);
  let output=current.replace(/<nav class="guide-toc">[\s\S]*?<\/nav>/,'<nav class="guide-toc">'+result.toc+'</nav>');
  output=output.replace(/<div class="guide-body">[\s\S]*?<\/div><p class="guide-footer">/,'<div class="guide-body">'+result.content+'</div><p class="guide-footer">');
  if(output===current && !current.includes(result.content))throw Error("Guide replacement failed: "+path);
  writeFileSync(path,output,"utf8");
  all.push(...result.index);
}
all.push({lang:"en",title:"Release notes",url:"releases.html",text:"Music Interface v2.0 release September 28 2026 v1.9 August 19 2026"});
all.push({lang:"fr",title:"Notes de version",url:"fr/releases.html",text:"Music Interface v2.0 publiée le 28 septembre 2026 v1.9 19 août 2026"});
writeFileSync(join(root,"site/search-index.json"),JSON.stringify(all,null,2)+"\n","utf8");
console.log("Generated EN/FR guides and "+all.length+" search entries");
