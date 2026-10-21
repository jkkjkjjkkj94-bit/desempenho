(function(){
  async function fetchAllComplete(){
    setLoading(true);
    setConnection(true,'Carregando histórico completo...');
    try{
      const size=1000;
      let rows=[];
      let from=0;
      while(true){
        const {data,error}=await db.from('separacoes')
          .select('id,usuario,data,caixas_separadas')
          .order('data',{ascending:false})
          .order('id',{ascending:false})
          .range(from,from+size-1);
        if(error) throw error;
        const batch=data||[];
        rows.push(...batch);
        if(batch.length<size) break;
        from+=size;
      }
      const unique=new Map();
      rows.forEach(r=>unique.set(String(r.id),r));
      allRows=[...unique.values()];
      setConnection(true,'Conectado');
      populateUsers();
      if(typeof applyTeamFilters==='function' && (teamShift||teamBuilding)) applyTeamFilters();
      else applyFilters();
      if(document.getElementById('profileUser')?.value.trim()) renderProfile(document.getElementById('profileUser').value);
    }catch(e){
      console.error('Carregamento completo:',e);
      setConnection(false,'Erro de conexão');
      toast('Erro ao carregar histórico: '+e.message);
    }finally{
      setLoading(false);
    }
  }
  window.fetchAll=fetchAllComplete;
  document.addEventListener('DOMContentLoaded',()=>{
    const refresh=document.getElementById('refreshBtn');
    if(refresh) refresh.onclick=fetchAllComplete;
    setTimeout(fetchAllComplete,150);
  });
})();