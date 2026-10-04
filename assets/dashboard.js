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
// Show pre-rendered source research. No private model or request runs here.
const fundSections=new Set(['performance','attribution','holdings']);
function setFundSection(value,updateUrl=false){
  const selected=fundSections.has(value)?value:'performance';
  document.querySelectorAll('[data-fund-section]').forEach(panel=>{panel.hidden=panel.dataset.fundSection!==selected;});
  document.querySelectorAll('[data-fund-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.fundTab===selected)));
  if(updateUrl){const url=new URL(location.href);url.searchParams.set('section',selected);history.replaceState(null,'',url);}
}
document.querySelectorAll('[data-fund-tab]').forEach(button=>button.addEventListener('click',()=>setFundSection(button.dataset.fundTab,true)));
setFundSection(new URL(location.href).searchParams.get('section'));
addEventListener('popstate',()=>setFundSection(new URL(location.href).searchParams.get('section')));
document.querySelectorAll('[data-as-of]').forEach(el=>{
  const age=Math.floor((Date.now()-Date.parse(el.dataset.asOf))/86400000);
  if(!Number.isFinite(age))return;
  el.textContent=age+' calendar days old';
  const card=el.closest('.freshness'),stale=age>Number(el.dataset.threshold);
  card?.classList.toggle('stale',stale);
  const badge=card?.querySelector('.badge');
  if(badge)badge.textContent=stale?'Older observation':'Dated snapshot';
});
