document.addEventListener('DOMContentLoaded', function() {
  var r = document.getElementById('rot');
  if (!r) return;
  var imgs = [].slice.call(r.querySelectorAll('.pimg'));
  var dots = [].slice.call(r.querySelectorAll('.dots i'));
  var name = r.querySelector('.cap b');
  var note = r.querySelector('.cap span');
  if (imgs.length === 0) return;
  
  var cur = 0;
  setInterval(function() {
    imgs[cur].classList.remove('on');
    dots[cur].classList.remove('on');
    cur = (cur + 1) % imgs.length;
    imgs[cur].classList.add('on');
    dots[cur].classList.add('on');
    name.textContent = imgs[cur].getAttribute('data-name');
    note.textContent = imgs[cur].getAttribute('data-note');
  }, 2400);
});
