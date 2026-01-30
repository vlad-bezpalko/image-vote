(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="https://script.google.com/macros/s/AKfycbzZhVFFpkuf36AOfC8SOFlNUjnylFOtuOnIzgtBTYdzFL5NSYkSHv-eosYHrjzdw1YE/exec",a=[{id:"img1",name:"Cybernetic Forest",src:"img1.png"},{id:"img2",name:"Steampunk City",src:"img2.png"},{id:"img3",name:"Underwater Palace",src:"img3.png"},{id:"img4",name:"Cosmic Nebula",src:"img4.png"}],h=document.getElementById("loading"),l=document.getElementById("toast");function d(n){h&&(h.style.display=n?"flex":"none")}function u(n){l&&(l.textContent=n,l.style.display="block",setTimeout(()=>{l.style.display="none"},3e3))}async function w(n,t){d(!0);try{const s=await fetch(v,{method:"POST",body:JSON.stringify({imageName:n,pointChange:t}),mode:"no-cors"});u(`Voted! (${t>0?"+":""}${t} points)`)}catch(s){console.error("Vote failed:",s),u("Failed to vote. Check console.")}finally{d(!1)}}async function b(){d(!0);try{const n=new URL(v);n.searchParams.set("_t",Date.now());const t=await fetch(n);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(n){return console.error("Fetch failed:",n),u('Failed to load results. Check if API URL is correct and shared as "Anyone".'),a.map(t=>({...t,points:0}))}finally{d(!1)}}function $(){const n=document.getElementById("gallery");if(!n)return;const t="/image-vote/";n.innerHTML=a.map(s=>`
    <div class="image-card">
      <div class="image-container">
        <img src="${s.src.startsWith("http")?s.src:`${t}${s.src}`}" alt="${s.name}">
      </div>
      <div class="image-info">
        <h3 class="image-title">${s.name}</h3>
        <div class="vote-controls">
          <button class="btn btn-up" onclick="window.vote('${s.name}', 10)">
            <span>👍</span> +10
          </button>
          <button class="btn btn-down" onclick="window.vote('${s.name}', -5)">
            <span>👎</span> -5
          </button>
        </div>
      </div>
    </div>
  `).join("")}async function L(){const n=document.getElementById("results-gallery");if(!n)return;const t=await b();let s="/image-vote/";s.endsWith("/")||(s+="/");const i=Math.max(...t.map(e=>e.points));n.innerHTML=t.map((e,o)=>{let r=a.find(m=>m.name===e.name);!r&&a[o]&&(r=a[o]);const f=i>0&&e.points===i,c=r&&r.src?r.src:"",p=e.name||(r?r.name:"Unknown");let g=c;if(c&&!c.startsWith("http")){const m=c.replace(/^(\.\/|\/)/,"");g=`${s}${m}`}return`
      <div class="image-card ${f?"winner-frame":""}">
        <div class="image-container">
          <img src="${g}" alt="${p}" onerror="this.src='https://via.placeholder.com/400?text=Missing+Image'">
          ${f?'<span class="winner-tag">Переможець</span>':""}
        </div>
        <div class="image-info">
          <h3 class="image-title">${p}</h3>
          <div class="points-badge">${e.points} ВлаДіка-поінтів</div>
        </div>
      </div>
    `}).join("")}window.vote=w;const y=window.location.pathname;y.includes("results.html")||y.endsWith("/results")?L():$();
