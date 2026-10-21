(function(){
function renderAllUsers(){
  const root=document.getElementById('ranking');
  if(!root||typeof filteredRows==='undefined')return;
  const sums={};
  filteredRows.forEach(r=>{const u=String(r.usuario||'').trim();if(u)sums[u]=(sums[u]||0)+Number(r.caixas_separadas||0)});
  const arr=Object.entries(sums).sort((a,b)=>b[1]-a[1]);
  const max=arr[0]?.[1]||1;
  root.innerHTML=arr.length?arr.map(([u,v],i)=>`<div class="rank-row rank-click" data-user="${typeof escapeHtml==='function'?escapeHtml(u):u}"><span class="rank-num">${i+1}</span><b>${typeof escapeHtml==='function'?escapeHtml(u):u}</b><div class="bar"><i style="width:${Math.max(3,v/max*100)}%"></i></div><span class="rank-value">${typeof nf!=='undefined'?nf.format(v):v}</span></div>`).join(''):'<div class="empty">Nenhum usuário com produção no período.</div>';
  root.querySelectorAll('.rank-click').forEach(el=>el.onclick=()=>{if(typeof openUserProfile==='function')openUserProfile(el.dataset.user)});
  const card=root.closest('.card');
  const title=card?.querySelector('.card-head h2');
  const desc=card?.querySelector('.card-head p');
  if(title)title.textContent='Usuários com produção';
  if(desc)desc.textContent=`${arr.length} usuário${arr.length===1?'':'s'} com separação nos filtros selecionados`;
}
function hook(){
  window.renderRanking=renderAllUsers;
  if(typeof window.render==='function'&&!window.__allUsersRankingHooked){
    const original=window.render;
    window.render=function(){original();requestAnimationFrame(renderAllUsers)};
    window.__allUsersRankingHooked=true;
  }
  requestAnimationFrame(renderAllUsers);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
})();