// script.js - small helpers: nav toggle, theme toggle, basic progressive enhancement
(function(){
  // simple nav toggle for small screens
  function setupNavToggle(buttonId){
    const btn = document.getElementById(buttonId);
    if(!btn) return;
    btn.addEventListener('click', function(){
      const nav = document.getElementById('site-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      if(nav) nav.style.display = expanded ? '' : 'block';
    });
  }
  setupNavToggle('nav-toggle');
  setupNavToggle('nav-toggle-2');
  setupNavToggle('nav-toggle-3');
  setupNavToggle('nav-toggle-4');
  setupNavToggle('nav-toggle-5');

  // theme persistence
  const themeBtns = document.querySelectorAll('[id^="theme-toggle"]');
  function setTheme(isLight){
    document.body.classList.toggle('light', !!isLight);
    // mark that user changed theme (overrides prefers-color-scheme)
    document.documentElement.classList.add('user-theme');
    // persist
    try {
      localStorage.setItem('anchro-theme', isLight ? 'light' : 'dark');
    } catch(e){}
  }

  // init from storage or prefer: dark by default (design is dark-first)
  try {
    const saved = localStorage.getItem('anchro-theme');
    if(saved === 'light') setTheme(true);
    else if(saved === 'dark') setTheme(false);
  } catch(e){}

  const themeToggleHandler = () => {
    const currentlyLight = document.body.classList.contains('light');
    setTheme(!currentlyLight);
  };
  themeBtns.forEach(b => b.addEventListener('click', themeToggleHandler));

  // accessible focus outlines — keep them for keyboard users
  document.addEventListener('keydown', function(e){
    if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
  });

})();
