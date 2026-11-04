export function clockAngles(now:Date,zone:string){
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hourCycle:'h23',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(now);
  const n=(type:string)=>Number(parts.find(p=>p.type===type)?.value||0);
  const h=n('hour'),m=n('minute'),s=n('second');
  return {hour:(h%12)*30+m*.5+s/120,minute:m*6+s*.1,second:s*6};
}
export default function AnalogClock({now,zone,label,compact=false}:{now:Date;zone:string;label:string;compact?:boolean}){
 const a=clockAngles(now,zone);const time=now.toLocaleTimeString('ro-RO',{timeZone:zone});
 return <svg className={compact ? "analog-clock clock-compact" : "analog-clock"} viewBox="0 0 120 120" role="img" aria-label={`${label}: ${time}`}><circle className="clock-face" cx="60" cy="60" r="56"/><circle className="clock-ring" cx="60" cy="60" r="50"/>{Array.from({length:60},(_,i)=><line key={i} className={i%5?'clock-tick':'clock-tick major'} x1="60" y1={i%5?9:8} x2="60" y2={i%5?11:15} transform={`rotate(${i*6} 60 60)`}/>)}{compact && <><circle className="clock-arc" cx="60" cy="60" r="50" transform="rotate(138 60 60)"/><text className="clock-caption" x="60" y="33" textAnchor="middle">{label.toUpperCase()}</text><text className="clock-local-time" x="60" y="92" textAnchor="middle">{time.slice(0,5)}</text></>}{!compact && [[12,60,25],[3,96,64],[6,60,101],[9,24,64]].map(([n,x,y])=><text key={n} x={x} y={y} textAnchor="middle">{n}</text>)}<line className="clock-hour" x1="60" y1="64" x2="60" y2="34" transform={`rotate(${a.hour} 60 60)`}/><line className="clock-minute" x1="60" y1="66" x2="60" y2="21" transform={`rotate(${a.minute} 60 60)`}/><line className="clock-second" x1="60" y1="70" x2="60" y2="18" transform={`rotate(${a.second} 60 60)`}/><circle cx="60" cy="60" r="3" className="clock-pin"/></svg>
}
