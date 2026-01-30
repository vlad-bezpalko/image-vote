(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const m="https://script.google.com/macros/s/AKfycbzZhVFFpkuf36AOfC8SOFlNUjnylFOtuOnIzgtBTYdzFL5NSYkSHv-eosYHrjzdw1YE/exec",c=[{id:"img1",name:"Cybernetic Forest",src:"img1.png"},{id:"img2",name:"Steampunk City",src:"img2.png"},{id:"img3",name:"Underwater Palace",src:"img3.png"},{id:"img4",name:"Cosmic Nebula",src:"img4.png"}],y=document.getElementById("loading"),l=document.getElementById("toast");function d(n){y&&(y.style.display=n?"flex":"none")}function f(n){l&&(l.textContent=n,l.style.display="block",setTimeout(()=>{l.style.display="none"},3e3))}async function b(n,t){console.log(`[DEBUG] Voting for "${n}" (${t})...`),d(!0);try{const o=await fetch(m,{method:"POST",body:JSON.stringify({imageName:n,pointChange:t}),mode:"no-cors",redirect:"follow"});console.log("[DEBUG] Vote request sent. Status is opaque (no-cors mode), but redirect 302 is normal."),f(`Vote submitted (+${t})`),window.location.pathname.includes("results")&&setTimeout(w,2e3)}catch(o){console.error("[DEBUG] Vote failed!",o),f("Failed to vote. See browser console.")}finally{d(!1)}}async function $(){console.log("[DEBUG] Starting fetchResults..."),console.log("[DEBUG] API_URL:",m),d(!0);try{const n=new URL(m);n.searchParams.set("_t",Date.now()),console.log("[DEBUG] Final Request URL:",n.toString());const t=await fetch(n);if(console.log("[DEBUG] Response Status:",t.status),!t.ok)throw new Error(`Google Script returned error: ${t.status} ${t.statusText}`);const o=await t.json();return console.log("[DEBUG] Data Received:",o),o}catch(n){return console.error("[DEBUG] CRITICAL ERROR:",n),f("Connection failed! See Console (F12) for details."),c.map(t=>({...t,points:0}))}finally{d(!1)}}function S(){const n=document.getElementById("gallery");if(!n)return;const t="/image-vote/";n.innerHTML=c.map(o=>`
    <div class="image-card">
      <div class="image-container">
        <img src="${o.src.startsWith("http")?o.src:`${t}${o.src}`}" alt="${o.name}">
      </div>
      <div class="image-info">
        <h3 class="image-title">${o.name}</h3>
        <div class="vote-controls">
          <button class="btn btn-up" onclick="window.vote('${o.name}', 10)">
            <span>👍</span> +10
          </button>
          <button class="btn btn-down" onclick="window.vote('${o.name}', -5)">
            <span>👎</span> -5
          </button>
        </div>
      </div>
    </div>
  `).join("")}async function w(){const n=document.getElementById("results-gallery");if(!n)return;const t=await $();let o="/image-vote/";o.endsWith("/")||(o+="/");const i=Math.max(...t.map(e=>e.points));n.innerHTML=t.map((e,s)=>{let r=c.find(u=>u.name===e.name);!r&&c[s]&&(r=c[s]);const g=i>0&&e.points===i,a=r&&r.src?r.src:"",p=e.name||(r?r.name:"Unknown");let h=a;if(a&&!a.startsWith("http")){const u=a.replace(/^(\.\/|\/)/,"");h=`${o}${u}`}return`
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
    `}).join("")}window.vote=b;const v=window.location.pathname;v.includes("results.html")||v.endsWith("/results")?w():S();
