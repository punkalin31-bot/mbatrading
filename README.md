# MBA Trading — Personal Trading Space

Aplicație Next.js pentru GitHub + Vercel, cu Supabase Auth, Postgres și Storage privat.

## 1. Ce este inclus

- Trading Desk, sesiuni și calendar economic cu selecție multiplă (GBP/USD/EUR implicit).
- Jurnal editabil, JSON compatibil cu exporturile existente și screenshoturi private.
- Statistici și precalculator cu intervalele originale; media criteriilor independente, cu/fără BE.
- Logo-ul original transparent, mic, cu textul PERSONAL TRADING SPACE.
- Datele unui utilizator sunt separate prin politicile RLS din Supabase.

Aceasta este versiunea pentru Vercel. Nu folosește D1, R2 sau autentificarea ChatGPT a versiunii găzduite anterior. Nu include tranzacții, screenshoturi personale sau conturi predefinite în cod.

## 2. Pregătirea Supabase

Tabelul `public.trades`, bucketul privat `trade-screenshots` și politicile RLS trebuie să existe. Dacă ai rulat deja scriptul furnizat în conversație, nu îl rula din nou. O copie se află în `supabase/001-initial.sql` pentru proiecte noi.

Pentru primul tău utilizator:

1. Supabase → Authentication → Users → Add user → Create new user.
2. Introdu emailul tău și o parolă de autentificare aleasă de tine. Aceasta este diferită de parola bazei de date.
3. Confirmă emailul prin opțiunea de confirmare a utilizatorului din dashboard, dacă este oferită. Nu trimite parola în chat.
4. Te vei autentifica cu acest email și această parolă în aplicație.

Aplicația oferă și creare de cont cu confirmare prin email, dacă înregistrările sunt activate în Supabase. Pentru proiectul personal poți dezactiva înregistrările publice DUPĂ ce ai creat utilizatorul tău, în Authentication → configurarea înregistrărilor.

După ce ai adresa Vercel, în Authentication → URL Configuration:

- Site URL: adresa ta Vercel HTTPS.
- Redirect URLs: aceeași adresă, plus `http://localhost:3000` dacă lucrezi local.

Nu dezactiva RLS și nu face public bucketul. Nu folosi chei Secret sau service_role în browser ori în repository.

## 3. GitHub → Vercel

1. Dezarhivează ZIP-ul.
2. Creează un repository GitHub (preferabil privat).
3. Încarcă ÎN RĂDĂCINA repository-ului conținutul folderului: `package.json`, `package-lock.json`, `app/`, `lib/`, `public/` etc. Nu urca ZIP-ul ca fișier și nu urca `node_modules/`.
4. Vercel → Add New → Project → importă repository-ul.
5. Framework Preset: **Next.js**. Root Directory: folderul care conține `package.json` (implicit `./`). Lasă comenzile de build și output pe valorile detectate automat.
6. Adaugă Environment Variables pentru Production, Preview și Development, după caz:

```text
NEXT_PUBLIC_SUPABASE_URL=https://jqimplrecyemwsteawqe.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_aRwowXJuX0Os1VuKpTwykA_b6cBwijQ
```

Aceste două valori sunt configurație publică, nu chei administrative. Protecția înregistrărilor și imaginilor este dată de autentificare și RLS.

7. Apasă Deploy.
8. Dacă schimbi variabilele ulterior, fă Redeploy: variabilele NEXT_PUBLIC sunt incluse la build.

Nu există un `index.html` de deschis direct: este un proiect Next.js.

## 4. Prima autentificare și import

1. Autentifică-te în aplicația publicată cu utilizatorul Supabase Auth creat mai sus.
2. Jurnalul nou este gol — acest lucru este intenționat.
3. Import JSON → selectează ultimul tău export COMPLET (cu imaginile incluse).
4. Importul încarcă screenshoturile în Storage și tranzacțiile în tabel. Așteaptă mesajul **Salvat online**; nu închide fila în timpul importului.
5. Verifică numărul de tranzacții, editează o notiță, salvează și reîncarcă pagina. Verifică și de pe telefon, cu același cont.
6. Export JSON include screenshoturile și rămâne compatibil cu formatul inițial. Păstrează periodic un export propriu.

Importul unește ID-urile existente; confirmarea îți explică faptul că tranzacțiile cu același ID sunt actualizate. În cazul unei întreruperi, unele loturi pot fi deja salvate. Reîncarcă jurnalul și reimportă exportul; fișierele identice sunt deduplicate după SHA-256.

Editările folosesc `updated_at` pentru a detecta conflictele dintre ferestre. Dacă apare conflict, reîncarcă înainte de a încerca din nou. Nu se fac ștergeri de tranzacții prin import.

## 5. Lucrul în VS Code

Instalează Node.js LTS compatibil cu Next.js. În terminalul folderului:

```bash
npm ci
```

Copiază `.env.example` ca `.env.local`, apoi:

```bash
npm run dev
```

Deschide adresa afișată în terminal (de regulă `http://localhost:3000`). Pentru verificare:

```bash
npm run typecheck
npm run build
```

## 6. Limite și starea funcțiilor

- Tranzacțiile și imaginile se salvează în Supabase, inclusiv accesul de pe alte dispozitive cu același cont.
- Tema, monedele și planul/checklistul zilnic se salvează local în browser; notițele/checklisturile locale sunt separate după emailul contului.
- MT5 nu este conectat încă. Această arhitectură poate fi extinsă cu un conector.
- Calendarul încearcă exportul public Forex Factory (săptămâna curentă), apoi ShowMyTrades ca sursă alternativă. Dacă sursele nu răspund, afișează indisponibilitatea. Nu inventează evenimente și nu împachetează copii învechite în această versiune.
- Exportul Forex Factory nu conține rezultatele publicate. Clasificările sursei alternative pot diferi.
- Holidays rămân în filtrul de impact mare, însă respectă monedele selectate. Orele și zilele sunt convertite în Europe/Bucharest.
- Scorul precalculatorului este media procentelor independente selectate, nu o probabilitate calibrată a următoarei tranzacții.
- Screenshoturi acceptate: PNG/JPEG/WebP, maximum 6 MB fiecare. Pe planul gratuit Supabase, urmărește spațiul și traficul în dashboard.

## 7. Dacă apare o problemă

- `Invalid login credentials`: folosește utilizatorul din Authentication → Users, nu parola bazei de date.
- `Email not confirmed`: confirmă emailul pentru utilizatorul tău.
- `permission denied` / `row-level security`: verifică scriptul SQL și faptul că ești autentificat; nu dezactiva protecțiile.
- `Lipsesc variabilele`: adaugă cele două variabile în Vercel și fă Redeploy.
- Screenshoturi cu linkuri vechi: folosește exportul original JSON cu imagini data:image, nu unul care referă ruta privată a site-ului vechi.

Această arhivă este pregătită și verificată prin typecheck/build. Autentificarea reală, importul și persistența trebuie verificate după publicare cu contul tău; nicio parolă a ta nu a fost folosită pentru teste.
