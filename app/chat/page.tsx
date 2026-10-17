"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Globe2, MessageCircle, Send, Swords, UserPlus, Users } from "lucide-react";
import "./chat.css";

type Tab = "world" | "friends" | "requests" | "private";
type WorldMessage = [string, string, string, string, string];

const world: WorldMessage[] = [
 ["Alex","🇫🇷","🧭","Hello everyone! 👋","2 min ago"],
 ["Sakura","🇯🇵","🌸","This game is amazing! ❤️","1 min ago"],
 ["David","🇺🇸","🌎","Anyone from France here?","1 min ago"],
 ["Aisha","🇮🇳","✨","Yes! I love this game 😊","Just now"],
 ["Carlos","🇪🇸","🏆","Spain here! Let's be friends!","Just now"],
 ["Yuki","🇯🇵","🎏","Nice score! 🔥","Just now"],
];

const livePool: WorldMessage[] = [
 ["Maya","🇨🇦","🍁","Who wants a flag battle? 🏁","Live"],
 ["Noah","🇬🇧","🦁","Just unlocked Japan! ✨","Live"],
 ["Lina","🇩🇪","🌟","That boss round was hard 😅","Live"],
 ["Amir","🇲🇦","⚡","Anyone online for 1v1? ⚔️","Live"],
 ["Sofia","🇮🇹","🎨","Hello world chat! 👋","Live"],
];

const friends = [
 ["Sakura","🇯🇵","🌸","Online","Lv 32"],
 ["Alex","🇫🇷","🧭","Online","Lv 28"],
 ["Leo","🇧🇷","🌎","In game","Lv 18"],
 ["Emma","🇺🇸","⭐","Online","Lv 24"],
 ["Ravi","🇮🇳","🏆","Offline","Lv 20"],
];

export default function ChatPage(){
 const [tab,setTab]=useState<Tab>("world");
 const [draft,setDraft]=useState("");
 const [sent,setSent]=useState<string[]>([]);
 const [live,setLive]=useState<WorldMessage[]>([]);

 useEffect(()=>{
  let index=0;
  const timer=window.setInterval(()=>{
   setLive(current=>[...current,livePool[index%livePool.length]].slice(-5));
   index+=1;
  },5500);
  return()=>window.clearInterval(timer);
 },[]);

 const send=(e:FormEvent)=>{
  e.preventDefault();
  const t=draft.trim();
  if(!t)return;
  setSent(v=>[...v,t]);
  setDraft("");
 };

 return <main className="chatPage"><section className="chatPhone">
  <div className="phoneStatus"><span>9:41</span><span>▮▮▮ &nbsp;⌁&nbsp; <b>100</b></span></div>
  {tab!=="private" ? <>
   <header className="chatHero"><Link href="/" className="roundBack"><ArrowLeft/></Link><div className="globeBadge">🌍</div><div><h1>{tab==="world"?"World Chat":tab==="friends"?"Friends":"Friend Requests"}</h1><p><i/>{tab==="world"?"Live · 1,248 players online":"1,248 Players Online"}</p></div></header>
   <nav className="chatTabs"><button className={tab==="world"?"active":""} onClick={()=>setTab("world")}><Globe2/>World</button><button className={tab==="friends"?"active":""} onClick={()=>setTab("friends")}><Users/>Friends</button><button className={tab==="requests"?"active":""} onClick={()=>setTab("requests")}><UserPlus/>Requests <em>3</em></button></nav>

   {tab==="world" && <div className="messageList" aria-live="polite">
    {[...world,...live].map(([n,f,a,m,t],i)=><div key={`${n}-${i}`} className="messageRow"><span className={`personAvatar av${i%6}`}>{a}</span><span className="messageCopy"><b>{n} {f}</b><small>{m}</small></span><time className={t==="Live"?"liveTime":""}>{t}</time></div>)}
    {sent.map((m,i)=><div key={`me-${i}`} className="messageRow myWorld"><span className="personAvatar me">🧑‍🚀</span><span className="messageCopy"><b>You 🇫🇷</b><small>{m}</small></span><time>Now</time></div>)}
   </div>}

   {tab==="friends" && <div className="friendList">{friends.map(([n,f,a,s,l],i)=><button className="friendRow" key={n} onClick={()=>i===0&&setTab("private")}><span className={`personAvatar av${i}`}>{a}</span><span className="friendCopy"><b>{n} {f}</b><small className={s==="Offline"?"offline":"online"}>{s} · {l}</small></span><span className="challenge"><Swords/>Challenge</span></button>)}</div>}

   {tab==="requests" && <div className="requests"><div className="requestCard"><span className="personAvatar">🦊</span><span><b>Mika 🇯🇵</b><small>Lv 21 · 12 mutual players</small></span><button>Accept</button></div><div className="requestCard"><span className="personAvatar">🧢</span><span><b>Omar 🇲🇦</b><small>Lv 17 · Geography fan</small></span><button>Accept</button></div><div className="requestCard"><span className="personAvatar">🎒</span><span><b>Chloe 🇫🇷</b><small>Lv 29 · Diamond league</small></span><button>Accept</button></div></div>}

   {tab==="world" && <form className="worldComposer" onSubmit={send}><MessageCircle/><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Message everyone..."/><button aria-label="Send world message"><Send/></button></form>}
  </> : <>
   <header className="privateHead"><button className="roundBack" onClick={()=>setTab("friends")}><ArrowLeft/></button><span className="personAvatar sakura">🌸</span><div><h2>Sakura 🇯🇵</h2><p>● Online</p></div><button className="duel"><Swords/></button></header>
   <div className="privateBody"><p className="their">Hey! 👋</p><p className="their">Nice to meet you!</p><p className="mine">Let's play a challenge!<br/>Are you online? 🎮</p><p className="their">Yes! Let's go! 😍</p><div className="invite"><Swords/><span><b>1v1 Challenge</b><small>Quirk Maps · 10 questions</small></span><button>PLAY</button></div>{sent.map((m,i)=><p key={i} className="mine">{m}</p>)}</div>
   <form className="privateComposer" onSubmit={send}><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Message Sakura..."/><button aria-label="Send private message"><Send/></button></form>
  </>}
  <div className="homeBar"/>
 </section></main>
}
