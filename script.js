const IMG={"01": "assets/hamper-01.jpg", "02": "assets/hamper-02.jpg", "03": "assets/hamper-03.jpg", "04": "assets/hamper-04.jpg", "05": "assets/hamper-05.jpg", "06": "assets/hamper-06.jpg", "07": "assets/hamper-07.jpg", "08": "assets/hamper-08.jpg", "09": "assets/hamper-09.jpg", "10": "assets/hamper-10.jpg", "11": "assets/hamper-11.jpg", "12": "assets/hamper-12.jpg", "13": "assets/hamper-13.jpg"};
const hampers=[
 ["01","Festive Copper Hamper","festive","Festive"],
 ["02","Executive Diary Hamper","corporate","Corporate"],
 ["03","Executive Carry Hamper","corporate","Corporate"],
 ["04","Traveller’s Sweets Hamper","corporate","Corporate"],
 ["05","Festive Celebration Hamper","festive","Festive"],
 ["06","Heritage Copper Hamper","festive","Festive"],
 ["07","Mugs & Greens Hamper","corporate","Corporate"],
 ["08","Modern Gentleman Hamper","corporate","Corporate"],
 ["09","Cozy Comfort Hamper","corporate","Corporate"],
 ["10","Welcome to the Family","welcome","Welcome Kit"],
 ["11","Personalised Welcome Kit","welcome","Welcome Kit"],
 ["12","Welcome Aboard Hamper","welcome","Welcome Kit"],
 ["13","Festive Gourmet Hamper","gourmet","Gourmet"]
];
const grid=document.getElementById('grid');
hampers.forEach(([n,t,c,l])=>{
  const el=document.createElement('article');
  el.className='card reveal';el.dataset.cat=c;
  el.innerHTML=`<div class="img"><img src="${IMG[n]}" alt="${t}" loading="lazy"><span class="cat">${l}</span></div>
  <div class="info"><h3>${t}</h3><a href="#quote" data-h="${t}">Enquire →</a></div>`;
  grid.appendChild(el);
});

/* filters */
function applyFilter(f){
  document.querySelectorAll('#filters button').forEach(b=>b.classList.toggle('on',b.dataset.f===f));
  document.querySelectorAll('.card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.cat!==f));
}
document.getElementById('filters').addEventListener('click',e=>{if(e.target.dataset.f)applyFilter(e.target.dataset.f)});
document.querySelectorAll('.coll').forEach(c=>c.addEventListener('click',()=>{applyFilter(c.dataset.filter);document.getElementById('gallery').scrollIntoView({behavior:'smooth'})}));

/* lightbox */
const lb=document.getElementById('lb'),lbi=lb.querySelector('img');
grid.addEventListener('click',e=>{
  const img=e.target.closest('.img');
  if(img){lbi.src=img.querySelector('img').src;lb.classList.add('on')}
  const a=e.target.closest('a[data-h]');
  if(a){document.querySelector('[name=msg]').value='I’m interested in: '+a.dataset.h}
});
lb.addEventListener('click',()=>lb.classList.remove('on'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});

/* mobile menu */
const menu=document.getElementById('menu');
document.getElementById('menuBtn').onclick=()=>menu.classList.toggle('open');
menu.addEventListener('click',()=>menu.classList.remove('open'));

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* MEMORA KRAFTS — GOOGLE SHEETS LEADS + WHATSAPP */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxneekQ4cC1MMb6R9pEARz0XYdoniOQ4tVTLfGULCr8zs_PyaD9Clm0ERxob87HQjs/exec";
const enquiryForm = document.getElementById("form");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    const note = form.querySelector(".note");
    const fields = Object.fromEntries(new FormData(form).entries());

    if (!fields.name || !fields.phone) {
      if (note) note.textContent = "Please enter your name and contact number.";
      return;
    }

    const originalButtonText = submitButton ? submitButton.textContent : "Submit My Enquiry →";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }
    if (note) note.textContent = "Submitting your enquiry. Please wait...";

    const whatsappMessage = [
      "Hello Memora Krafts,",
      "",
      "Website Enquiry",
      "Name: " + (fields.name || "-"),
      "Company: " + (fields.company || "-"),
      "Phone: " + (fields.phone || "-"),
      "Email: " + (fields.email || "-"),
      "Looking for: " + (fields.type || "-"),
      "Quantity: " + (fields.qty || "-"),
      "Budget: " + (fields.budget || "-"),
      "Requirements: " + (fields.msg || "-")
    ].join("\n");
    const whatsappURL = "https://wa.me/918300102136?text=" + encodeURIComponent(whatsappMessage);

    // Open a blank tab during the user click so popup blockers are less likely to block WhatsApp.
    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      // Apps Script Web Apps accept this simple text/plain POST without a CORS preflight.
      // With no-cors, the browser cannot read the response; verify that the row appears in Sheets.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(fields)
      });

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappURL;
      } else {
        window.location.href = whatsappURL;
      }

      if (note) note.textContent = "Thank you! Your enquiry has been submitted. Please continue on WhatsApp.";
      form.reset();
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      if (note) note.textContent = "Unable to send your enquiry right now. Please contact us on WhatsApp.";
      console.error("Memora Krafts lead submission error:", error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

/* graceful fallback if an image is missing */
document.querySelectorAll('img').forEach(i=>i.addEventListener('error',()=>{i.style.opacity=0}));
document.addEventListener('error',e=>{if(e.target.tagName==='IMG')e.target.style.opacity=0},true);
