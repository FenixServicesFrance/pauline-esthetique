(() => {
  const top = document.querySelector('.top');
  const onScroll = () => top && top.classList.toggle('sc', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const b = document.querySelector('.burger'), nav = document.getElementById('nav');
  if (b && nav) b.addEventListener('click', () => {
    const o = nav.classList.toggle('open'); b.setAttribute('aria-expanded', o);
  });

  // onglets de la carte des soins : surligne la section visible
  const tabs = [...document.querySelectorAll('.onglets a')];
  if (tabs.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) tabs.forEach(t => t.classList.toggle('on', t.hash === '#' + e.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    tabs.forEach(t => { const s = document.querySelector(t.hash); if (s) io.observe(s); });
  }

  // bon cadeau pré-sélectionné depuis l'URL (?bon=100)
  const f = document.getElementById('form');
  if (f) {
    const bon = new URLSearchParams(location.search).get('bon');
    if (bon && f.bon) f.bon.value = bon;
    f.addEventListener('submit', e => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      const v = n => (f[n] && f[n].value || '').trim();
      const lignes = [
        'Nom : ' + v('nom'), 'Téléphone : ' + v('tel'), 'Ville : ' + v('ville'),
        v('date') ? 'Date et heure souhaitées : ' + v('date') : '',
        v('bon') ? 'Bon cadeau : ' + v('bon') + ' €' : '', '', v('message')
      ].filter((l, i) => l || i === 5);
      const sujet = v('bon') ? 'Bon cadeau ' + v('bon') + ' € – ' + v('nom') : 'Demande de rendez-vous – ' + v('nom');
      location.href = 'mailto:contact@pauline-esthetique.fr?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(lignes.join('\n'));
      const ok = document.getElementById('form-ok'); if (ok) ok.hidden = false;
    });
  }
})();
