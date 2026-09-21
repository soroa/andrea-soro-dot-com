(function(){
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduce||!('IntersectionObserver'in window)){
    els.forEach(function(e){e.classList.add('in')});
    document.querySelectorAll('.num').forEach(function(n){n.textContent=n.dataset.num});
    return;
  }
  function show(e){
    if(e.classList.contains('in'))return;
    e.classList.add('in');
    [].forEach.call(e.querySelectorAll('.num'),count);
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      io.unobserve(e.target);
      show(e.target);
    });
  },{threshold:.18,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});

  /* An element the page has already scrolled past on load — a deep link like
     /matt#programs, an in-page jump, or a reload that restored scroll position
     — never triggers an intersection, so without this it would stay at
     opacity:0 permanently. Sweep anything that starts above the viewport top:
     fully past, or straddling the edge with too little showing to ever meet the
     observer's threshold. Elements fully on screen are left to the observer so
     they keep their stagger. */
  function sweep(){
    els.forEach(function(e){
      if(e.getBoundingClientRect().top<0){io.unobserve(e);show(e)}
    });
  }
  sweep();
  window.addEventListener('load',sweep);

  /* application form. Posts urlencoded, not multipart: Vercel parses urlencoded
     bodies into req.body for free and has no multipart parser. */
  var form=document.getElementById('apply-form');
  if(form){
    var msg=form.querySelector('.form-msg'),btn=form.querySelector('button');
    var fallback=' You can also reach Matt on <a href="https://www.instagram.com/advicefrommatt" target="_blank" rel="noopener noreferrer">Instagram</a>.';
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      form.classList.add('was-validated');
      msg.className='form-msg';
      if(!form.checkValidity()){
        var bad=form.querySelector(':invalid');
        if(bad)bad.focus();
        msg.textContent=bad&&bad.name==='phone'&&bad.value?'Phone number must start with your country code, for example +44.':'Please fill in the highlighted fields.';
        msg.classList.add('err');
        return;
      }
      btn.disabled=true;btn.textContent='Sending\u2026';
      fetch(form.action,{method:'POST',body:new URLSearchParams(new FormData(form)),
          headers:{'Accept':'application/json','Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(r){if(!r.ok)throw new Error(r.status);return r;})
        .then(function(){
          var done=document.createElement('div');
          done.className='form-done';
          done.innerHTML='<h3>Application sent</h3><p>Thanks. Matt reads every application himself and will be in touch with you directly.</p>';
          form.replaceWith(done);
        })
        .catch(function(){
          btn.disabled=false;btn.textContent='Send application';
          msg.innerHTML='Something went wrong and the application did not send. Please try again.'+fallback;
          msg.classList.add('err');
        });
    });
  }

  function count(el){
    var raw=el.dataset.num||el.textContent;
    var m=raw.match(/^([\d,]+)(.*)$/);
    if(!m){el.textContent=raw;return}
    var target=parseInt(m[1].replace(/,/g,''),10),suffix=m[2],t0=null;
    function frame(ts){
      if(t0===null)t0=ts;
      var p=Math.min(1,(ts-t0)/900),eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(target*eased).toLocaleString('en-US')+suffix;
      if(p<1)requestAnimationFrame(frame);
    }
    el.textContent='0'+suffix;
    requestAnimationFrame(frame);
  }
})();
