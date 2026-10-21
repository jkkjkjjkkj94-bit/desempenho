(function(){
  let loadingComplete=false;
  async function fetchAllComplete(){
    if(loadingComplete)return;
    loadingComplete=true;
    setLoading(true);
    setConnection(true,'Carregando todos os dados...');
    try{
      const size=1000;
      const {count,error:countError}=await db.from('separacoes').select('id',{count:'exact',head:true});
      if(countError)throw countError;
      const expected=Number(count||0);
      const rows=[];
      let from=0;
      while(from<expected){
        const {data,error}=await db.from('separacoes')
          .select('id,usuario,data,caixas_separadas')
          .order('data',{ascending:true})
          .order('id',{ascending:true})
          .range(from,Math.min(from+size-1,expected-1));
        if(error)throw error;
        const batch=data||[];
        if(!batch.length)break;
        rows.push(...batch);
        from+=batch.length;
      }
      const unique=new Map();
      rows.forEach(r=>unique.set(String(r.id),r));
      if(unique.size!==expected){
        throw new Error(`Carregamento incompleto: ${unique.size} de ${expected} registros recebidos.`);
      }
      allRows=[...unique.values()].sort((a,b)=>String(b.data).localeCompare(String(a.data))||Number(b.id)-Number(a.id));
      setConnection(true,`Conectado · ${nf.format(allRows.length)} registros`);
      populateUsers();
      if(typeof applyTeamFilters==='function'&&(teamShift||teamBuilding))applyTeamFilters();else applyFilters();
      if(document.getElementById('profileUser')?.value.trim())renderProfile(document.getElementById('profileUser').value);
      if(typeof window.renderAusencias==='function')window.renderAusencias();
      if(typeof window.updateProductivityMetric==='function')window.updateProductivityMetric();
    }catch(e){
      console.error('Carregamento completo:',e);
      setConnection(false,'Erro de conexão');
      toast('Erro ao carregar todos os dados: '+e.message);
    }finally{
      loadingComplete=false;
      setLoading(false);
    }
  }
  window.fetchAll=fetchAllComplete;
  document.addEventListener('DOMContentLoaded',()=>{
    const refresh=document.getElementById('refreshBtn');
    if(refresh)refresh.onclick=fetchAllComplete;
    let started=false;
    const startAfterInitial=()=>{
      if(started||document.body.classList.contains('loading'))return;
      started=true;
      fetchAllComplete();
    };
    const observer=new MutationObserver(startAfterInitial);
    observer.observe(document.body,{attributes:true,attributeFilter:['class']});
    setTimeout(startAfterInitial,250);
    setTimeout(()=>{if(!started){started=true;fetchAllComplete()}},8000);
  });
})();