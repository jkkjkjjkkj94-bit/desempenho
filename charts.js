let desempenhoCharts={};
function chartTheme(){return{borderColor:'#18181b',backgroundColor:'rgba(24,24,27,.08)',pointBackgroundColor:'#18181b',pointRadius:2,pointHoverRadius:4,tension:.28,fill:true}}
function destroyChart(name){if(desempenhoCharts[name]){desempenhoCharts[name].destroy();delete desempenhoCharts[name]}}
function renderDesempenhoCharts(){
 if(typeof Chart==='undefined'||typeof filteredRows==='undefined')return;
 const dailyCanvas=document.getElementById('dailyChart'),monthlyCanvas=document.getElementById('monthlyChart');
 if(!dailyCanvas||!monthlyCanvas)return;
 const daily={};filteredRows.forEach(r=>daily[r.data]=(daily[r.data]||0)+Number(r.caixas_separadas||0));
 const d=Object.entries(daily).sort((a,b)=>a[0].localeCompare(b[0])).slice(-31);
 destroyChart('daily');desempenhoCharts.daily=new Chart(dailyCanvas,{type:'line',data:{labels:d.map(x=>dateBR(x[0])),datasets:[{label:'Itens separados',data:d.map(x=>x[1]),...chartTheme()}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{maxTicksLimit:8}},y:{beginAtZero:true,grid:{color:'#f1f1f2'}}}}});
 const monthly={};filteredRows.forEach(r=>{const k=String(r.data||'').slice(0,7);if(k)monthly[k]=(monthly[k]||0)+Number(r.caixas_separadas||0)});
 const m=Object.entries(monthly).sort((a,b)=>a[0].localeCompare(b[0])).slice(-12);
 destroyChart('monthly');desempenhoCharts.monthly=new Chart(monthlyCanvas,{type:'bar',data:{labels:m.map(([k])=>{const[y,mo]=k.split('-');return mo+'/'+y}),datasets:[{label:'Itens separados',data:m.map(x=>x[1]),backgroundColor:'#27272a',borderRadius:5,maxBarThickness:42}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{beginAtZero:true,grid:{color:'#f1f1f2'}}}}});
}
window.addEventListener('DOMContentLoaded',()=>{const originalRender=window.render;window.render=function(){originalRender();requestAnimationFrame(renderDesempenhoCharts)};setTimeout(renderDesempenhoCharts,700)});
