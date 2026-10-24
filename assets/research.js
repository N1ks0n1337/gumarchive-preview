/* Both article translations are bundled for offline and mobile reading. */
(() => {
  const byId = id => document.getElementById(id);
  const body = byId('researchBody');
  const toc = byId('researchToc');
  const template = byId('researchRu');
  const content = {
    en: { body: body.innerHTML, toc: toc.innerHTML },
    ru: {
      body: template.content.querySelector('[data-slot="body"]').innerHTML,
      toc: template.content.querySelector('[data-slot="toc"]').innerHTML
    }
  };
  const labels = JSON.parse(byId('researchLabels').textContent);
  template.remove();
  let language = 'en';

  function setLanguage(next, rememberPosition = false) {
    if (next !== 'en' && next !== 'ru') return;
    let section;
    if (rememberPosition && next !== language) {
      for (const heading of body.querySelectorAll('h2[id]')) {
        if (heading.getBoundingClientRect().top <= 100) section = heading.id;
      }
    }
    const text = labels[next];
    if (next !== language) {
      body.innerHTML = content[next].body;
      toc.innerHTML = content[next].toc;
    }
    language = next;
    document.documentElement.lang = next;
    document.title = text.documentTitle;
    document.querySelector('meta[name="description"]').content = text.description;
    document.querySelector('meta[name="author"]').content = text.author;
    document.querySelectorAll('[data-research-label]').forEach(element => {
      element.textContent = text[element.dataset.researchLabel];
    });
    body.setAttribute('aria-label', text.articleLabel);
    byId('researchBack').href = './?lang=' + next;
    byId('researchCatalog').href = './?lang=' + next + '#catalog';
    document.querySelectorAll('.langswitch button').forEach(button => {
      const active = button.dataset.lang === next;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    // file:// reading remains supported even when history updates are unavailable.
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState(null, '', url);
    } catch (_) { /* Language switching does not require browser history. */ }
    if (section) document.getElementById(section).scrollIntoView();
  }

  document.querySelector('.langswitch').addEventListener('click', event => {
    const button = event.target.closest('button[data-lang]');
    if (button) setLanguage(button.dataset.lang, true);
  });
  const requested = new URLSearchParams(window.location.search).get('lang');
  setLanguage(requested === 'ru' ? 'ru' : 'en');
  // Resolve an incoming anchor after the requested translation has been inserted.
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
