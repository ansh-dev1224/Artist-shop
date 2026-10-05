import {createContext,useContext,useEffect,useState} from 'react';
import {supabase} from '../lib/supabase';
const C=createContext(null);
export function AuthProvider({children}){const [session,setSession]=useState(null),[profile,setProfile]=useState(null),[loading,setLoading]=useState(true);
 async function load(user){if(!supabase||!user){setProfile(null);return;}const {data}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle();setProfile(data||null)}
 useEffect(()=>{if(!supabase){setLoading(false);return;}let live=true;supabase.auth.getSession().then(async({data})=>{if(!live)return;setSession(data.session);await load(data.session?.user);setLoading(false)});const {data:l}=supabase.auth.onAuthStateChange(async(_,s)=>{setSession(s);await load(s?.user);setLoading(false)});return()=>{live=false;l.subscription.unsubscribe()};},[]);
 return <C.Provider value={{session,user:session?.user||null,profile,loading,signOut:()=>supabase?.auth.signOut(),refresh:()=>load(session?.user)}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);
