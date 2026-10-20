const EQUIPE=[
{nome:'ADELAIDE SPIES',id:'adelaide.spies',turno:'T1',edificio:'PROMO'},
{nome:'ALINE APARECIDA VIEIRA MATOS',id:'',turno:'T1',edificio:'PROMO'},
{nome:'ANA CRISTINA DA SILVA CUCHEIRA',id:'ana.cucheira',turno:'T1',edificio:'CAIXAS'},
{nome:'ANA LUCIA ZAKARIAN MENEGHEL',id:'ana.meneghel',turno:'T1',edificio:'CAIXAS'},
{nome:'ANA PAULA VANI ROCHA',id:'ana.paula',turno:'T1',edificio:'CAIXAS'},
{nome:'BRUNA POLIANE FONTOURA',id:'bruna.fontoura',turno:'T1',edificio:'CAIXAS'},
{nome:'BRUNO HENRIQUE KOSKOSKI PAULO',id:'bruno.koskoski',turno:'T1',edificio:'CAIXAS'},
{nome:'DAINANE VIRGÍLIO ALCANTARA',id:'daiane.alcantara',turno:'T1',edificio:'CAIXAS'},
{nome:'ESTELA APARECIDA DOS SANTOS',id:'estela.santos',turno:'T1',edificio:'CAIXAS'},
{nome:'EVELIN DE OLIVEIRA LUZ',id:'evelin.luz',turno:'T1',edificio:'PROMO'},
{nome:'FELIPE NIVALDO BIAZAN DOS SANTOS OLIVEIRA',id:'felipe.nivaldo',turno:'T1',edificio:'CAIXAS'},
{nome:'FERNANDO ALMEIDA DOS SANTOS',id:'fernando.santos',turno:'T1',edificio:'CAIXAS'},
{nome:'GABRIEL SOUZA CARDOSO',id:'gabriel.cardoso',turno:'T1',edificio:'CAIXAS'},
{nome:'GABRIELI AGOSTINHO',id:'',turno:'T1',edificio:'CAIXAS'},
{nome:'JAINE APARECIDA DE MESQUITA',id:'jaine.apare',turno:'T1',edificio:'CAIXAS'},
{nome:'JANE',id:'jane.demetrio',turno:'T1',edificio:'CAIXAS'},
{nome:'JOÃO VICTOR FERREIRA DOMINGUES',id:'joão.domingues',turno:'T1',edificio:'CAIXAS'},
{nome:'LUCAS HENRIQUE DA SILVA CORREIA',id:'lucas.silva',turno:'T1',edificio:'CAIXAS'},
{nome:'LUCIANE CASSIANO',id:'luciane.cassiano',turno:'T1',edificio:'CAIXAS'},
{nome:'MISAEL DAVID GODINHO',id:'misael.godinho',turno:'T1',edificio:'CAIXAS'},
{nome:'MURILO WAGNER PORTELLA DE OLIVEIRA',id:'murilo.portella',turno:'T1',edificio:'CAIXAS'},
{nome:'NAELLY SILVEIRA DOS SANTOS',id:'',turno:'T1',edificio:'CAIXAS'},
{nome:'OSCAR GOMES NOGUEIRA',id:'OSCAR.GOMES',turno:'T1',edificio:'CAIXAS'},
{nome:'PAULO HENRIQUE OLIVEIRA ARAUJO',id:'paulo.oliveira',turno:'T1',edificio:'CAIXAS'},
{nome:'PEDRO AUGUSTO RODRIGUES FERRAZ',id:'pedro.ferraz',turno:'T1',edificio:'CAIXAS'},
{nome:'RAYSSA',id:'rayssa.fernandes',turno:'T1',edificio:'CAIXAS'},
{nome:'RENATA APARECIDA SILVA',id:'',turno:'T1',edificio:'CAIXAS'},
{nome:'SABRINA CARDOSO DA SILVA',id:'sabrina.cardoso',turno:'T1',edificio:'CAIXAS'},
{nome:'SILVIO TADEU NOGUEIRA',id:'',turno:'T1',edificio:'CAIXAS'},
{nome:'SIMONE APARECIDA DE CAMARGO',id:'simone.camargo',turno:'T1',edificio:'PROMO'},
{nome:'STEPHANI SABRINA DE SOUZA',id:'',turno:'T1',edificio:'CAIXAS'},
{nome:'THAMIRES TUANE DOS SANTOS',id:'thamiris.martins',turno:'T1',edificio:'CAIXAS'},
{nome:'VITOR SALVADOR DE SOUZA SANTOS',id:'vitor.santos',turno:'T1',edificio:'CAIXAS'},
{nome:'VIVIAN HIPOLITO DOS SANTOS',id:'vivian.santos',turno:'T1',edificio:'PROMO'},
{nome:'VIVIANE DE FATIMA RODRIGUES',id:'viviane.rodrigues',turno:'T1',edificio:'CAIXAS'}
];
const equipeNorm=s=>String(s||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let turnoAtivo='',edificioAtivo='';
function equipePermitida(p){return(!turnoAtivo||p.turno===turnoAtivo)&&(!edificioAtivo||p.edificio===edificioAtivo)}
function renderEquipe(q=''){const body=document.getElementById('teamRows'),info=document.getElementById('teamInfo');if(!body)return;const query=equipeNorm(q);const rows=EQUIPE.filter(p=>equipePermitida(p)&&(!query||equipeNorm(p.nome).includes(query)||equipeNorm(p.id).includes(query)||equipeNorm(p.turno).includes(query)||equipeNorm(p.edificio).includes(query)));body.innerHTML=rows.map(p=>`<tr><td>${p.nome}</td><td>${p.id||'<span class="no-id">ID não informado</span>'}</td><td><span class="shift-badge">${p.turno}</span></td><td><span class="shift-badge">${p.edificio}</span></td></tr>`).join('');if(info){const filtros=[turnoAtivo,edificioAtivo].filter(Boolean).join(' • ');info.textContent=`${rows.length} pessoas encontradas${filtros?' em '+filtros:''}`}}
function aplicarFiltrosEquipe(){if(typeof applyFilters==='function')applyFilters()}
document.addEventListener('DOMContentLoaded',()=>{
 const shift=document.getElementById('shiftSwitch');
 if(shift&&!document.getElementById('buildingSwitch')){const box=document.createElement('div');box.className='shift-switch';box.id='buildingSwitch';box.innerHTML='<span>Visualizar edifício</span><button type="button" class="shift-option active" data-building="">Todos</button><button type="button" class="shift-option" data-building="PROMO">Promo</button><button type="button" class="shift-option" data-building="CAIXAS">Caixas</button>';shift.insertAdjacentElement('afterend',box)}
 const head=document.querySelector('.team-table thead tr');if(head&&!head.querySelector('[data-building-head]'))head.insertAdjacentHTML('beforeend','<th data-building-head>Edifício</th>');
 const search=document.getElementById('teamSearch');if(search){search.placeholder='Buscar nome, ID, turno ou edifício...';search.addEventListener('input',()=>renderEquipe(search.value))}
 if(typeof applyFilters==='function'){applyFilters=function(){const s=document.getElementById('filterStart')?.value||'',e=document.getElementById('filterEnd')?.value||'';const permitidos=new Set(EQUIPE.filter(equipePermitida).map(p=>equipeNorm(p.id)).filter(Boolean));const filtroEquipe=Boolean(turnoAtivo||edificioAtivo);filteredRows=allRows.filter(r=>(!filtroEquipe||permitidos.has(equipeNorm(r.usuario)))&&(!selectedUsers.size||selectedUsers.has(r.usuario))&&(!s||r.data>=s)&&(!e||r.data<=e));render()}}
 const shiftButtons=document.querySelectorAll('#shiftSwitch .shift-option');shiftButtons.forEach(btn=>btn.addEventListener('click',()=>{shiftButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');turnoAtivo=btn.dataset.shift||'';aplicarFiltrosEquipe();renderEquipe(search?.value||'')}));
 const buildingButtons=document.querySelectorAll('#buildingSwitch .shift-option');buildingButtons.forEach(btn=>btn.addEventListener('click',()=>{buildingButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');edificioAtivo=btn.dataset.building||'';aplicarFiltrosEquipe();renderEquipe(search?.value||'')}));
 const clear=document.getElementById('clearFilters');if(clear)clear.addEventListener('click',()=>{turnoAtivo='';edificioAtivo='';shiftButtons.forEach(b=>b.classList.toggle('active',!b.dataset.shift));buildingButtons.forEach(b=>b.classList.toggle('active',!b.dataset.building));renderEquipe(search?.value||'')});
 renderEquipe();
 // Carregamento rápido: exibe o último snapshot imediatamente e atualiza com o Supabase em segundo plano.
 if(typeof fetchAll==='function'){
  const originalFetchAll=fetchAll;
  fetchAll=async function(){
   try{const cache=localStorage.getItem('desempenho_cache_v1');if(cache&&!allRows.length){const parsed=JSON.parse(cache);if(Array.isArray(parsed.rows)&&parsed.rows.length){allRows=parsed.rows;populateUsers();applyFilters();setConnection(true,'Atualizando...')}}}catch(e){}
   await originalFetchAll();
   try{localStorage.setItem('desempenho_cache_v1',JSON.stringify({savedAt:Date.now(),rows:allRows}))}catch(e){}
  }
 }
 // Gráficos de evolução diária e mensal, criados sem ocupar espaço quando não há dados.
 const ranking=document.getElementById('ranking')?.closest('.grid2');
 if(ranking&&!document.getElementById('dailyChart')){const charts=document.createElement('div');charts.className='grid2';charts.innerHTML='<article class="card" style="padding:19px"><div class="card-head"><div><h2>Evolução diária</h2><p>Últimos 31 dias com produção</p></div></div><div style="height:260px"><canvas id="dailyChart"></canvas></div></article><article class="card" style="padding:19px"><div class="card-head"><div><h2>Evolução mensal</h2><p>Comparativo dos últimos 12 meses</p></div></div><div style="height:260px"><canvas id="monthlyChart"></canvas></div></article>';ranking.insertAdjacentElement('afterend',charts)}
 const chartLib=document.createElement('script');chartLib.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';chartLib.onload=()=>{const s=document.createElement('script');s.src='charts.js?v=20261020-1';document.body.appendChild(s)};document.body.appendChild(chartLib);
});