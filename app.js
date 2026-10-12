// Adicione o número com código do país e DDD. Exemplo de formato: 55 + DDD + número (apenas dígitos).
const WHATSAPP = '';
const PIX = '316.414.408-96';
let toastTimer;
function notify(message){const el=document.querySelector('#toast');el.textContent=message;el.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.display='none',5000);}
const dialog=document.querySelector('#lightbox');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#large-photo').src=button.dataset.photo;document.querySelector('#large-photo').alt=button.dataset.caption;document.querySelector('#caption').textContent=button.dataset.caption;dialog.showModal();}));
document.querySelector('#close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(PIX);notify('Chave Pix copiada!');}catch{const field=document.createElement('textarea');field.value=PIX;document.body.append(field);field.select();const ok=document.execCommand('copy');field.remove();if(ok)notify('Chave Pix copiada!');else window.prompt('Copie a chave Pix:',PIX);}});
document.querySelector('#rsvp').addEventListener('click',()=>{if(!WHATSAPP){notify('Confirme com a Pastora Fabiana ou o Diácono Elmiro.');return;}window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent('Olá! Quero confirmar minha presença na confraternização da IEAD Jd. Ivone, dia 12/12/2026.'),'_blank','noopener,noreferrer');});
if(WHATSAPP)document.querySelector('#contact-hint').textContent='Confirme pelo WhatsApp e envie seu comprovante à organização.';
document.querySelector('#calendar').addEventListener('click',()=>{const text=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//IEAD Jd Ivone//Convite//PT-BR','BEGIN:VEVENT','UID:confraternizacao2026-ieadjdivone','DTSTAMP:20261012T120000Z','DTSTART:20261212T120000Z','DTEND:20261212T220000Z','SUMMARY:Confraternização — IEAD Jd. Ivone','LOCATION:Estrada Maria Cristina\, 872 — Eldorado\, Diadema','DESCRIPTION:Culto\, confraternização\, almoço com churrasco\, piscina\, quadra e lazer.','END:VEVENT','END:VCALENDAR'].join('\r\n');const url=URL.createObjectURL(new Blob([text],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='confraternizacao-2026.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Abra o arquivo baixado para salvar na sua agenda.');});

// A capa reaparece a cada visita; sem JavaScript, o convite continua acessível.
const invitationCover = document.querySelector('#invitation-cover');
const openInvitation = document.querySelector('#open-invitation');
if (invitationCover && typeof invitationCover.showModal === 'function') {
  invitationCover.showModal();
  document.body.classList.add('cover-visible');
  const finishOpening = () => {
    invitationCover.close();
    document.body.classList.remove('cover-visible');
    document.querySelector('#invitation-title').focus({preventScroll:true});
  };
  invitationCover.addEventListener('cancel', event => {
    event.preventDefault();
    openInvitation.click();
  });
  openInvitation.addEventListener('click', () => {
    if (invitationCover.classList.contains('opening')) return;
    openInvitation.disabled = true;
    invitationCover.classList.add('opening');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishOpening();
      return;
    }
    setTimeout(() => invitationCover.classList.add('revealing'), 850);
    setTimeout(finishOpening, 1450);
  });
}

