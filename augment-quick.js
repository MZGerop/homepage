
/* Fast augment tier lookup; no game tracking, no live ranking claims. */
(function(){
 'use strict';
 const root=document.getElementById('augmentQuick');
 const api=window.TFTGuide;
 if(!root||!api||!Array.isArray(api.augmentHints))return;
 const byId=id=>document.getElementById(id);
 const esc=value=>String(value==null?'':value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const order={S:0,A:1,B:2,C:3,'?':4};
 const sorted=(a,b)=>(order[a.tier]??4)-(order[b.tier]??4)||a.id.localeCompare(b.id);
 const names=new Set(),catalog=[];
 api.augmentHints.forEach(a=>{
  if(!a||!a.id||a.inactive||names.has(a.id.toLowerCase()))return;
  names.add(a.id.toLowerCase());catalog.push(a);
 });
 catalog.sort(sorted);
 let selected=[],limit=32;
 const tierLabel={S:'Top tier',A:'Strong',B:'Situational',C:'Niche','?':'Not rated'};
 const badgeClass=t=>t==='?'?'unknown':t;
 function badge(t){
  return '<span class="augq-badge augq-'+badgeClass(t)+'" aria-label="'+esc((t==='?'?'Unranked':t+' tier'))+'">'+esc(t)+'</span>';
 }
 function picture(a){
  return a.manual?'<span class="augq-badge augq-unknown" aria-hidden="true">?</span>':
   '<span class="augq-image-wrap">'+api.augmentImgTag(a.id).replace('<img ','<img class="augq-offer-icon" ')+'</span>';
 }
 function renderOffers(){
  const shown=selected.slice().sort(sorted);
  byId('augqOffers').innerHTML=[0,1,2].map(i=>{
   const a=shown[i];
   if(!a)return '<div class="augq-offer empty"><div><span class="augq-empty-number">'+(i+1)+'</span>'+
     '<span class="augq-empty-hint">Choose an Augment below</span></div></div>';
   const tier=a.tier==='?'?'unknown':a.tier;
   return '<article class="augq-offer augq-tier-'+tier+'">'+badge(a.tier)+
     '<div class="augq-offer-main"><div class="augq-offer-top">'+picture(a)+
     '<div><strong class="augq-offer-name">'+esc(a.id)+'</strong><span class="augq-offer-type">'+
       esc((a.rarity||'Unknown')+' · '+tierLabel[a.tier])+'</span></div></div>'+
     '<p class="augq-offer-desc">'+esc(a.desc||'No verified description in this guide.')+'</p></div>'+
     '<button type="button" class="augq-offer-remove" data-augq-remove="'+esc(a.id)+'" title="Remove '+esc(a.id)+'" aria-label="Remove '+esc(a.id)+'">×</button></article>';
  }).join('');
  const rated=shown.filter(a=>a.tier!=='?'),best=rated[0];
  byId('augqStatus').innerHTML=selected.length===0?'Select your three Augments below to compare their general tiers.':
    selected.length<3?selected.length+' of 3 selected · pick '+(3-selected.length)+' more.':
    best?'<strong>'+esc(best.id)+' ('+best.tier+')</strong> has the highest general tier here. Check whether its conditions fit your board.':
      'All three are unranked here. Compare their in-game effects; no ranking is being guessed.';
 }
 function matches(){
  const q=byId('augqSearch').value.trim().toLowerCase();
  const rarity=byId('augqRarity').value;
  const result=catalog.filter(a=>(rarity==='all'||a.rarity===rarity)&&
    (!q||a.id.toLowerCase().includes(q)||a.desc.toLowerCase().includes(q)));
  return {q,result};
 }
 function renderResults(){
  const {q,result}=matches();
  const subset=result.slice(0,limit);
  const selectedNames=new Set(selected.map(a=>a.id));
  byId('augqCount').textContent=result.length+' Augment'+(result.length===1?'':'s')+
    (q?' found':' listed')+' · S, A, B, C are general tiers';
  byId('augqResults').innerHTML=subset.map(a=>{
   const picked=selectedNames.has(a.id);
   const d=(a.desc||'').slice(0,105);
   return '<button type="button" class="augq-pick" data-augq-pick="'+esc(a.id)+'" aria-pressed="'+picked+'" title="'+esc(a.desc||'')+'">'+
    badge(a.tier)+picture(a)+'<span style="min-width:0;flex:1">'+
    '<strong class="augq-pick-name">'+esc(a.id)+'</strong><span class="augq-pick-detail">'+
    esc(a.rarity||'Unknown')+' · '+esc(d)+(d.length>=105?'…':'')+'</span></span>'+
    (picked?'<span class="augq-pick-check">✓</span>':'')+'</button>';
  }).join('')||'<p class="augq-hint">No matching Augments in the saved tier list.</p>';
  byId('augqShowMore').hidden=result.length<=limit;
  byId('augqManual').innerHTML=q.length>=2&&!result.some(a=>a.id.toLowerCase()===q)?
    '<button type="button" class="augq-unlisted" data-augq-custom="'+esc(q)+'">Not listed? Add “'+esc(byId('augqSearch').value.trim())+'” as unranked (?)</button>':'';
 }
 function render(){renderOffers();renderResults();}
 function choose(a){
  const idx=selected.findIndex(s=>s.id===a.id);
  if(idx>=0)selected.splice(idx,1);
  else if(selected.length<3)selected.push(a);
  else {
   byId('augqStatus').textContent='Three already selected. Remove one (×) or clear the comparison first.';
   return;
  }
  byId('augqSearch').value='';limit=32;render();
  byId('augqSearch').focus({preventScroll:true});
 }
 root.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.augqPick){
   const a=catalog.find(x=>x.id===button.dataset.augqPick);
   if(a)choose(a);
  } else if(button.dataset.augqRemove){
   selected=selected.filter(a=>a.id!==button.dataset.augqRemove);render();
  } else if(button.dataset.augqCustom){
   const name=byId('augqSearch').value.trim().replace(/\s+/g,' ').slice(0,90);
   if(!name)return;
   const known=catalog.find(a=>a.id.toLowerCase()===name.toLowerCase());
   choose(known||{id:name,tier:'?',rarity:'Unknown',desc:'Not in the saved tier list. No rating is claimed.',manual:true});
  } else if(button.id==='augqClear'){
   selected=[];byId('augqSearch').value='';limit=32;render();
  } else if(button.id==='augqShowMore'){
   limit+=32;renderResults();
  } else if(button.id==='augqFullTracker'){
   api.openAugmentOffers();
  }
 });
 byId('augqSearch').addEventListener('input',()=>{limit=32;renderResults();});
 byId('augqRarity').addEventListener('change',()=>{limit=32;renderResults();});
 document.getElementById('tftResetGame')?.addEventListener('click',()=>{
  selected=[];byId('augqSearch').value='';byId('augqRarity').value='all';limit=32;render();
 });
 window.resetAugmentQuick=()=>{selected=[];byId('augqSearch').value='';render();};
 render();
})();
