// Original reminders for this workspace, not quotations attributed to authors.
const messages = [
  {text:'Nu trebuie să prinzi fiecare mișcare. Doar setupul tău.',detail:'Răbdarea este parte din execuție.'},
  {text:'Acceptă riscul înainte să apeși butonul.',detail:'Un stop loss respectat face parte din plan.'},
  {text:'O zi fără intrare poate fi o zi cu disciplină.',detail:'Lipsa unui setup nu este timp pierdut.'},
  {text:'După un loss, următoarea decizie începe de la zero.',detail:'Piața nu îți datorează recuperarea.'},
  {text:'Măsoară procesul, apoi rezultatul.',detail:'Ai respectat condițiile pe care le-ai testat?'},
  {text:'Lasă setupul să vină la tine.',detail:'Nu grăbi confirmarea ca să simți că ai făcut ceva.'},
  {text:'Protejează-ți atenția la fel ca riscul.',detail:'Când emoțiile cresc, o pauză este o decizie utilă.'},
  {text:'Un rezultat nu definește întreaga strategie.',detail:'Evaluează o serie de execuții, nu un singur trade.'},
  {text:'Stopul se stabilește înainte de intrare.',detail:'Respectă limita pe care ai acceptat-o.'},
  {text:'Consecvența se construiește prin decizii repetate.',detail:'Astăzi: același plan, aceeași grijă la execuție.'},
];
export function dailyMessage(now:Date){
  const date=now.toLocaleDateString('en-CA',{timeZone:'Europe/Bucharest'});
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const get=(type:string)=>Number(parts.find(p=>p.type===type)?.value);
  const day=Math.floor(Date.UTC(get('year'),get('month')-1,get('day'))/86400000);
  return {...messages[day%messages.length],date};
}
