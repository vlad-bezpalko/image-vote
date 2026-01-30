(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const p="https://script.google.com/macros/s/AKfycbzZhVFFpkuf36AOfC8SOFlNUjnylFOtuOnIzgtBTYdzFL5NSYkSHv-eosYHrjzdw1YE/exec",a=[{id:"img1",name:"Cybernetic Forest",src:"img1.png"},{id:"img2",name:"Steampunk City",src:"img2.png"},{id:"img3",name:"Underwater Palace",src:"img3.png"},{id:"img4",name:"Cosmic Nebula",src:"img4.png"}],u=document.getElementById("loading"),c=document.getElementById("toast");function l(t){u&&(u.style.display=t?"flex":"none")}function d(t){c&&(c.textContent=t,c.style.display="block",setTimeout(()=>{c.style.display="none"},3e3))}async function h(t,n){l(!0);try{const s=await fetch(p,{method:"POST",body:JSON.stringify({imageName:t,pointChange:n}),mode:"no-cors"});d(`Voted! (${n>0?"+":""}${n} points)`)}catch(s){console.error("Vote failed:",s),d("Failed to vote. Check console.")}finally{l(!1)}}async function v(){l(!0);try{return await(await fetch(p)).json()}catch(t){return console.error("Fetch failed:",t),d("Failed to load results."),a.map(n=>({...n,points:0}))}finally{l(!1)}}function w(){const t=document.getElementById("gallery");if(!t)return;const n="/image-vote/";t.innerHTML=a.map(s=>`
    <div class="image-card">
      <div class="image-container">
        <img src="${s.src.startsWith("http")?s.src:`${n}${s.src}`}" alt="${s.name}">
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
  `).join("")}async function b(){const t=document.getElementById("results-gallery");if(!t)return;const n=await v(),s="/image-vote/",r=Math.max(...n.map(e=>e.points));t.innerHTML=n.map((e,o)=>{let i=a.find(y=>y.name===e.name);!i&&a[o]?i=a[o]:i||(i={src:"",name:e.name});const m=r>0&&e.points===r,g=i.src.startsWith("http")?i.src:`${s}${i.src}`;return`
      <div class="image-card ${m?"winner-frame":""}">
        <div class="image-container">
          <img src="${g}" alt="${e.name}">
          ${m?'<span class="winner-tag">Winner</span>':""}
        </div>
        <div class="image-info">
          <h3 class="image-title">${e.name}</h3>
          <div class="points-badge">${e.points} pts</div>
        </div>
      </div>
    `}).join("")}window.vote=h;const f=window.location.pathname;f.includes("results.html")||f.endsWith("/results")?b():w();
