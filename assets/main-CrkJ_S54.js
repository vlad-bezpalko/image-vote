(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const u="https://script.google.com/macros/s/AKfycbzZhVFFpkuf36AOfC8SOFlNUjnylFOtuOnIzgtBTYdzFL5NSYkSHv-eosYHrjzdw1YE/exec",c=[{id:"img1",name:"Cybernetic Forest",src:"img1.png"},{id:"img2",name:"Steampunk City",src:"img2.png"},{id:"img3",name:"Underwater Palace",src:"img3.png"},{id:"img4",name:"Cosmic Nebula",src:"img4.png"}],y=document.getElementById("loading"),l=document.getElementById("toast");function d(s){y&&(y.style.display=s?"flex":"none")}function f(s){l&&(l.textContent=s,l.style.display="block",setTimeout(()=>{l.style.display="none"},3e3))}async function w(s,t){d(!0);try{const n=await fetch(u,{method:"POST",body:JSON.stringify({imageName:s,pointChange:t}),mode:"no-cors"});f(`Voted! (${t>0?"+":""}${t} points)`)}catch(n){console.error("Vote failed:",n),f("Failed to vote. Check console.")}finally{d(!1)}}async function b(){console.log("[DEBUG] Starting fetchResults..."),console.log("[DEBUG] API_URL:",u),d(!0);try{const s=new URL(u);s.searchParams.set("_t",Date.now()),console.log("[DEBUG] Final Request URL:",s.toString());const t=await fetch(s);if(console.log("[DEBUG] Response Status:",t.status),!t.ok)throw new Error(`Google Script returned error: ${t.status} ${t.statusText}`);const n=await t.json();return console.log("[DEBUG] Data Received:",n),n}catch(s){return console.error("[DEBUG] CRITICAL ERROR:",s),f("Connection failed! See Console (F12) for details."),c.map(t=>({...t,points:0}))}finally{d(!1)}}function $(){const s=document.getElementById("gallery");if(!s)return;const t="/image-vote/";s.innerHTML=c.map(n=>`
    <div class="image-card">
      <div class="image-container">
        <img src="${n.src.startsWith("http")?n.src:`${t}${n.src}`}" alt="${n.name}">
      </div>
      <div class="image-info">
        <h3 class="image-title">${n.name}</h3>
        <div class="vote-controls">
          <button class="btn btn-up" onclick="window.vote('${n.name}', 10)">
            <span>👍</span> +10
          </button>
          <button class="btn btn-down" onclick="window.vote('${n.name}', -5)">
            <span>👎</span> -5
          </button>
        </div>
      </div>
    </div>
  `).join("")}async function S(){const s=document.getElementById("results-gallery");if(!s)return;const t=await b();let n="/image-vote/";n.endsWith("/")||(n+="/");const i=Math.max(...t.map(e=>e.points));s.innerHTML=t.map((e,o)=>{let r=c.find(m=>m.name===e.name);!r&&c[o]&&(r=c[o]);const g=i>0&&e.points===i,a=r&&r.src?r.src:"",p=e.name||(r?r.name:"Unknown");let h=a;if(a&&!a.startsWith("http")){const m=a.replace(/^(\.\/|\/)/,"");h=`${n}${m}`}return`
      <div class="image-card ${g?"winner-frame":""}">
        <div class="image-container">
          <img src="${h}" alt="${p}" onerror="this.src='https://via.placeholder.com/400?text=Missing+Image'">
          ${g?'<span class="winner-tag">Переможець</span>':""}
        </div>
        <div class="image-info">
          <h3 class="image-title">${p}</h3>
          <div class="points-badge">${e.points} ВлаДіка-поінтів</div>
        </div>
      </div>
    `}).join("")}window.vote=w;const v=window.location.pathname;v.includes("results.html")||v.endsWith("/results")?S():$();
