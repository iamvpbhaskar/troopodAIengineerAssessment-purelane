(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  var revs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { 
        if (e.isIntersecting) { 
          e.target.classList.add('in'); 
          ro.unobserve(e.target); 
        } 
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revs.forEach(function (el) { ro.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- scene crossfade (scroll driven, deterministic) ---------- */
  var scenes = [].slice.call(document.querySelectorAll('.scene'));
  var stage = document.getElementById('scenes');
  var current = 0;
  
  function setScene(n) {
    if (n === current) return;
    current = n;
    scenes.forEach(function (s, i) { s.classList.toggle('on', i + 1 === n); });
    if (stage) stage.setAttribute('data-d', String(n));
  }
  
  function pickScene() {
    var zones = [].slice.call(document.querySelectorAll('.shopify-section')); // Fallback to all sections
    var dataZones = [].slice.call(document.querySelectorAll('[data-scene]'));
    
    // If we have explicit data-scenes, use them, otherwise use all sections for document order fallback
    var activeZones = dataZones.length > 0 ? dataZones : zones;
    
    var halfH = window.innerHeight * 0.5;
    var n = 1;
    
    for (var i = 0; i < activeZones.length; i++) {
      var z = activeZones[i];
      if (z.getBoundingClientRect().top <= halfH) {
        var attr = parseInt(z.getAttribute('data-scene'), 10);
        // JS must tolerate duplicate/missing numbers via document-order fallback.
        n = isNaN(attr) ? Math.min(i + 1, scenes.length || 4) : attr;
      }
    }
    setScene(n);
  }

  /* ---------- rail sync ---------- */
  var railLinks = [].slice.call(document.querySelectorAll('.rail a'));
  var targets = railLinks.map(function (a) { 
    var href = a.getAttribute('href');
    return href && href.startsWith('#') ? document.querySelector(href) : null; 
  }).filter(Boolean);
  
  function syncRail() {
    if(railLinks.length === 0) return;
    var mid = window.innerHeight * 0.42, idx = 0;
    targets.forEach(function (t, i) { 
      if (t && t.getBoundingClientRect().top <= mid) idx = i; 
    });
    railLinks.forEach(function (a, i) { a.classList.toggle('on', i === idx); });
  }

  /* ---------- parallax + header ---------- */
  var hdr = document.getElementById('hdr') || document.querySelector('sticky-header');
  var raf = null, mx = 0, my = 0;

  function frame() {
    raf = null;
    var y = window.scrollY || window.pageYOffset;
    if (hdr) hdr.classList.toggle('up', y > 90);
    
    if (!reduce) {
      var wl = document.querySelectorAll('#water .wl');
      for (var i = 0; i < wl.length; i++) {
        var d = [0.05, 0.09, 0.03, 0.02][i] || 0.05;
        wl[i].style.setProperty('--px', (mx * d * 130).toFixed(1) + 'px');
        wl[i].style.setProperty('--py', (-y * d + my * d * 90).toFixed(1) + 'px');
      }
    }
    syncRail();
    pickScene();
  }
  
  function onScroll() { if (!raf) raf = requestAnimationFrame(frame); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (!reduce && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      onScroll();
    }, { passive: true });
  }

  // Initial trigger
  frame();
})();
