(function(){
function fixTeamTable(){
 const table=document.querySelector('#equipe .table-card table');
 if(!table)return;
 if(!table.querySelector('thead')){
  const thead=document.createElement('thead');
  thead.innerHTML='<tr><th>Nome completo</th><th>ID</th><th>Turno</th><th>Edifício</th><th>Ações</th></tr>';
  table.insertBefore(thead,table.firstChild);
 }
}
function validateDates(){
 const start=document.getElementById('filterStart'),end=document.getElementById('filterEnd');
 if(!start||!end)return true;
 if(start.value&&end.value&&start.value>end.value){
  if(typeof toast==='function')toast('A data inicial não pode ser posterior à data final.');
  return false;
 }
 return true;
}
function guardDateFilter(){
 const btn=document.getElementById('applyFilters');
 if(!btn)return;
 btn.addEventListener('click',e=>{
  if(!validateDates()){
   e.stopImmediatePropagation();
   e.preventDefault();
  }
 },true);
}
function fixEntryValidation(){
 const form=document.getElementById('entryForm'),items=document.getElementById('entryBoxes');
 if(items){items.min='0';items.step='1';items.setAttribute('inputmode','numeric')}
 if(form)form.addEventListener('submit',e=>{
  const value=Number(items?.value);
  if(!Number.isFinite(value)||value<0||!Number.isInteger(value)){
   e.preventDefault();e.stopImmediatePropagation();
   if(typeof toast==='function')toast('Informe uma quantidade válida de itens.');
  }
 },true);
}
function init(){fixTeamTable();guardDateFilter();fixEntryValidation()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();