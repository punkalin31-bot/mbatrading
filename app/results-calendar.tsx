type Row={data:string;rezultat:string};
const value=(t:Row)=>t.rezultat==='WIN'?2:t.rezultat==='LOSS'?-1:0;
export function monthSummary(rows:Row[],month:string){
 const [year,m]=month.split('-').map(Number);
 if(!/^\d{4}-\d{2}$/.test(month)||m<1||m>12)return {weeks:[],net:0,count:0};
 const offset=(new Date(Date.UTC(year,m-1,1)).getUTCDay()+6)%7;
 const days=new Date(Date.UTC(year,m,0)).getUTCDate();
 const groups=new Map<string,Row[]>();
 for(const t of rows){if(!t.data.startsWith(month+'-'))continue;const d=Number(t.data.slice(8));if(!Number.isInteger(d)||d<1||d>days)continue;groups.set(t.data,[...(groups.get(t.data)||[]),t])}
 const weeks=Array.from({length:Math.ceil((offset+days)/7)},(_,w)=>{
  const cells=Array.from({length:7},(_,i)=>{const n=w*7+i-offset+1;if(n<1||n>days)return null;const date=month+'-'+String(n).padStart(2,'0');const a=groups.get(date)||[];return {date,day:n,count:a.length,net:a.reduce((s,t)=>s+value(t),0)}});
  return {cells,net:cells.reduce((s,c)=>s+(c?.net||0),0),count:cells.reduce((s,c)=>s+(c?.count||0),0)};
 });
 return {weeks,net:weeks.reduce((s,w)=>s+w.net,0),count:weeks.reduce((s,w)=>s+w.count,0)};
}
const tone=(n:number)=>n>0?'positive':n<0?'negative':'neutral-r';
const format=(n:number)=>(n>0?'+':'')+n.toLocaleString('ro-RO')+'R';
export default function ResultsCalendar({rows,month,onMonth,onDay}:{rows:Row[];month:string;onMonth:(m:string)=>void;onDay:(d:string)=>void}){
 const summary=monthSummary(rows,month);
 return <section className="panel calendar"><div className="panel-title"><div><h3>Calendarul rezultatelor</h3><small className="fine">Filtrele active · săptămâni luni–duminică · doar zilele lunii afișate</small></div><input aria-label="Luna calendarului" type="month" value={month} onChange={e=>{if(e.target.value)onMonth(e.target.value)}}/></div><div className="month-r-summary"><span>Total lună <small>{summary.count} tranzacții după filtre</small></span><strong className={tone(summary.net)}>{format(summary.net)}</strong></div><div className="calendar-scroll"><div className="calendar-with-weeks"><div className="calendar-week calendar-labels">{['Lun','Mar','Mie','Joi','Vin','Sâm','Dum','Total R'].map(x=><div className="weekday" key={x}>{x}</div>)}</div>{summary.weeks.map((week,i)=><div className="calendar-week" key={i}>{week.cells.map((c,j)=>c?<button key={c.date} className={'calendar-day '+(c.count?(c.net>0?'up':c.net<0?'down':'flat'):'')} onClick={()=>onDay(c.date)}><span>{c.day}</span>{c.count>0&&<><b>{format(c.net)}</b><small>{c.count} setupuri</small></>}</button>:<div key={'blank'+j} className="calendar-blank"/>)}<div className={'week-r '+tone(week.net)}><small>Săpt. {i+1}</small><strong>{format(week.net)}</strong><small>{week.count} setupuri</small></div></div>)}</div></div></section>
}
