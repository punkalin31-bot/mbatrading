import AnalogClock from './analog-clock';

const romania = 'Europe/Bucharest';
const timeRO = new Intl.DateTimeFormat('ro-RO', {
  timeZone: romania, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
const dateRO = new Intl.DateTimeFormat('ro-RO', {timeZone: romania, dateStyle: 'short'});
const weekdayRO = new Intl.DateTimeFormat('ro-RO', {timeZone: romania, weekday: 'long'});

export function sessionWindow(now: Date, zone: string, start: number, end: number) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  });
  // Encode local calendar fields on a UTC axis, then resolve each boundary's offset.
  function localFields(instant: number) {
    const fields = Object.fromEntries(formatter.formatToParts(instant).map(p => [p.type, Number(p.value)]));
    return Date.UTC(fields.year, fields.month - 1, fields.day, fields.hour, fields.minute, fields.second);
  }
  function resolve(local: number) {
    let instant = local;
    for (let i = 0; i < 2; i++) instant += local - localFields(instant);
    return instant;
  }
  const localNow = localFields(now.getTime());
  const day = new Date(localNow);
  day.setUTCHours(0, 0, 0, 0);
  const at = (hour: number) => day.getTime() + hour * 3600000;
  const isWeekend = () => day.getUTCDay() === 0 || day.getUTCDay() === 6;
  const open = !isWeekend() && localNow >= at(start) && localNow < at(end);
  while (isWeekend() || localNow >= at(end)) day.setUTCDate(day.getUTCDate() + 1);
  const opens = resolve(at(start));
  const closes = resolve(at(end));
  const elapsedHours = open ? (localNow - at(start)) / 3600000 : 0;
  return {open, opens, closes, elapsedHours, seconds: Math.ceil(((open ? closes : opens) - now.getTime()) / 1000)};
}

export default function SessionCard({name,zone,start,end,now}:{
  name:string;zone:string;start:number;end:number;now:Date;
}) {
  const {open, opens, closes, elapsedHours, seconds} = sessionWindow(now, zone, start, end);
  const pad = (n: number) => String(n).padStart(2, '0');
  const countdown = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(pad).join(':');
  const dayLabel = dateRO.format(opens) === dateRO.format(now) ? 'Azi' : weekdayRO.format(opens);
  return <article className={`session session-card ${open ? 'session-live' : ''}`}>
    <div className="session-card-heading">
      <h3><i aria-hidden="true"/>{name}</h3>
      {open && <span className="session-live-badge">LIVE</span>}
    </div>
    <div className="session-card-body">
      <AnalogClock now={now} zone={zone} label={name} compact sessionArc={{start, end, elapsedHours}}/>
      <div className="session-countdown">
        <span>{open ? 'Se închide în' : 'Se deschide în'}</span>
        <strong>{countdown}</strong>
        <small>{open ? `${timeRO.format(opens)}–${timeRO.format(closes)} RO` : `${dayLabel} la ${timeRO.format(opens)} RO`}</small>
      </div>
    </div>
  </article>;
}
