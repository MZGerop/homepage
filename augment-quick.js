/* TFT Set 18 Augment icon-first lookup.
 * No game state or user selections are sent to an external server.
 * Static catalog is bundled in augments-set18.json.
 */
(function(){
  'use strict';
  const root=document.getElementById('augmentQuick');
  if(!root)return;
  const api=window.TFTGuide||{};
  const $=id=>document.getElementById(id);
  const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const collator=new Intl.Collator('en',{sensitivity:'base',numeric:true});
  const tiers={S:0,A:1,B:2,C:3,'?':4};
  const labels={S:'Spitzenklasse',A:'Stark',B:'Situativ',C:'Nische','?':'Nicht bewertet'};
  const grades={S:'gradeS',A:'gradeA',B:'gradeB',C:'gradeC','?':'gradeUnknown'};
  let list=[],selected=[],rarity='Gold',search='',loading=true;
  const index=new Map();
  const abbrev=name=>{
    const words=name.replace(/[+!'’]/g,' ').split(/[^a-zA-Z0-9]+/).filter(Boolean);
    return (words.length>1?words.slice(0,3).map(x=>x[0]).join(''):name.slice(0,2)).toUpperCase();
  };
  function picture(a,extraClass=''){
    const text=escapeHTML(abbrev(a.name));
    if(!a.icon)return '<span class="augv-icon-fallback '+extraClass+'" aria-label="Kein verlässliches Icon verfügbar">'+text+'</span>';
    return '<span class="augv-icon-frame '+extraClass+'"><img loading="lazy" decoding="async" src="'+escapeHTML(a.icon)+
      '" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false">'+
      '<span class="augv-icon-fallback" hidden>'+text+'</span></span>';
  }
  function grade(a){
    const t=tiers[a.tier]===undefined?'?':a.tier;
    return '<span class="augv-tier '+grades[t]+'" title="'+escapeHTML(labels[t])+'">'+escapeHTML(t)+'</span>';
  }
  function ordered(arr){return arr.slice().sort((a,b)=>tiers[a.tier]-tiers[b.tier]||collator.compare(a.name,b.name));}
  function renderComparison(){
    const box=$('augvCompare');
    const rated=selected.filter(a=>tiers[a.tier]<4);
    const bestGrade=Math.min(...rated.map(a=>tiers[a.tier]));
    box.innerHTML=[0,1,2].map(i=>{
      const a=selected[i];
      if(!a)return '<div class="augv-slot empty" aria-label="Freier Platz '+(i+1)+'">'+
        '<span class="augv-slot-number">'+(i+1)+'</span><span>Augment auswählen</span></div>';
      const best=tiers[a.tier]===bestGrade;
      return '<article class="augv-slot'+(best?' top-grade':'')+'">'+
        '<div class="augv-slot-art">'+picture(a)+'<span class="augv-slot-grade">'+grade(a)+'</span></div>'+
        '<div class="augv-slot-detail"><strong>'+escapeHTML(a.name)+'</strong>'+
        '<small>'+escapeHTML(a.rarity==='Prismatic'?'Prismatisch':a.rarity==='Silver'?'Silber':a.rarity==='Gold'?'Gold':'Unbekannt')+
        ' · '+escapeHTML(labels[a.tier]||labels['?'])+'</small>'+
        '<p title="'+escapeHTML(a.description)+'">'+escapeHTML(a.description||'Keine überprüfte Beschreibung vorhanden.')+'</p></div>'+
        '<button class="augv-slot-remove" type="button" data-av-remove="'+escapeHTML(a.id)+'" aria-label="'+escapeHTML(a.name)+' entfernen" title="Entfernen">×</button></article>';
    }).join('');
    let message='Klicke auf die großen Symbole unten, um bis zu drei Angebote zu vergleichen.';
    if(selected.length===1)message='1 von 3 gewählt. Wähle die nächsten Symbole – du musst keine Namen eintippen.';
    if(selected.length===2)message='2 von 3 gewählt. Ein Angebot fehlt noch.';
    if(selected.length===3){
      const strongest=ordered(rated);
      if(strongest.length){
        const equal=strongest.filter(a=>a.tier===strongest[0].tier).map(a=>a.name);
        message='<b>Höchste allgemeine Einstufung:</b> '+escapeHTML(equal.join(' / '))+' ('+
          escapeHTML(strongest[0].tier)+'). Die passende Wahl hängt trotzdem von deinem Board ab.';
      }else message='Keines dieser Augments ist bewertet. Prüfe ihre Effekte im Spiel.';
    }
    $('augvVerdict').innerHTML=message;
  }
  function filtered(){
    const candidates=list.filter(a=>rarity==='all'||a.rarity===rarity);
    if(!search)return candidates;
    // Names matter most during a round. Search effects only when no name matches.
    const byName=candidates.filter(a=>a.name.toLowerCase().includes(search));
    return byName.length?byName:candidates.filter(a=>a.description.toLowerCase().includes(search));
  }
  function renderGallery(){
    const active=new Set(selected.map(a=>a.id));
    $('augvRarity').querySelectorAll('[data-av-rarity]').forEach(b=>{
      b.setAttribute('aria-pressed',String(b.dataset.avRarity===rarity));
    });
    const visible=filtered();
    $('augvCount').textContent=loading?'Katalog wird geladen …':visible.length+' Augments · alphabetisch · Bild antippen';
    $('augvGallery').setAttribute('aria-busy',String(loading));
    $('augvGallery').innerHTML=visible.map(a=>{
      const picked=active.has(a.id);
      return '<button type="button" class="augv-pick" data-av-pick="'+escapeHTML(a.id)+'" aria-pressed="'+picked+
       '" aria-label="'+escapeHTML(a.name+' — '+a.tier+' Tier'+(picked?', gewählt':''))+'" title="'+escapeHTML(a.name+(a.description?' — '+a.description:''))+'">'+
       '<span class="augv-pick-art">'+picture(a)+grade(a)+(picked?'<span class="augv-picked">✓</span>':'')+'</span>'+
       '<span class="augv-pick-name">'+escapeHTML(a.name)+'</span></button>';
    }).join('')||(loading?'<p class="augv-empty">Augment-Symbole werden geladen …</p>':
      '<p class="augv-empty">Keine Treffer. Anderen Seltenheitsfilter wählen oder Suche löschen.</p>');
  }
  function render(){renderComparison();renderGallery();}
  function setRarity(next){
    if(!['all','Silver','Gold','Prismatic'].includes(next))return;
    rarity=next;renderGallery();$('augvGallery').scrollTop=0;
  }
  function selectAugment(id){
    const a=index.get(id);if(!a)return;
    const i=selected.findIndex(x=>x.id===id);
    if(i>=0){selected.splice(i,1);}
    else if(selected.length<3){selected.push(a);}
    else {
      $('augvVerdict').textContent='Drei ausgewählt. Entferne oben erst ein Augment (×), um ein anderes zu vergleichen.';
      return;
    }
    render();
  }
  function updateCounts(){
    const counts={Silver:0,Gold:0,Prismatic:0};
    for(const a of list)if(a.rarity in counts)counts[a.rarity]++;
    $('augvSilverCount').textContent=counts.Silver;
    $('augvGoldCount').textContent=counts.Gold;
    $('augvPrismaticCount').textContent=counts.Prismatic;
  }
  function applyCatalog(data){
    const known=new Set();
    list=(Array.isArray(data)?data:[]).filter(a=>{
      if(!a||typeof a.name!=='string'||!a.name||known.has(a.name.toLowerCase()))return false;
      known.add(a.name.toLowerCase());return true;
    }).map(a=>({
      id:a.id||a.name,name:a.name,rarity:a.rarity||'Unknown',
      tier:tiers[a.tier]===undefined?'?':a.tier,
      description:String(a.description||'').trim(),icon:a.icon||null
    })).sort((a,b)=>collator.compare(a.name,b.name));
    index.clear();for(const a of list)index.set(a.id,a);
    loading=false;updateCounts();render();
  }
  function fallbackCatalog(){
    const items=api.augmentHints||[];
    return items.filter(a=>!a.inactive).map(a=>({
      id:a.id,name:a.id,rarity:a.rarity||'Unknown',tier:a.tier||'?',
      description:a.desc||'',icon:null
    }));
  }
  root.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.avRarity){setRarity(b.dataset.avRarity);return;}
    if(b.dataset.avPick){selectAugment(b.dataset.avPick);return;}
    if(b.dataset.avRemove){selectAugment(b.dataset.avRemove);return;}
    if(b.id==='augvClear'){selected=[];render();return;}
    if(b.id==='augvSearchClear'){$('augvSearch').value='';search='';renderGallery();$('augvSearch').focus();return;}
    if(b.id==='augvFullTracker')api.openAugmentOffers?.();
  });
  $('augvSearch').addEventListener('input',e=>{
    search=e.target.value.trim().toLowerCase();
    renderGallery();$('augvGallery').scrollTop=0;
  });
  document.getElementById('openingClear')?.addEventListener('click',()=>{
    selected=[];$('augvSearch').value='';search='';render();
  });
  render();
  const done=()=>{$('augvLoadNote').textContent='';};
  fetch('./augments-set18.json?v=2',{cache:'default'}).then(response=>{
    if(!response.ok)throw new Error('HTTP '+response.status);
    return response.json();
  }).then(json=>{
    if(!json||!Array.isArray(json.entries)||json.entries.length<200)throw new Error('Katalog unvollständig');
    applyCatalog(json.entries);done();
  }).catch(()=>{
    applyCatalog(fallbackCatalog());
    $('augvLoadNote').innerHTML='<b>Hinweis:</b> Der große Symbolkatalog konnte nicht geladen werden. Es wird nur die kleinere, lokal hinterlegte Auswahl gezeigt. Bitte Seite neu laden.';
  });
})();
