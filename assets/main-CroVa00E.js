(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const v="https://script.google.com/macros/s/AKfycbzZhVFFpkuf36AOfC8SOFlNUjnylFOtuOnIzgtBTYdzFL5NSYkSHv-eosYHrjzdw1YE/exec",c=[{id:"img1",name:"Cybernetic Forest",src:"img1.png"},{id:"img2",name:"Steampunk City",src:"img2.png"},{id:"img3",name:"Underwater Palace",src:"img3.png"},{id:"img4",name:"Cosmic Nebula",src:"img4.png"}],y=document.getElementById("loading"),l=document.getElementById("toast");function d(n){y&&(y.style.display=n?"flex":"none")}function u(n){l&&(l.textContent=n,l.style.display="block",setTimeout(()=>{l.style.display="none"},3e3))}async function w(n,s){d(!0);try{const t=await fetch(v,{method:"POST",body:JSON.stringify({imageName:n,pointChange:s}),mode:"no-cors"});u(`Voted! (${s>0?"+":""}${s} points)`)}catch(t){console.error("Vote failed:",t),u("Failed to vote. Check console.")}finally{d(!1)}}async function b(){d(!0);try{return await(await fetch(v)).json()}catch(n){return console.error("Fetch failed:",n),u("Failed to load results."),c.map(s=>({...s,points:0}))}finally{d(!1)}}function $(){const n=document.getElementById("gallery");if(!n)return;const s="/image-vote/";n.innerHTML=c.map(t=>`
    <div class="image-card">
      <div class="image-container">
        <img src="${t.src.startsWith("http")?t.src:`${s}${t.src}`}" alt="${t.name}">
      </div>
      <div class="image-info">
        <h3 class="image-title">${t.name}</h3>
        <div class="vote-controls">
          <button class="btn btn-up" onclick="window.vote('${t.name}', 10)">
            <span>👍</span> +10
          </button>
          <button class="btn btn-down" onclick="window.vote('${t.name}', -5)">
            <span>👎</span> -5
          </button>
        </div>
      </div>
    </div>
  `).join("")}async function O(){const n=document.getElementById("results-gallery");if(!n)return;const s=await b();let t="/image-vote/";t.endsWith("/")||(t+="/");const r=Math.max(...s.map(e=>e.points));n.innerHTML=s.map((e,o)=>{let i=c.find(m=>m.name===e.name);!i&&c[o]&&(i=c[o]);const f=r>0&&e.points===r,a=i&&i.src?i.src:"",p=e.name||(i?i.name:"Unknown");let g=a;if(a&&!a.startsWith("http")){const m=a.replace(/^(\.\/|\/)/,"");g=`${t}${m}`}return`
      <div class="image-card ${f?"winner-frame":""}">
        <div class="image-container">
          <img src="${g}" alt="${p}" onerror="this.src='https://via.placeholder.com/400?text=Missing+Image'">
          ${f?'<span class="winner-tag">Winner</span>':""}
        </div>
        <div class="image-info">
          <h3 class="image-title">${p}</h3>
          <div class="points-badge">${e.points} pts</div>
        </div>
      </div>
    `}).join("")}window.vote=w;const h=window.location.pathname;h.includes("results.html")||h.endsWith("/results")?O():$();
