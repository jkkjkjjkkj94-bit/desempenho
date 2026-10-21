(function(){
function init(){
 const style=document.createElement('style');
 style.textContent=`
:root{--bg:#f6f8fb;--line:#e8edf3}
body{background:var(--bg)}
main{padding-top:24px}
.sidebar{padding:14px 10px;border-right-color:#edf1f5}
.brand-icon{background:#0b3b6f;border-radius:11px}
.sidebar nav{gap:5px;margin-top:18px}
.nav{width:42px;height:42px;border-radius:10px;color:#7a8795;transition:.15s}
.nav.active,.nav:hover{background:#0b3b6f;color:#fff}
.nav:hover span{left:50px;background:#101827;border-radius:8px;padding:7px 10px;box-shadow:0 6px 20px rgba(15,23,42,.12)}
header{margin-bottom:16px;align-items:flex-start}
header>div:first-child{display:grid;grid-template-columns:auto auto;column-gap:18px;align-items:center}
header h1,header p{grid-column:1}
header h1{font-size:24px;letter-spacing:-.025em}
header .shift-switch{grid-column:2;margin-top:0}
header .shift-switch:nth-of-type(2){grid-column:2}
.shift-switch{background:#f0f4f8;border:1px solid #e5ebf1;padding:4px;border-radius:10px;gap:2px}
.shift-switch>span{margin:0 4px;font-size:9px}.shift-option{height:27px;border:0;background:transparent}.shift-option.active{background:#0b3b6f;border-color:#0b3b6f}
.card{border-color:#e7ecf2;box-shadow:none;border-radius:14px}
.filters{padding:9px 10px;gap:7px;border-color:#e7ecf2}.filters label{font-size:9px;color:#7c8796;margin-bottom:5px}.filters input,.filters .multi-trigger,.filters .primary,.filters .ghost{height:34px;border-radius:8px}
.kpis{gap:10px}.kpi{padding:15px 17px}.kpi span{font-size:10px}.kpi strong{font-size:24px;margin:8px 0 2px;letter-spacing:-.03em}
.grid2{gap:10px}.grid2>.card,.table-card{padding:17px}.card-head{margin-bottom:13px}.card-head h2{font-size:13px}
.rank-row{grid-template-columns:24px minmax(105px,1fr) 1.5fr 70px;min-height:38px;border-bottom:1px solid #f1f4f7}.rank-row:last-child{border-bottom:0}.rank-avatar{display:none!important}.rank-num{font-size:9px;color:#9aa4b2}.rank-row b{font-size:10px}.bar{height:4px;background:#edf1f5}.bar i{background:#0b3b6f}
.table-wrap{border-color:#edf1f5}th{background:#fafbfd}th,td{border-bottom-color:#f0f3f6}
.primary{background:#0b3b6f;border-color:#0b3b6f}.ghost{border-color:#dfe5ec}
.nav[data-page="paletes"],#paletes,#profileUzSummary{display:none!important}
@media(max-width:1050px){header>div:first-child{display:block}header .shift-switch{margin-top:9px}}
`;
 document.head.appendChild(style);
 function removeRankAvatars(){document.querySelectorAll('#ranking .rank-avatar').forEach(x=>x.remove())}
 const ranking=document.getElementById('ranking');if(ranking){removeRankAvatars();new MutationObserver(removeRankAvatars).observe(ranking,{childList:true,subtree:true})}
 function hideUz(){
  document.querySelector('.nav[data-page="paletes"]')?.remove();
  document.getElementById('paletes')?.setAttribute('aria-hidden','true');
  document.getElementById('profileUzSummary')?.remove();
  const type=document.getElementById('historyType');if(type){[...type.options].filter(o=>o.value==='UZ').forEach(o=>o.remove())}
  document.querySelectorAll('.admin-card,.action-card').forEach(el=>{const t=(el.textContent||'').toUpperCase();if(t.includes('CSV DE UZ')||t.includes('IMPORTAR UZ')||t.includes('EXPORTAR UZ'))el.style.display='none'});
  document.querySelectorAll('#historico p,.admin-card small').forEach(el=>{if((el.textContent||'').includes('UZ'))el.textContent=el.textContent.replace(/\s*e\s*UZ/gi,'').replace(/,?\s*UZ/gi,'')});
 }
 hideUz();new MutationObserver(hideUz).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();