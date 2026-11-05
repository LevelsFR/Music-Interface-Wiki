import {readFileSync,writeFileSync} from "node:fs";
import {join} from "node:path";
const root=process.cwd(), ids=["overview","installation","configuration","commands","troubleshooting"];
const slug=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/<[^>]*>/g,"").toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-");
for(const lang of ["en","fr"]){
 const source=readFileSync(join(root,"site",lang==="fr"?"fr/index.html":"index.html"),"utf8");
 for(const id of ids){
  const match=new RegExp('<section class="tab-panel[^"]*" id="'+id+'" data-panel="'+id+'">([\\s\\S]*?)<\\/section>').exec(source);
  if(!match)throw Error("Missing panel "+lang+":"+id);
  let content=match[1].replace(/<(h[23])>([\s\S]*?)<\/\1>/g,(_,tag,text)=>"<"+tag+' id="'+slug(text)+'">'+text+"</"+tag+">");
  const headings=[...content.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)];
  const toc=headings.map(m=>'<a class="toc-level-'+m[1]+'" href="#'+m[2]+'">'+m[3].replace(/<[^>]*>/g,"")+'</a>').join("\n");
  content=content.replace(/href="#(overview|installation|configuration|commands|musicpacks|troubleshooting)"(?=[^>]*data-tab-link)/g,'href="../#$1"').replace(/href="(music-packs\.html|releases\.html)"/g,'href="../$1"');
  if(lang==="en")content=content.replace(/href="fr\/music-packs\.html"/g,'href="../fr/music-packs.html"');
  const target=join(root,"site",lang==="fr"?"fr/docs":"docs",id+".html");
  let page=readFileSync(target,"utf8");
  if(!page.includes('<nav class="guide-toc">')||!page.includes('<div class="guide-body">'))throw Error("Invalid standalone page "+target);
  page=page.replace(/<nav class="guide-toc">[\s\S]*?<\/nav>/,'<nav class="guide-toc">'+toc+'</nav>');
  page=page.replace(/<div class="guide-body">[\s\S]*?<\/div><p class="guide-footer">/,'<div class="guide-body">'+content+'</div><p class="guide-footer">');
  const title=content.match(/<h1>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,"")||id;
  page=page.replace(/<title>[^<]* \| Music Interface Wiki<\/title>/,'<title>'+title+' | Music Interface Wiki</title>');
  writeFileSync(target,page,"utf8");
  console.log("Updated",lang,id);
 }
}