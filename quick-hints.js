
/* A quick-reference TFT coach that never mutates the current match.
 * Pick one hero, one item or one starting pair. Full board logging is optional.
 * Curated Set 18 references, not live statistics. */
(function(){
 'use strict';
 const root=document.getElementById('quickHints');
 const api=window.TFTGuide, data=api&&api.hintData;
 if(!root||!api||!data)return;
 const $=id=>document.getElementById(id);
 const esc=value=>String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const allHeroes=Object.values(data.rosterByCost).flat();
 const popular=['Kennen','Veigar','Karma','Yunara','Kayle','Rammus','Master Yi','Tristana','Xayah','Ornn','Sejuani','Teemo','Aphelios','Morgana','Draven','Ahri'];
 const starters=[
  {id:'veigar',title:'Veigar + Ornn',tag:'Early AP + frontline',icons:['Veigar','Ornn'],
   watch:'Veigar copies, Ornn upgrade, LeBlanc and Alistar; Blue Buff or another useful mana item.',
   go:'Veigar / Ornn Spellweaver reroll only with several early copies. Otherwise keep Ornn as a tank and move AP items to a stronger caster.',
   avoid:'One Veigar at 2-7 is not a reroll signal. Do not roll away your economy.',comp:'veigar'},
  {id:'blossom',title:'Karma + Yunara',tag:'Blossom first, Solar later',icons:['Karma','Yunara'],
   watch:'More Karma and Yunara copies, Yorick for Blossom, then a reliable frontline. Leona, Kayle and Sejuani are later Solar options.',
   go:'Blossom Karma / Yunara reroll if both carries are appearing naturally. Build the 3★ core before adding Solar later.',
   avoid:'No early Karma / Yunara pairs? Switch to your best upgraded board. Do not chase Solar in Stage 2.',comp:'solar-yunara'},
  {id:'rift',title:'Pebbles + Murkwolf',tag:'Riftbeast opening',icons:['Pebbles','Murkwolf'],
   watch:'Other early Riftbeasts such as Gromp and eventually Krug; useful frontline upgrades.',
   go:'A flexible Riftbeast shell can transition toward Brambleback later if the right pieces arrive.',
   avoid:'Do not force seven Riftbeast without units and gold to support it.',comp:'riftbeast'},
  {id:'fae',title:'Rakan + Xayah',tag:'Quick Fae pair',icons:['Rakan','Xayah'],
   watch:'Tristana, Lillia and the Embiggen augment if actually offered; otherwise good 2★ tanks or item holders.',
   go:'Use Fae (2) as a flexible package. Extend to a larger Fae board only if the shops or augment encourage it.',
   avoid:'Two Fae alone are not a reason to sell stronger upgraded units.',comp:'fae-flex'},
  {id:'teemo',title:'Teemo + LeBlanc',tag:'Mana caster start',icons:['Teemo','LeBlanc'],
   watch:'More Teemo / LeBlanc copies and a frontliner such as Alistar; mana and spell-damage items.',
   go:'Slow-roll Teemo at Level 6 only when copies arrive and the lobby is not heavily contesting him.',
   avoid:'At Stage 3 with no copies, transfer items to a stronger AP carry instead.',comp:'teemo'},
  {id:'kayle',title:'Leona + Kayle',tag:'Solar / Eclipse option',icons:['Leona','Kayle'],
   watch:'More Kayles, a solid Sejuani or Shen frontline and an attack-speed component.',
   go:'Kayle reroll when you have several Kayles and good items. Later add supporting Solar / Lunar units.',
   avoid:'Do not force reroll just because one Kayle appears.',comp:'kayle'}
 ];
 const featured=['kayle-flicker','veigar-dawn','rammus-shield','teemo-cast','yi-wits','ornn-tank'];
 const state={mode:'champion',hero:'Kennen',item:"Guinsoo's Rageblade",start:'blossom',comboFilter:'featured'};
 function championArt(name){return '<img src="'+esc(api.championImg(name))+'" alt="" loading="lazy" onerror="this.remove()">';}
 function itemInfo(name){return data.items.find(i=>i[0]===name);}
 function itemArt(name){
  const item=itemInfo(name);
  return item?'<img src="'+esc(api.itemImg(item[5]))+'" alt="" loading="lazy" onerror="this.remove()">':
    '<span class="hint-art-fallback">'+esc(name.slice(0,1))+'</span>';
 }
 function artifactArt(name){
  // Reuse the existing two-step Artifact image fallback from the full guide.
  const image=api.artifactImgTag(name);
  return image||'<span class="hint-art-fallback">✦</span>';
 }
 function gearCard(name,kind){
  const item=itemInfo(name),desc=kind==='artifact'?'Rare artifact · only if obtained':
    item?item[1]+' + '+item[2]+' · '+item[4]:'';
  return '<div class="hint-gear" title="'+esc(desc)+'">'+
    (kind==='artifact'?artifactArt(name):itemArt(name))+
    '<div><b>'+esc(name)+'</b><small>'+esc(desc)+'</small></div></div>';
 }
 function heroRank(n){const i=popular.indexOf(n);return i<0?99:i;}
 function renderChoices(){
  const mode=state.mode;
  $('hintHeroBox').hidden=mode!=='champion';
  $('hintItemBox').hidden=mode!=='item';
  root.querySelectorAll('[data-hint-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hintMode===mode)));
  const query=$('hintHeroSearch').value.trim().toLowerCase();
  const champions=allHeroes.filter(n=>!query||n.toLowerCase().includes(query))
     .sort((a,b)=>heroRank(a)-heroRank(b)||a.localeCompare(b));
  const chosen=champions.slice(0,query?28:16);
  if(!chosen.includes(state.hero)&&champions.includes(state.hero))chosen.unshift(state.hero);
  $('hintHeroChoices').innerHTML=chosen.map(n=>
    '<button type="button" class="hint-choice" data-hint-hero="'+esc(n)+'" aria-pressed="'+(state.hero===n)+'" title="'+esc(n)+'">'+
    championArt(n)+'<span>'+esc(n)+'</span><small>'+api.holderCost(n)+'g</small></button>').join('')||
    '<p class="hint-caption">No matching champion. Try a shorter name.</p>';
  const itemQuery=$('hintItemSearch').value.trim().toLowerCase();
  const items=data.items.filter(i=>!itemQuery||i[0].toLowerCase().includes(itemQuery)).slice(0,itemQuery?35:16);
  if(!items.some(i=>i[0]===state.item)){
    const found=itemInfo(state.item);if(found)items.unshift(found);
  }
  $('hintItemChoices').innerHTML=items.map(i=>
    '<button type="button" class="hint-choice" data-hint-item="'+esc(i[0])+'" aria-pressed="'+(state.item===i[0])+'" title="'+esc(i[4])+'">'+
      itemArt(i[0])+'<span>'+esc(i[0])+'</span></button>').join('')||
    '<p class="hint-caption">No matching item.</p>';
 }
 function cardForComp(comp){
  return '<div class="hint-pivot"><b>'+esc(comp.name)+'</b>'+
   '<p>Consider when: '+esc(comp.when)+'</p>'+
   '<button type="button" data-hint-comp="'+esc(comp.id)+'">See full build</button></div>';
 }
 function heroResult(){
  const hero=state.hero,p=api.heroItemProfile(hero);
  const direct=data.powerCombos.filter(c=>c.champion===hero);
  const artifacts=(data.heroArtifacts[hero]||[]).slice(0,3);
  const comps=data.comps.filter(c=>c.carry.includes(hero)||c.front.includes(hero)||
     (api.holderCost(hero)<=3&&c.units.includes(hero)))
     .sort((a,b)=>Number(b.carry.includes(hero))-Number(a.carry.includes(hero))).slice(0,2);
  return '<div class="hint-result-top">'+championArt(hero)+'<div><h3>'+esc(hero)+'</h3>'+
    '<span>'+esc(p.role)+' · '+api.holderCost(hero)+'g · '+esc(p.quality)+' recommendations</span></div></div>'+
    '<div class="hint-result-sublabel">Good item fits</div>'+
    '<div class="hint-gear-list">'+p.items.slice(0,4).map(i=>gearCard(i,'item')).join('')+'</div>'+
    '<p class="hint-caption">'+esc(p.note)+'</p>'+
    (artifacts.length?'<div class="hint-result-sublabel">If you happen to get an Artifact</div><div class="hint-gear-list">'+
      artifacts.map(i=>gearCard(i,'artifact')).join('')+'</div>':'')+
    (direct.length?'<div class="hint-result-sublabel">Interesting interactions for '+esc(hero)+'</div>'+
     direct.slice(0,2).map(c=>'<div class="hint-pivot"><b>'+esc(c.title)+'</b><p>'+
       esc(c.items.concat(c.artifacts).join(' + '))+': '+esc(c.why)+'</p><p>'+esc(c.plan)+'</p></div>').join(''):'')+
    (comps.length?'<div class="hint-result-sublabel">Where this could lead</div><div class="hint-pivot-list">'+
      comps.map(cardForComp).join('')+'</div>':'');
 }
 function itemResult(){
  const name=state.item,item=itemInfo(name);
  if(!item)return '<p class="hint-caption">Choose an item.</p>';
  const champions=allHeroes.map(n=>{
    const profile=api.heroItemProfile(n),position=profile.items.indexOf(name);
    const relevant=data.comps.some(c=>(c.carry.includes(n)&&c.carryItems.includes(name))||
      (c.front.includes(n)&&c.tankItems.includes(name)));
    return {name:n,position,profile,relevant};
  }).filter(x=>x.position>=0)
    .sort((a,b)=>(b.relevant?1:0)-(a.relevant?1:0)||a.position-b.position||
      Number(api.holderCost(a.name))-Number(api.holderCost(b.name))).slice(0,8);
  const combos=data.powerCombos.filter(c=>c.items.includes(name)).slice(0,2);
  return '<div class="hint-result-top">'+itemArt(name)+'<div><h3>'+esc(name)+'</h3><span>'+
   esc(item[1]+' + '+item[2]+' · '+item[3])+'</span></div></div>'+
   '<p class="hint-caption">'+esc(item[4])+'</p>'+
   '<div class="hint-result-sublabel">Champions that can use it</div>'+
   (champions.length?'<div class="hint-gear-list">'+champions.map(h=>
      '<button type="button" class="hint-gear" data-hint-hero="'+esc(h.name)+'" title="See '+esc(h.name)+' items">'+
      championArt(h.name)+'<div><b>'+esc(h.name)+'</b><small>'+
      esc(h.profile.quality)+(h.relevant?' · comp fit':'')+'</small></div></button>').join('')+'</div>':
      '<p class="hint-caption">No champion-specific holder in this curated reference; choose for your current strongest unit.</p>')+
   (combos.length?'<div class="hint-result-sublabel">Strong combos involving this item</div>'+
      combos.map(c=>'<div class="hint-pivot"><b>'+esc(c.champion)+' — '+esc(c.title)+'</b><p>'+esc(c.why)+'</p></div>').join(''):'');
 }
 function renderLookup(){
  renderChoices();
  $('hintLookupResult').innerHTML=state.mode==='champion'?heroResult():itemResult();
 }
 function renderStarters(){
  $('hintStartCards').innerHTML=starters.map(s=>
    '<button type="button" class="hint-start-card" data-hint-start="'+s.id+'" aria-pressed="'+(state.start===s.id)+'">'+
      '<div class="hint-start-avatars">'+s.icons.map(championArt).join('')+'</div>'+
      '<span class="hint-card-tag">'+esc(s.tag)+'</span><strong>'+esc(s.title)+'</strong>'+
      '<small>Click for a simple follow-up watchlist</small></button>').join('');
  const active=starters.find(x=>x.id===state.start);
  if(!active)return;
  $('hintStartDetail').innerHTML='<h3>'+esc(active.title)+' — where to go next</h3>'+
    '<p><b>Look for:</b> '+esc(active.watch)+'</p>'+
    '<p><b>Path:</b> '+esc(active.go)+'</p>'+
    '<p><b>Do not force:</b> '+esc(active.avoid)+'</p>'+
    '<div class="hint-detail-actions"><button type="button" data-hint-comp="'+esc(active.comp)+'">Explore this build</button>'+
    '<button type="button" data-hint-hero="'+esc(active.icons[0])+'">View '+esc(active.icons[0])+' items</button></div>';
 }
 function sortedCombos(){
  const combos=data.powerCombos.slice().sort((a,b)=>{
    const ai=featured.indexOf(a.id),bi=featured.indexOf(b.id);
    return (ai<0?999:ai)-(bi<0?999:bi);
  });
  if(state.comboFilter==='featured')return combos.slice(0,6);
  if(state.comboFilter==='standard')return combos.filter(c=>!c.artifacts.length);
  if(state.comboFilter==='artifact')return combos.filter(c=>c.artifacts.length);
  return combos;
 }
 function renderCombos(){
  $('hintComboFilters').querySelectorAll('[data-hint-combos]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hintCombos===state.comboFilter)));
  $('hintComboCards').innerHTML=sortedCombos().map(c=>{
    const names=c.items.concat(c.artifacts);
    return '<article class="hint-combo-card"><div class="hint-eyebrow">'+esc(c.tag)+
      (c.artifacts.length?' · if Artifact offered':' · standard items')+'</div>'+
      '<div class="hint-combo-icons">'+championArt(c.champion)+
      names.map(n=>c.artifacts.includes(n)?artifactArt(n):itemArt(n)).join('')+'</div>'+
      '<h3>'+esc(c.champion)+' · '+esc(c.title)+'</h3>'+
      '<div class="hint-combo-title">'+esc(names.join(' + '))+'</div>'+
      '<p>'+esc(c.why)+'</p><p><b>Follow-up:</b> '+esc(c.plan)+'</p>'+
      '<button type="button" data-hint-hero="'+esc(c.champion)+'">More on '+esc(c.champion)+'</button></article>';
  }).join('');
 }
 function selectHero(name){
  if(!allHeroes.includes(name))return;
  state.hero=name;state.mode='champion';$('hintHeroSearch').value='';
  renderLookup();
  $('hintLookupPanel').scrollIntoView({block:'start',behavior:'smooth'});
 }
 function selectItem(name){
  if(!itemInfo(name))return;
  state.item=name;state.mode='item';renderLookup();
 }
 root.addEventListener('click',event=>{
  const b=event.target.closest('button');
  if(!b)return;
  if(b.dataset.hintHero){selectHero(b.dataset.hintHero);return;}
  if(b.dataset.hintItem){selectItem(b.dataset.hintItem);return;}
  if(b.dataset.hintMode){state.mode=b.dataset.hintMode;renderLookup();return;}
  if(b.dataset.hintStart){state.start=b.dataset.hintStart;renderStarters();return;}
  if(b.dataset.hintCombos){state.comboFilter=b.dataset.hintCombos;renderCombos();return;}
  if(b.dataset.hintComp){api.showComposition(b.dataset.hintComp);return;}
 });
 $('hintHeroSearch').addEventListener('input',renderChoices);
 $('hintItemSearch').addEventListener('input',renderChoices);
 renderLookup();renderStarters();renderCombos();
})();
