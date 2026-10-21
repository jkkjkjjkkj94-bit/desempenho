(function(){
  function moveSemProducaoToDashboard(){
    const dashboard=document.getElementById('dashboard');
    const card=document.getElementById('semProducaoCard');
    if(!dashboard||!card)return;
    const tableCard=dashboard.querySelector('.table-card');
    if(tableCard) dashboard.insertBefore(card,tableCard);
    else dashboard.appendChild(card);
    const title=card.querySelector('h2');
    const info=document.getElementById('semProducaoInfo');
    if(title) title.textContent='Usuários sem produção';
    if(info&&!info.textContent.trim()) info.textContent='Verificando usuários sem produção no período selecionado...';
    if(typeof renderTeamExtras==='function') renderTeamExtras();
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(moveSemProducaoToDashboard,0));
  }else{
    setTimeout(moveSemProducaoToDashboard,0);
  }
  window.moveSemProducaoToDashboard=moveSemProducaoToDashboard;
})();