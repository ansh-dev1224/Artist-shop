import {supabase} from '../lib/supabase';
const fail=()=>({data:null,error:new Error('Supabase is not configured.')});
export async function listArtworks({search='',category='All'}={}){if(!supabase)return fail();let q=supabase.from('artworks').select('*,artist:profiles!artworks_artist_id_fkey(id,full_name,avatar_url,bio)').eq('status','published').order('created_at',{ascending:false});if(category!=='All')q=q.eq('category',category);const {data,error}=await q;if(error)return {data:[],error};const s=search.trim().toLowerCase();return {data:(data||[]).filter(x=>!s||`${x.title} ${x.description} ${x.category} ${x.artist?.full_name||''}`.toLowerCase().includes(s)),error:null}}
export const getArtwork=id=>supabase?supabase.from('artworks').select('*,artist:profiles!artworks_artist_id_fkey(id,full_name,avatar_url,bio)').eq('id',id).eq('status','published').single():fail();
export const getArtist=id=>supabase?supabase.from('profiles').select('*').eq('id',id).eq('role','artist').single():fail();
export const getArtistWorks=id=>supabase?supabase.from('artworks').select('*').eq('artist_id',id).eq('status','published').order('created_at',{ascending:false}):fail();
export const getCategories=async()=>{if(!supabase)return[];const {data}=await supabase.from('artworks').select('category').eq('status','published');return [...new Set((data||[]).map(x=>x.category).filter(Boolean))].sort()};
export const createArtwork=p=>supabase.from('artworks').insert(p).select().single();
export const deleteArtwork=id=>supabase.from('artworks').delete().eq('id',id);
