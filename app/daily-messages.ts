// Original reminders for this workspace, not quotations attributed to authors.
const messages = [
  {
    "text": "Fiecare tranzacție are un rezultat incert.",
    "detail": "Evaluează o serie de execuții, nu cere certitudine unei singure intrări.",
    "source": "Idee reformulată din rezumatul tău · Trading in the Zone"
  },
  {
    "text": "Acceptă pierderea posibilă înainte de intrare.",
    "detail": "Alege un risc pe care îl poți respecta până la stop loss.",
    "source": "Idee reformulată din rezumatul tău · Trading in the Zone"
  },
  {
    "text": "Nu ai nevoie să câștigi o dispută cu piața.",
    "detail": "Scopul este consecvența în aplicarea planului.",
    "source": "Idee reformulată din rezumatul tău · Trading in the Zone"
  },
  {
    "text": "Separă observația de așteptarea ta.",
    "detail": "Caută condițiile setupului, nu confirmarea unei dorințe.",
    "source": "Idee reformulată din rezumatul tău · Trading in the Zone"
  },
  {
    "text": "Un setup clar îți oferă un proces de urmat.",
    "detail": "Verifică intrarea, invalidarea și riscul înainte de click.",
    "source": "Idee reformulată din rezumatul tău · Trading in the Zone"
  },
  {
    "text": "Revizuiește obiectiv ce ai executat.",
    "detail": "Notează ce ai respectat și ce vei corecta, fără să te judeci după un singur rezultat.",
    "source": "Idee reformulată din rezumatul tău · Trading in the Zone"
  },
  {
    "text": "O zi fără setup valid nu este o zi pierdută.",
    "detail": "Răbdarea este o decizie pe care o poți respecta astăzi.",
    "source": "Reminder original · MBA Trading"
  },
  {
    "text": "După un loss, nu există o datorie de recuperat.",
    "detail": "Ia o pauză și revino la condițiile tale de intrare.",
    "source": "Reminder original · MBA Trading"
  },
  {
    "text": "Nu îndepărta stopul ca să amâni un rezultat.",
    "detail": "Riscul acceptat înainte de intrare rămâne limita ta.",
    "source": "Reminder original · MBA Trading"
  },
  {
    "text": "Calmul este și un criteriu de pregătire.",
    "detail": "Dacă ești nervos, poți alege să te oprești.",
    "source": "Reminder original · MBA Trading"
  },
  {
    "text": "Mai puține clickuri, mai multă claritate.",
    "detail": "Așteaptă sweep-ul, confirmarea și FVG-ul din planul tău.",
    "source": "Reminder original · MBA Trading"
  },
  {
    "text": "Câștigul de azi nu îți cere un risc mai mare mâine.",
    "detail": "Păstrează regulile pe care le-ai ales.",
    "source": "Reminder original · MBA Trading"
  }
];
export function dailyMessage(now:Date){
  const date=now.toLocaleDateString('en-CA',{timeZone:'Europe/Bucharest'});
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const get=(type:string)=>Number(parts.find(p=>p.type===type)?.value);
  const day=Math.floor(Date.UTC(get('year'),get('month')-1,get('day'))/86400000);
  return {...messages[day%messages.length],date};
}
