
/* Accessible purpose tabs for the existing single-file TFT playbook.
 * We switch CSS visibility, not move/clone nodes, so state, input, event
 * delegation, tooltip popovers and storage keep working across tabs. */
(function(){
  'use strict';
  const tabs=[
    {id:'start',label:'Opening',sub:'Starter & rounds',title:'Play your opening',desc:'Pick your starter and follow the first rounds. Tap only what actually appears in your shop.',
      actions:[['Log a find','finds',1],['See next moves','next']]},
    {id:'next',label:'Next Move',sub:'Live priorities',title:'What should I look for next?',desc:'Recommendations recalculate from your champions, augments, items and current stage.',
      actions:[['Log a find','finds',1],['Compare augments','augments']]},
    {id:'finds',label:'My Finds',sub:'Log your board',title:'Record what you actually found',desc:'Select champions, components, items, artifacts, radiants or your real augment offers. Your choices stay saved.',
      actions:[['See updated plan','next',1],['Compare chosen offers','augments']]},
    {id:'augments',label:'Augments',sub:'Rank real offers',title:'Choose between the augments offered',desc:'Review your current three choices, their contextual fit, and the curated tier list.',
      actions:[['Enter my 3 offers','offers',1],['Back to opening','start']]},
    {id:'items',label:'Items',sub:'Gear & holders',title:'Items, crafting and holders',desc:'Compare completed items, Radiants, Artifacts, recipes and handoffs for your current carries.',
      actions:[['Log components','components',1],['Log an item','item']]},
    {id:'emblems',label:'Emblems',sub:'Optional pivots',title:'Emblem combinations',desc:'Only if you already found an emblem: explore creative holders, trait pivots and what to look for next.',
      actions:[['Back to opening','start'],['See builds','builds']]},
    {id:'builds',label:'Comps',sub:'Champion library',title:'Compositions and champions',desc:'Browse the full set of endgame directions, champion tiers and the routes suggested by your opening.',
      actions:[['Return to next move','next',1],['Log champions','units']]},
    {id:'strategy',label:'Strategy',sub:'Economy & notes',title:'Economy, endgame and notes',desc:'Leveling decisions, match-winning checks, your personal notes and saved match results.',
      actions:[['Go to my notes','notes',1],['Back to opening','start']]}
  ];
  const ids=new Set(tabs.map(x=>x.id));
  const bar=document.getElementById('tftTabs');
  const title=document.getElementById('tftTabTitle');
  const description=document.getElementById('tftTabDescription');
  const actions=document.getElementById('tftTabActions');
  const region=document.getElementById('tabWorkspace');
  if(!bar||!region)return;

  let active='start';
  const legacyHashes={
    overview:'start',guidedOpening:'start',opening:'finds',pickerDetails:'finds',
    deepDive:'augments',augmentTierBoard:'augments',
    nextPrimary:'next',nextFinds:'next',advancedRounds:'next',
    items:'items',valueTierBoard:'items',holderEarly:'items',
    guideEmblemPicker:'emblems',comps:'builds',champions:'builds',
    referenceLibrary:'builds',economy:'strategy',training:'strategy',notes:'strategy'
  };
  function tabForHash(){
    let h='';
    try{h=decodeURIComponent(location.hash.replace(/^#/,''));}catch(_){return null;}
    if(h.startsWith('tab-')&&ids.has(h.slice(4)))return h.slice(4);
    return legacyHashes[h]||null;
  }
  function setOpenState(tab){
    const deep=document.getElementById('deepDive');
    const library=document.getElementById('referenceLibrary');
    const picker=document.getElementById('pickerDetails');
    if(deep)deep.open=['augments','items','builds'].includes(tab);
    if(library)library.open=['items','builds','strategy'].includes(tab);
    if(picker)picker.open=tab==='finds';
  }
  function renderActions(config){
    actions.innerHTML=config.actions.map(function(a){
      return '<button type="button" data-tft-action="'+a[1]+'"'+(a[2]?' class="main"':'')+'>'+a[0]+'</button>';
    }).join('');
  }
  function activate(id,options={}){
    if(!ids.has(id))return;
    active=id;
    document.body.dataset.tftTab=id;
    const cfg=tabs.find(t=>t.id===id);
    title.textContent=cfg.title;
    description.textContent=cfg.desc;
    renderActions(cfg);
    bar.querySelectorAll('[data-tft-tab-button]').forEach(function(button){
      const selected=button.dataset.tftTabButton===id;
      button.setAttribute('aria-selected',String(selected));
      button.tabIndex=selected?0:-1;
      if(selected&&options.revealTab!==false)button.scrollIntoView({block:'nearest',inline:'nearest'});
    });
    region.setAttribute('aria-labelledby','tft-tab-'+id);
    setOpenState(id);
    if(!options.keepHash&&location.hash!=='#tab-'+id){
      try{history.replaceState(null,'','#tab-'+id);}catch(_){}
    }
    if(options.scroll!==false)window.scrollTo({top:0,behavior:'instant'});
    if(options.focusRegion)region.focus({preventScroll:true});
    return id;
  }
  function navigateAction(kind){
    if(kind==='offers'){
      if(window.TFTGuide?.openAugmentOffers){window.TFTGuide.openAugmentOffers();return;}
      activate('finds');window.TFTGuide?.showFinder?.('augment');return;
    }
    if(kind==='item'){activate('finds');window.TFTGuide?.showFinder?.('item');return;}
    if(kind==='components'){activate('finds');window.TFTGuide?.showFinder?.('component');return;}
    if(kind==='units'){activate('finds');window.TFTGuide?.showFinder?.('unit');return;}
    if(kind==='notes'){
      activate('strategy');
      document.getElementById('notes')?.scrollIntoView({behavior:'smooth',block:'start'});return;
    }
    activate(kind,{focusRegion:false});
  }
  window.switchTFTTab=activate;
  window.openTFTTab=activate;
  bar.addEventListener('click',function(event){
    const button=event.target.closest('[data-tft-tab-button]');if(!button)return;
    activate(button.dataset.tftTabButton);
  });
  bar.addEventListener('keydown',function(event){
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
    const current=bar.querySelector('[aria-selected="true"]');
    const index=Math.max(0,tabs.findIndex(t=>current?.dataset.tftTabButton===t.id));
    const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:
      (index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    event.preventDefault();
    activate(tabs[next].id);
    document.getElementById('tft-tab-'+tabs[next].id)?.focus();
  });
  actions.addEventListener('click',function(event){
    const button=event.target.closest('[data-tft-action]');if(button)navigateAction(button.dataset.tftAction);
  });
  window.addEventListener('hashchange',function(){
    const next=tabForHash();
    if(next&&next!==active)activate(next,{keepHash:true,scroll:false});
  });
  /* Existing section links and help actions should not leave content invisible. */
  document.addEventListener('click',function(event){
    const link=event.target.closest('a[href^="#"]');
    if(!link)return;
    const hash=link.getAttribute('href').slice(1),tab=legacyHashes[hash]||
      (hash.startsWith('tab-')&&ids.has(hash.slice(4))?hash.slice(4):null);
    if(tab)activate(tab,{keepHash:true,scroll:false});
  },true);
  let initial=tabForHash()||'start';
  activate(initial,{scroll:false,keepHash:true,revealTab:false});
  const targetId=location.hash.slice(1);
  if(legacyHashes[targetId])requestAnimationFrame(function(){
    const target=document.getElementById(targetId);if(target)target.scrollIntoView({block:'start'});
  });
})();
