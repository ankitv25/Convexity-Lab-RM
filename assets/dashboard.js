// Presentation only: no prices, models, private requests or browser storage.
const knownViews = new Set(['august','inception']);
function setWindow(value,updateUrl=false) {
  const selected=knownViews.has(value)?value:'august';
  document.querySelectorAll('[data-period]').forEach(panel=>{panel.hidden=panel.dataset.period!==selected;});
  document.querySelectorAll('[data-window]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.window===selected)));
  if(updateUrl) {
    const url=new URL(location.href);url.searchParams.set('window',selected);
    history.replaceState(null,'',url);
  }
}
document.querySelectorAll('[data-window]').forEach(button=>button.addEventListener('click',()=>setWindow(button.dataset.window,true)));
setWindow(new URL(location.href).searchParams.get('window'));
addEventListener('popstate',()=>setWindow(new URL(location.href).searchParams.get('window')));
document.querySelectorAll('[data-as-of]').forEach(el=>{
  const age=Math.floor((Date.now()-Date.parse(el.dataset.asOf))/86400000);
  if(!Number.isFinite(age))return;
  el.textContent=age+' calendar days old';
  const card=el.closest('.freshness'),stale=age>Number(el.dataset.threshold);
  card?.classList.toggle('stale',stale);
  const badge=card?.querySelector('.badge');
  if(badge)badge.textContent=stale?'Older observation':'Dated snapshot';
});
