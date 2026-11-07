
/* Guided TFT opening + optional emblem pivot explorer, Set 18 / patch 18.6.
 * Uses the original page's data/state; there is no second save system.
 * Suggestions are heuristics, not a live shop or win-rate feed. */
(function () {
  'use strict';
  var api = window.TFTGuide;
  var root = document.getElementById('guidedOpening');
  if (!api || !root) return;

  var ROUTES = [
    {id:'veigar', title:'Veigar / Ornn',label:'Cheap reroll',type:'AP',
      start:['Veigar','Ornn'],targets:['Veigar','Ornn','Alistar','LeBlanc'],
      desc:'Watch for Veigar + Ornn pairs. Do not force reroll with only one copy.',
      next:'Build toward Spellweaver / Elderwood only if the early copies arrive.',
      augments:['Epic Rolldown','Double Trouble']},
    {id:'blossom',title:'Blossom',label:'Flexible origin',type:'flex',
      start:['Karma','Yorick','Yunara'],targets:['Karma','Yorick','Yunara','Master Yi'],
      desc:'Karma and Yorick form a cheap start; Yunara can extend it.',
      next:'Stay open to Ahri or Master Yi later. Natural upgrades beat forcing a breakpoint.',
      augments:['Explosive Growth','Epoch']},
    {id:'riftbeast',title:'Riftbeast',label:'Early trait package',type:'AD',
      start:['Pebbles','Murkwolf','Gromp'],targets:['Pebbles','Murkwolf','Gromp','Krug'],
      desc:'Pebbles, Murkwolf and Gromp give you a practical early shopping list.',
      next:'Add Krug or stronger Riftbeasts if the shop supports it; do not chase an emblem.',
      augments:['Explosive Growth','Epic Rolldown']},
    {id:'fae',title:'Fae',label:'Two-unit splash',type:'flex',
      start:['Rakan','Xayah'],targets:['Rakan','Xayah','Tristana','Lillia'],
      desc:'Rakan + Xayah is a quick Fae (2). Tristana is a possible follow-up.',
      next:'Embiggen makes this more interesting, but two Fae can also stay a splash.',
      augments:['Embiggen','Frontline Foundation']},
    {id:'elderwood',title:'Elderwood',label:'Flexible frontline',type:'flex',
      start:['Ornn','Xayah','Alistar'],targets:['Ornn','Xayah','Alistar','Ezreal'],
      desc:'Use early Ornn, Xayah or Alistar upgrades as your anchor.',
      next:'Later, Ezreal or Aphelios may use your items if you have a stable board.',
      augments:["Nature's Shelter",'Frontline Foundation']},
    {id:'primal',title:'Primal',label:'AD / bruiser flex',type:'AD',
      start:['Vi','Nidalee','Sivir'],targets:['Vi','Nidalee','Sivir'],
      desc:'A Primal start can grow into physical damage if you find the units naturally.',
      next:'Beast Within is situationally appealing when your Primal core is already there.',
      augments:['Beast Within','Explosive Growth']}
  ];

  // Only Set 18 emblems. Riftbeast is intentionally NOT in this inventory.
  // Entries: trait, acquisition, suggested holders, natural early/core targets, two creative pivots.
  var EMBLEMS = [
    ['Blossom','Spatula + Rod',['Morgana','Sivir','Kennen'],['Karma','Yorick','Yunara','Master Yi','Ahri'],
      [['Blossom + Invoker','Morgana','Karma, Yorick, Ahri','AP flex with a strong caster holding the bonus.'],
       ['Blossom + physical carry','Sivir','Karma, Yunara, Sett','Try a physical carry as your extra Blossom rather than filling a slot with a weak unit.']]],
    ['Fae','Spatula + Sword',['Rengar','Sivir','Aphelios'],['Rakan','Xayah','Tristana','Lillia'],
      [['Fae + Sprykin','Rengar','Rakan, Xayah, Tristana','A damage dealer outside Fae can receive Pixie stats and healing.'],
       ['Fae + Rapidfire','Sivir','Rakan, Xayah, Tristana','Let an upgraded carry complete a Fae breakpoint.']]],
    ['Elderwood','Spatula + Vest',['Aphelios','Soraka','Fiddlesticks'],['Ornn','Xayah','Alistar','Ezreal'],
      [['Elderwood + Rapidfire','Aphelios','Xayah, Alistar, Ezreal','Aphelios shares Rapidfire with Xayah; use the emblem to reach more Elderwood.'],
       ['Elderwood + Executioner','Soraka','Ornn, Alistar, Ezreal','Add a caster without dropping the frontline.']]],
    ['Invoker','Frying Pan + Tear',['Ahri','Alune'],['Pebbles','Morgana','Sentinel','Teemo'],
      [['Invoker + Blossom','Ahri','Karma, Yorick, Morgana','Ahri gains mana regeneration and casts more often.'],
       ['Invoker + Vanguard','Alune','Morgana, Sentinel, Rakan','Build a protected magic carry behind an upgraded frontline.']]],
    ['Lunar','Spatula + Tear',["Kog'Maw",'Morgana','Kayle'],['Diana','Aphelios','Alune'],
      [['Lunar + Rapidfire',"Kog'Maw",'Diana, Aphelios','Give an outside attacker Lunar stats and help buff nearby allies.'],
       ['Lunar + AP','Morgana','Diana, Alune','A caster can benefit from the Lunar stat package.']]],
    ['Primal','Spatula + Gloves',['Ashe','Kennen'],['Vi','Nidalee','Sivir'],
      [['Primal + Hunter','Ashe','Vi, Nidalee, Sivir','An off-trait carry may let you activate another Blessing.'],
       ['Primal + flexible AP','Kennen','Vi, Sivir','Choose the holder that actually benefits from the Blessing.']]],
    ['Inferno','Spatula + Bow',['Ashe','Draven'],['Varus','Sejuani'],
      [['Inferno + Hunter','Ashe','Varus, Sejuani','An itemized attacker can help reach Inferno without another weak slot.'],
       ['Inferno + legendary AD','Draven','Varus, Sejuani','Late-game option only if your economy supports it.']]],
    ['Sprykin','Spatula + Cloak',['Rengar','Fiddlesticks'],['Teemo','Tristana','Rammus','Azir'],
      [['Sprykin + Fae','Rengar','Teemo, Tristana, Rakan','Select the emblem holder as the BFF rider to gain its rider bonus.'],
       ['Sprykin + Rammus','Fiddlesticks','Teemo, Rammus, Azir','Protect your carry with Rammus and add a useful outside unit.']]],
    ['Blackthorn','Spatula + Belt',['Yunara','Zyra','Brambleback'],[],
      [['Blackthorn + attack carry','Yunara','Get natural Blackthorn units','Use an outside damage dealer to benefit from sacrifice stats.']]],
    ['Brawler','Frying Pan + Belt',['Master Yi','Maokai'],['Krug','Alistar','Sett'],
      [['Brawler + Adaptor','Master Yi','Vi, Krug, Sett','Extra health powers the emblem on-hit damage and helps a melee carry survive.']]],
    ['Executioner','Frying Pan + Gloves',['Ahri','Zyra','Diana'],['Yunara','Ezreal','Soraka'],
      [['Executioner + Blossom','Ahri','Yunara, Ezreal, Soraka','A caster can gain an execute and reach a valuable Executioner breakpoint.'],
       ['Executioner + spell damage','Zyra','Yunara, Soraka','Try this on your strongest itemized spell carry.']]],
    ['Hunter','Frying Pan + Sword',['Nidalee','Elder Dragon'],['Tristana','Sivir','Ashe'],
      [['Hunter + Primal','Nidalee','Sivir, Vi','A takedown-oriented carry can snowball bonus attack damage.']]],
    ['Rapidfire','Frying Pan + Bow',['Brambleback',"Kog'Maw",'Ezreal'],['Xayah','Aphelios'],
      [['Rapidfire + Riftbeast','Brambleback','Pebbles, Murkwolf, Krug','Repeated attacks gain extra true damage; keep a strong frontline.'],
       ['Rapidfire + Lunar',"Kog'Maw",'Aphelios, Xayah','Use an itemized attacker with natural Rapidfire allies.']]],
    ['Ravager','Frying Pan + Cloak',['Elise','Rengar','Nidalee'],['Camille','Murkwolf','Diana','Brambleback'],
      [['Ravager + sustain','Elise','Camille, Murkwolf, Diana','The emblem rewards healing; best on a champion that can stay alive.'],
       ['Ravager + Primal','Nidalee','Vi, Murkwolf, Brambleback','A damage carry can use healing to stack damage amplification.']]],
    ['Spellweaver','Frying Pan + Rod',['Morgana'],['Veigar','Karma','Ahri'],
      [['Spellweaver + Invoker','Morgana','Veigar, Karma, Ahri','An off-trait caster gets extra mana as teammates cast.']]],
    ['Vanguard','Frying Pan + Vest',['Lillia','Fiddlesticks'],['Rakan','Sentinel'],
      [['Vanguard + Fae','Lillia','Rakan, Xayah, Sentinel','A durable outside frontline can complete a Vanguard breakpoint.']]],
    ['Coven','Elusive / cannot craft',['Fiddlesticks'],['Camille','Elise','Caitlyn'],
      [['Coven + spell carry','Fiddlesticks','Camille, Elise, Caitlyn','Only take this direction if you already have useful Coven units.']]],
    ['Defender','Elusive / cannot craft',['Rengar'],['Ornn','Leona','Shen'],
      [['Defender + melee carry','Rengar','Ornn, Leona, Shen','Use the extra defensive trait on a non-Defender with room for an emblem.']]],
    ['Flora Fatalis','Elusive / cannot craft',['Veigar','Cassiopeia'],[],
      [['Flora Fatalis + reroll','Veigar','Veigar, Cassiopeia','Specialist emblem: check its in-game interaction before committing.']]],
    ['Juggernaut','Elusive / cannot craft',['Rengar'],['Rakan','Yorick','Sett'],
      [['Juggernaut + frontline','Rengar','Rakan, Yorick, Sett','An extra melee holder can help you reach the next Juggernaut breakpoint.']]]
  ].map(function (a) {
    return {name:a[0],recipe:a[1],holders:a[2],natural:a[3],ideas:a[4]};
  });

  var STARTERS = ['Veigar','Ornn','Karma','Yorick','Pebbles','Murkwolf','Rakan','Xayah','Kayle','Teemo','Alistar','Leona','Yunara','Gromp'];
  var ROUND_TEXT = {
    '2-1':'Choose your first augment from the offers you actually saw. Play your strongest upgraded unit; note pairs and items before committing.',
    '2-2':'Look for one reliable frontline and one damage dealer. Buy promising pairs; do not burn gold chasing a single name.',
    '2-3':'Check your natural pairs and 2★ upgrades. Slam a useful item if it protects your streak or saves health.',
    '2-4':'Carousel: take a component that makes an immediately useful item. Avoid forcing a full late-game composition.',
    '3-1':'Keep your strongest board, prepare for Level 6 and note which opener has delivered real upgrades.',
    '3-2':'Second augment round: compare your real three offers with current items, board, and economy.',
    '3-3':'Commit to a reroll line only with enough copies, health, gold, and no heavy contest. Otherwise prepare for Level 7/8.'
  };
  var TOP_ROUNDS = ['2-1','2-2','2-3','2-4','3-1','3-2','3-3'];

  function escape(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }
  function el(id) { return document.getElementById(id); }
  function ostate(){var o=api.openingState();if(!Array.isArray(o.emblems))o.emblems=[];return o;}
  function persist(){api.save();api.renderOpening();}
  function owned(o,name){return o.units.find(function(u){return u.name===name;});}
  function icon(name){return '<img src="'+escape(api.championImg(name))+'" alt="" loading="lazy" onerror="this.remove()">';}
  function routeScore(r,o){
    var score=ROUTES.length-ROUTES.indexOf(r);
    if(o.openingSignal===r.id)score+=24;
    if(o.starter&&r.start.includes(o.starter))score+=10;
    o.units.forEach(function(u){
      if(r.targets.includes(u.name))score+=7+(u.stars-1)*5;
    });
    o.augments.forEach(function(a){if(r.augments.includes(a))score+=8;});
    o.items.forEach(function(n){var i=api.getItem(n);if(i && (i[3]===r.type))score+=2;});
    return score;
  }
  function routes(o){return ROUTES.slice().sort(function(a,b){return routeScore(b,o)-routeScore(a,o);});}
  function addFound(name){
    var o=ostate();
    if(!owned(o,name))o.units.push({name:name,stars:1});
    else {el('guideFeedback').textContent=name+' is already logged. Use the 2★ button when you actually complete the upgrade.';return;}
    if(!o.starter)o.starter=name;
    persist();
  }
  function setStarter(name){
    var o=ostate();
    o.starter=name;
    if(!owned(o,name))o.units.push({name:name,stars:1});
    persist();
  }
  function setFocus(id){
    var o=ostate();
    o.openingSignal=o.openingSignal===id?'':id;
    persist();
  }
  function markTwoStar(name) {
    var o=ostate(),unit=owned(o,name);
    if(!unit)return;
    unit.stars=Math.max(2,unit.stars);
    persist();
  }
  function setRound(stage,round){
    var o=ostate();
    o.stage=String(stage);o.round=Number(round);
    if(!o.levelManual)o.level=api.levelForRound(o.stage,o.round);
    persist();
  }
  function advanceRound(){
    var o=ostate(),s=Number(o.stage),r=Number(o.round);
    if(s>=6&&r>=7)return;
    if(r>=7){s=Math.min(6,s+1);r=1;} else r+=1;
    setRound(s,r);
  }
  function renderRounds(o){
    var label=o.stage+'-'+o.round;
    el('guideRoundNow').textContent='Round '+label+' · Level '+o.level;
    el('guideRoundPills').innerHTML=TOP_ROUNDS.map(function(v){
      return '<button type="button" data-guide-round="'+v+'" class="'+(label===v?'active':'')+'" aria-pressed="'+(label===v)+'">'+v+'</button>';
    }).join('')+'<button type="button" data-guide-advance="1" class="guide-action primary">Next round →</button>';
    el('guideRoundBrief').textContent=ROUND_TEXT[label]||
      (Number(o.stage)>=4?'Midgame: stabilize upgrades and check your economy before pushing a higher level.':
        'Find upgrades naturally; keep your economy and damage items flexible.');
  }
  function renderStarters(o){
    el('guideStarters').innerHTML=STARTERS.map(function(name){
      var have=owned(o,name),active=o.starter===name;
      return '<button type="button" class="guide-starter'+(active?' active':have?' owned':'')+'" data-guide-starter="'+escape(name)+'" aria-pressed="'+active+'">'+icon(name)+
        '<span>'+escape(name)+'</span><small>'+(active?'My starter':have?'Already found':api.holderCost(name)+'g champion')+'</small></button>';
    }).join('');
    el('guideStarterStatus').textContent=o.starter?
      'Starter: '+o.starter+'. This champion is recorded as owned; choose a different one if needed.':
      'Click the champion you started with. You can also add any other unit below.';
  }
  function renderRoutes(o){
    var top=routes(o).slice(0,3);
    el('guideRoutes').innerHTML=top.map(function(r,i){
      var hit=o.units.filter(function(u){return r.targets.includes(u.name);});
      var active=o.openingSignal===r.id,buttons=r.targets.slice(0,4).map(function(name){
        var unit=owned(o,name);
        return '<button type="button" class="guide-target" '+(unit&&unit.stars>=2?'disabled':'data-guide-found="'+escape(name)+'"')+
          (unit&&unit.stars===1?' data-guide-two-star="'+escape(name)+'"':'')+'>'+
          icon(name)+'<span>'+(unit?unit.stars>=2?escape(name)+' '+unit.stars+'★ owned':'I made '+escape(name)+' 2★':'I found '+escape(name))+'</span></button>';
      }).join('');
      return '<article class="guide-route'+(active?' selected':'')+'"><div class="guide-route-top"><span class="guide-route-badge">'+
        (i===0?'BEST FIT TO YOUR FINDS':escape(r.label))+'</span><span class="guide-route-badge">'+hit.length+' found</span></div>'+
        '<h4>'+escape(r.title)+'</h4><p>'+escape(r.desc)+'</p>'+
        '<button type="button" class="guide-route-choice'+(active?' active':'')+'" data-guide-focus="'+escape(r.id)+'">'+
        (active?'✓ Following this idea':'Explore this direction')+'</button>'+
        '<div class="guide-target-buttons">'+buttons+'</div><div class="guide-signal-note">'+escape(r.next)+'</div></article>';
    }).join('');
    el('guideFeedback').textContent='These are things to notice in the shop—not guarantees. Only click a champion you actually found or upgraded.';
  }
  function augRank(o){
    return api.augmentHints.filter(function(a){return !a.inactive&&['S','A','B'].includes(a.tier);})
      .map(function(a){return {a:a,result:api.augmentMatch(a,o)};})
      .sort(function(x,y){return y.result.score-x.result.score;});
  }
  function chooseAugment(name){
    var o=ostate();
    if(o.augments.includes(name))return;
    if(o.augments.length>=3){el('guideAugmentNote').textContent='Three Augments are already recorded. Remove one in the full picker first.';return;}
    o.augments.push(name);
    o.augmentOffers=[];
    persist();
  }
  function renderAugments(o){
    var offered=o.augmentOffers.length>0;
    var candidates=offered?
      o.augmentOffers.map(function(id){var a=api.augmentMeta(id);return a?{a:a,result:api.augmentMatch(a,o)}:null;}).filter(Boolean)
       .sort(function(a,b){return b.result.score-a.result.score;}):
      augRank(o).slice(0,3);
    el('guideAugmentHeading').textContent=offered?'Your actual augment offers':'Augments worth noticing if offered';
    el('guideAugmentSub').textContent=offered?
      o.augmentOffers.length+' of 3 offers logged · ranked for your actual opening':
      'Examples only. The right choice depends on the three offers you see in-game.';
    el('guideAugments').innerHTML=candidates.map(function(r,i){
      var a=r.a;
      return '<div class="guide-augment">'+
        api.augmentImgTag(a.id)+
        '<div><b>'+(offered?(i+1)+'. ':'')+escape(a.id)+'</b><small>'+
        escape(a.rarity+' · '+a.tier+' tier · '+(r.result.why[0]||a.desc))+'</small></div>'+
        (offered?'<button type="button" class="guide-action" data-guide-take="'+escape(a.id)+'">Take</button>':
          '<strong>'+escape(a.tier)+' tier</strong>')+
        '</div>';
    }).join('');
    el('guideAugmentNote').textContent=offered?
      'These are heuristic comparisons, not win-rate estimates. Compare your complete board before taking the top option.':
      'You cannot pick an augment unless the game offers it. Record all three for a meaningful comparison.';
    var chosen=o.augments.length?('Chosen: '+o.augments.join(', ')):'No augment chosen yet.';
    el('guideChosenAugments').textContent=chosen;
  }
  function emblemIcon(name){
    var file='DA_18_Emblem'+name.replace(/\s+/g,'')+'.webp';
    return '<img src="https://hexcomps.com/img/items/'+escape(file)+'" alt="" loading="lazy" onerror="this.remove()">';
  }
  function renderEmblemPicker(o){
    var q=(el('guideEmblemSearch').value||'').trim().toLowerCase(),count={};
    o.emblems.forEach(function(n){count[n]=(count[n]||0)+1;});
    el('guideEmblemGrid').innerHTML=EMBLEMS.filter(function(e){return !q||e.name.toLowerCase().includes(q);})
      .map(function(e){var n=count[e.name]||0;return '<button type="button" class="guide-emblem" data-guide-emblem="'+escape(e.name)+'" aria-pressed="'+(n>0)+'" title="'+escape(e.recipe)+'">'+
        emblemIcon(e.name)+'<span>'+escape(e.name)+'<br><small>'+(n?'Owned ×'+n:e.recipe)+'</small></span></button>';}).join('');
  }
  function emblemIdeaScore(idea,e,o){
    var score=0,unit=owned(o,idea[1]);
    if(unit)score+=8+unit.stars*2;
    e.natural.forEach(function(n){if(owned(o,n))score+=4;});
    idea[2].split(',').forEach(function(n){if(owned(o,n.trim()))score+=3;});
    if(o.starter&&idea[2].includes(o.starter))score+=4;
    return score;
  }
  function renderEmblemIdeas(o){
    var count={};o.emblems.forEach(function(n){count[n]=(count[n]||0)+1;});
    var chosen=Object.keys(count);
    el('guideEmblemChips').innerHTML=chosen.map(function(n){
      return '<span class="guide-emblem-chip">'+escape(n)+' Emblem ×'+count[n]+
        '<button type="button" data-guide-emblem-remove="'+escape(n)+'" title="Remove one '+escape(n)+'" aria-label="Remove one '+escape(n)+'">−</button>'+
        '<button type="button" data-guide-emblem-add="'+escape(n)+'" title="Add a second '+escape(n)+'" aria-label="Add one '+escape(n)+'">+</button></span>';
    }).join('');
    if(!chosen.length){
      el('guideEmblemIdeas').innerHTML='';
      el('guideEmblemFollowUp').innerHTML='';
      el('guideEmblemStatus').textContent='No emblem selected. This section does not recommend chasing or crafting one.';
      return;
    }
    var ideas=[];
    chosen.forEach(function(n){
      var e=EMBLEMS.find(function(x){return x.name===n;});
      if(!e)return;
      e.ideas.forEach(function(idea){ideas.push({e:e,idea:idea,score:emblemIdeaScore(idea,e,o)});});
    });
    ideas.sort(function(a,b){var selected=o.emblemPlan||'';var sa=a.e.name+'::'+a.idea[0]===selected?1:0,sb=b.e.name+'::'+b.idea[0]===selected?1:0;return sb-sa||b.score-a.score;});
    el('guideEmblemStatus').textContent=chosen.length+' emblem type'+(chosen.length===1?'':'s')+
      ' logged. These are possible pivots because you already have an emblem—not shopping goals.';
    el('guideEmblemIdeas').innerHTML=ideas.slice(0,4).map(function(x){
      var e=x.e,idea=x.idea,holder=idea[1],already=owned(o,holder),natural=e.natural.filter(function(n){return owned(o,n);});
      var desired=idea[2].split(',').map(function(s){return s.trim();})
        .filter(function(n){return n&&!/^(get|find) /i.test(n)&&!owned(o,n);}).slice(0,3);
      var planId=e.name+'::'+idea[0],active=o.emblemPlan===planId;
      return '<article class="guide-emblem-idea'+(active?' chosen':'')+'"><div class="guide-step">'+escape(e.name)+' EMBLEM · '+(active?'YOUR CHOSEN COMBO':'IDEA')+'</div>'+
        '<h4>'+escape(idea[0])+'</h4><p>'+escape(idea[3])+'</p>'+
        '<p><b>Try on:</b> '+escape(holder)+(already?' · you own this unit':' · later if found')+'</p>'+
        (natural.length?'<small>Matching units you logged: '+escape(natural.join(', '))+'</small>':
          '<small>Check your natural '+escape(e.name)+' units before committing.</small>')+
        '<div class="guide-idea-actions"><button type="button" data-guide-emblem-plan="'+escape(planId)+'" class="guide-action primary">'+(active?'✓ Following combo':'Try this combo')+'</button>'+desired.map(function(n){return '<button type="button" data-guide-found="'+escape(n)+'">I found '+escape(n)+'</button>';}).join('')+
        '<button type="button" data-guide-emblem-learn="'+escape(e.name)+'">Why this?</button></div></article>';
    }).join('');
    var selected=ideas.find(function(x){return x.e.name+'::'+x.idea[0]===o.emblemPlan;});
    if(selected){
      var e=selected.e,idea=selected.idea,needed=idea[2].split(',').map(function(s){return s.trim();})
        .filter(function(n){return n&&!/^(get|find) /i.test(n)&&!owned(o,n);}).slice(0,4);
      var holder=idea[1];
      el('guideEmblemFollowUp').innerHTML='<div class="guide-panel-header"><div><div class="guide-step">YOUR CHOSEN PIVOT</div><h3>'+escape(idea[0])+'</h3>'+
        '<p>Next, look for natural trait pieces and a suitable non-trait holder. Do not buy a weak unit solely for the emblem.</p></div>'+
        '<button type="button" class="guide-action" data-guide-emblem-unfocus="1">Change plan</button></div>'+
        '<div class="guide-actions">'+needed.map(function(n){
          return '<button class="guide-action" type="button" data-guide-found="'+escape(n)+'">I found '+escape(n)+'</button>';
        }).join('')+(owned(o,holder)?'<span class="guide-round-now">Holder '+escape(holder)+' already owned</span>':
          '<button class="guide-action" data-guide-found="'+escape(holder)+'">I found holder '+escape(holder)+'</button>')+'</div>'+
        '<p class="guide-warning">A possible route, not a guaranteed breakpoint. Double-check how many natural '+escape(e.name)+' units you can field at your current level.</p>';
    }else el('guideEmblemFollowUp').innerHTML='';
  }
  function render(){
    var o=ostate();
    renderRounds(o);
    renderStarters(o);
    renderRoutes(o);
    renderAugments(o);
    renderEmblemPicker(o);
    renderEmblemIdeas(o);
    // The old inventory strip and counts must include emblems, too.
    var old=el('nextFinds');
    if(old&&o.emblems.length){
      var count={};o.emblems.forEach(function(n){count[n]=(count[n]||0)+1;});
      old.insertAdjacentHTML('beforeend',Object.keys(count).map(function(n){
        return '<span class="next-find artifact"><span class="next-find-art">'+emblemIcon(n)+'</span>'+
          '<span class="name">'+escape(n)+' Emblem ×'+count[n]+'</span>'+
          '<button type="button" data-guide-emblem-remove="'+escape(n)+'" aria-label="Remove '+escape(n)+' emblem">−</button></span>';
      }).join(''));
    }
  }
  root.addEventListener('click',function(ev){
    var b=ev.target.closest('button');
    if(!b)return;
    if(b.dataset.guideStarter){setStarter(b.dataset.guideStarter);return;}
    if(b.dataset.guideFocus){setFocus(b.dataset.guideFocus);return;}
    if(b.dataset.guideFound){
      if(b.dataset.guideTwoStar)markTwoStar(b.dataset.guideTwoStar);
      else addFound(b.dataset.guideFound);
      return;
    }
    if(b.dataset.guideRound){var parts=b.dataset.guideRound.split('-');setRound(Number(parts[0]),Number(parts[1]));return;}
    if(b.dataset.guideAdvance){advanceRound();return;}
    if(b.dataset.guideOffer){api.openAugmentOffers();return;}
    if(b.dataset.guideTake){chooseAugment(b.dataset.guideTake);return;}
    if(b.dataset.guideEmblem){var o=ostate();o.emblems.push(b.dataset.guideEmblem);persist();return;}
    if(b.dataset.guideEmblemAdd){var o=ostate();o.emblems.push(b.dataset.guideEmblemAdd);persist();return;}
    if(b.dataset.guideEmblemRemove){var o=ostate(),i=o.emblems.indexOf(b.dataset.guideEmblemRemove);if(i>=0)o.emblems.splice(i,1);persist();return;}
    if(b.dataset.guideEmblemPlan){var o=ostate();o.emblemPlan=b.dataset.guideEmblemPlan;persist();return;}
    if(b.dataset.guideEmblemUnfocus){var o=ostate();o.emblemPlan='';persist();return;}
    if(b.dataset.guideEmblemLearn){var m=EMBLEMS.find(function(x){return x.name===b.dataset.guideEmblemLearn;});if(m)el('guideEmblemStatus').textContent=m.name+' Emblem: '+m.recipe+'. Try '+m.holders.join(' or ')+'. A useful holder must not already have the trait. Only commit if you can reach a meaningful breakpoint.';return;}
    if(b.dataset.guideAllChamps){api.showFinder('unit');return;}
    if(b.dataset.guideDetails){api.showFinder('component');return;}
  });
  el('guideEmblemSearch').addEventListener('input',function(){renderEmblemPicker(ostate());});
  var oldFinds=el('nextFinds');
  if(oldFinds)oldFinds.addEventListener('click',function(e){
    var b=e.target.closest('[data-guide-emblem-remove]');if(!b)return;
    var o=ostate(),i=o.emblems.indexOf(b.dataset.guideEmblemRemove);
    if(i>=0)o.emblems.splice(i,1);
    persist();
  });
  window.renderGuidedOpening=render;
  render();
})();
