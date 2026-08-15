/* ============================================================
   HERO SECTION — product stage rotator + subtle parallax
   ============================================================ */
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {

        var revealEls = document.querySelectorAll('.hero .rv');
        revealEls.forEach(function (el) {
            requestAnimationFrame(function () {
                el.classList.add('in');
            });
        });

        var hstage = document.getElementById('hstage');
        if (!hstage) return;

        var slides = [].slice.call(hstage.querySelectorAll('.hslide'));
        var dots = [].slice.call(document.querySelectorAll('#hdots button'));
        if (slides.length < 2) return;

        var current = 0;
        var timer = null;
        var INTERVAL = 3800;

        function goTo(n) {
            current = (n + slides.length) % slides.length;
            slides.forEach(function (s, i) { s.classList.toggle('on', i === current); });
            dots.forEach(function (d, i) { d.classList.toggle('on', i === current); });
        }

        function play() {
            if (!timer && !reduce) {
                timer = setInterval(function () { goTo(current + 1); }, INTERVAL);
            }
        }

        function stop() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                stop();
                goTo(i);
                play();
            });
        });

        hstage.addEventListener('mouseenter', stop);
        hstage.addEventListener('mouseleave', play);

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    entry.isIntersecting ? play() : stop();
                });
            }, { threshold: 0.2 }).observe(hstage);
        } else {
            play();
        }

        var heroProd = document.getElementById('heroProd');
        if (!reduce && heroProd && window.matchMedia('(min-width: 1024px)').matches) {
            var mx = 0, my = 0, raf = null;

            function applyParallax() {
                raf = null;
                var y = window.scrollY || window.pageYOffset;
                var f = Math.min(y / 700, 1);
                heroProd.style.transform =
                    'translate3d(' + (mx * -16).toFixed(2) + 'px,' +
                    (-f * 54 + my * -10).toFixed(2) + 'px,0) scale(' +
                    (1 - f * 0.06).toFixed(3) + ')';
                heroProd.style.opacity = (1 - f * 0.55).toFixed(3);
            }

            function queueFrame() {
                if (!raf) raf = requestAnimationFrame(applyParallax);
            }

            window.addEventListener('mousemove', function (e) {
                mx = (e.clientX / window.innerWidth - 0.5) * 2;
                my = (e.clientY / window.innerHeight - 0.5) * 2;
                queueFrame();
            }, { passive: true });

            window.addEventListener('scroll', queueFrame, { passive: true });
            window.addEventListener('resize', queueFrame);
        }
    });
})();