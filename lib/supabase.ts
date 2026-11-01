import {createClient,type SupabaseClient} from '@supabase/supabase-js';
let client:SupabaseClient|null=null;
export function getSupabase(){if(client)return client;const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;if(!url||!key)throw new Error('Lipsesc variabilele NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Configurează-le în Vercel și fă Redeploy.');client=createClient(url.replace(/\/rest\/v1\/?$/,''),key);return client}
