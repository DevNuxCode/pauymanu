// 🎬 Trailer Cinemático FINAL - Pauli & Manu + Música + Cámara
"use client";
import { useEffect, useState, useRef } from "react";

export default function Home(){
  const [fase,setFase]=useState(0);
  const [tiempo,setTiempo]=useState("");
  const audioRef = useRef<HTMLAudioElement|null>(null);

  useEffect(()=>{
    const t=[
      setTimeout(()=>setFase(1),1200),
      setTimeout(()=>setFase(2),2600),
      setTimeout(()=>setFase(3),4200),
      setTimeout(()=>setFase(4),6500)
    ];

    // autoplay con interacción mínima
    const playAudio = () => {
      if(audioRef.current){
        audioRef.current.volume = 0;
        audioRef.current.play().catch(()=>{});

        // fade in
        let v = 0;
        const fade = setInterval(()=>{
          if(v>=0.5){ clearInterval(fade); return; }
          v += 0.02;
          audioRef.current!.volume = v;
        },200);
      }
    };

    window.addEventListener("click", playAudio, { once:true });

    return ()=>t.forEach(clearTimeout);
  },[]);

  useEffect(()=>{
    const i=setInterval(()=>{
      const inicio=new Date(new Date().getFullYear(),0,14);
      const ahora=new Date();
      let d=ahora.getTime()-inicio.getTime();
      const dias=Math.floor(d/(1000*60*60*24));
      const h=Math.floor((d/(1000*60*60))%24);
      const m=Math.floor((d/(1000*60))%60);
      const s=Math.floor((d/1000)%60);
      setTiempo(`${dias} días ${h}h ${m}m ${s}s juntos ✨`);
    },1000);
    return ()=>clearInterval(i);
  },[]);

  return(
    <main className="h-screen w-screen bg-black overflow-hidden flex items-center justify-center relative text-white animate-camera">

      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=romantic-ambient-piano-110624.mp3" type="audio/mpeg" />
      </audio>

      {/* ATMOSFERA */}
      <div className="absolute w-[140vw] h-[140vh] bg-[radial-gradient(circle,#ff8ecf22,#000)] animate-pulseSlow" />
      <div className="absolute w-full h-full backdrop-blur-[2px]" />

      {/* SEMILLA */}
      {fase===0 && <div className="w-2 h-2 bg-white rounded-full animate-seedGlow" />}

      {/* TALLO */}
      {fase===1 && (
        <div className="absolute bottom-0 flex flex-col items-center">
          <div className="w-[2px] h-60 bg-green-400 animate-growLight" />
        </div>
      )}

      {/* FLORES */}
      {fase>=2 && <Bloom />}

      {/* TEXTO */}
      {fase>=3 && (
        <div className="absolute text-center animate-textReveal z-10">
          <h1 className="text-6xl font-serif tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
            Pauli ✿ Manu
          </h1>
          <p className="mt-4 text-lg opacity-80">{tiempo}</p>
          <p className="text-sm opacity-50">Desde el 14 de enero 💞</p>
        </div>
      )}

      {/* VIÑETA */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent 60%,black 100%)]" />

      <style jsx global>{`

      @keyframes camera{
        0%{ transform: scale(1.1) }
        100%{ transform: scale(1) }
      }
      .animate-camera{ animation: camera 8s ease-out forwards }

      @keyframes seedGlow{
        0%{transform:scale(0);opacity:0;box-shadow:0 0 0px #fff}
        50%{transform:scale(2);opacity:1;box-shadow:0 0 20px #fff}
        100%{transform:scale(1)}
      }
      .animate-seedGlow{animation:seedGlow 1.2s ease forwards}

      @keyframes growLight{
        0%{height:0;box-shadow:0 0 0px #00ffcc}
        100%{height:260px;box-shadow:0 0 25px #00ffcc}
      }
      .animate-growLight{animation:growLight 1.6s ease-out forwards}

      @keyframes textReveal{
        0%{opacity:0;transform:translateY(60px) scale(.9);filter:blur(10px)}
        100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}
      }
      .animate-textReveal{animation:textReveal 2.5s ease forwards}

      @keyframes floatCine{
        0%{transform:translateY(0) scale(.6) rotate(0);opacity:0}
        20%{opacity:1}
        100%{transform:translateY(-140vh) scale(1.3) rotate(360deg);opacity:0}
      }

      @keyframes pulseSlow{
        0%,100%{opacity:.3}
        50%{opacity:.6}
      }
      .animate-pulseSlow{animation:pulseSlow 8s infinite ease-in-out}

      `}</style>
    </main>
  )
}

function Bloom(){
  const [flores,setFlores]=useState<any[]>([]);

  useEffect(()=>{
    const i=setInterval(()=>{
      const f={id:Math.random(),x:Math.random()*100,d:12+Math.random()*6};
      setFlores(p=>[...p,f]);
      setTimeout(()=>{
        setFlores(p=>p.filter(e=>e.id!==f.id));
      },18000);
    },250);
    return ()=>clearInterval(i);
  },[]);

  return(
    <>
      {flores.map(f=>(
        <div key={f.id}
          className="absolute w-28 h-28 bg-cover opacity-90"
          style={{
            backgroundImage:"url('corazon.png')",
            left:`${f.x}%`,
            bottom:"-150px",
            animation:`floatCine ${f.d}s linear forwards`,
            filter:"drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
          }}
        />
      ))}

      {Array.from({length:30}).map((_,i)=>(
        <div key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-40 animate-pulse"
          style={{
            left:`${Math.random()*100}%`,
            top:`${Math.random()*100}%`
          }}
        />
      ))}
    </>
  )
}
