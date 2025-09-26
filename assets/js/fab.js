(function(){
    const fab=document.querySelector('.fab');
    if (!fab) return;
    const btn = fab.querySelector('.fab-main');
    btn.addEventListener('click', ()=>{ fab.classList.toggle('open'); });
})();
