'use client';
import {useEffect,useState} from 'react';
import {imageUrl,imageBlob} from '../lib/journal';
export default function PrivateImage({src}:{src:string}){
  const[url,setUrl]=useState(''),[error,setError]=useState(''),[attempt,setAttempt]=useState(0);
  useEffect(()=>{let active=true;let localUrl='';setUrl('');setError('');
    const load=async()=>{try{
      let next:string;
      if(attempt>0){const blob=await imageBlob(src);if(!active)return;localUrl=URL.createObjectURL(blob);next=localUrl}else next=await imageUrl(src);
      if(active)setUrl(next);
    }catch{if(active)setError('Nu am putut încărca poza.')}};
    void load();return()=>{active=false;if(localUrl)URL.revokeObjectURL(localUrl)};
  },[src,attempt]);
  return error?<div className="fine"><p>Nu am putut încărca poza. Verifică conexiunea sau autentificarea.</p><button type="button" onClick={()=>setAttempt(a=>a+1)}>Reîncearcă</button></div>:url?<img src={url} alt="Screenshot tranzacție" onError={()=>{if(attempt===0)setAttempt(1);else setError('Imagine indisponibilă')}}/>:<p className="fine">Se încarcă poza…</p>;
}
