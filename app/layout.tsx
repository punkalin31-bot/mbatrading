import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'MBA Trading — Trading Desk',description:'Jurnal personal, statistici și pregătirea sesiunii.',icons:{icon:'/mba-logo.png'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ro"><body>{children}</body></html>}
