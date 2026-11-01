'use client';
import {useEffect,useState} from 'react';import {imageUrl} from '../lib/journal';
export default function PrivateImage({src}:{src:string}){const[url,setUrl]=useState(''),[error,setError]=useState('');useEffect(()=>{let active=true;setUrl('');setError('');imageUrl(src).then(url=>active&&setUrl(url)).catch(()=>active&&setError('Nu am putut încărca screenshotul.'));return()=>{active=false}},[src]);return error?<p className="fine">{error}</p>:url?<img src={url} alt="Screenshot tranzacție"/>:<p className="fine">Se încarcă screenshotul…</p>}
