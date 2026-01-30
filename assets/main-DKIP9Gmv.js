(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const f="https://script.google.com/macros/s/AKfycbzZhVFFpkuf36AOfC8SOFlNUjnylFOtuOnIzgtBTYdzFL5NSYkSHv-eosYHrjzdw1YE/exec",d=[{id:"img1",name:"Дім Ритму",src:"./img1.png"},{id:"img2",name:"Дім Систем",src:"./img2.png"},{id:"img3",name:"Дім Присутності",src:"./img3.png"},{id:"img4",name:"Дім Витоків",src:"./img4.png"}],m=document.getElementById("loading"),a=document.getElementById("toast");function c(n){m&&(m.style.display=n?"flex":"none")}function l(n){a&&(a.textContent=n,a.style.display="block",setTimeout(()=>{a.style.display="none"},3e3))}async function p(n,e){c(!0);try{const i=await fetch(f,{method:"POST",body:JSON.stringify({imageName:n,pointChange:e}),mode:"no-cors"});l(`Voted! (${e>0?"+":""}${e} points)`)}catch(i){console.error("Vote failed:",i),l("Failed to vote. Check console.")}finally{c(!1)}}async function g(){c(!0);try{return await(await fetch(f)).json()}catch(n){return console.error("Fetch failed:",n),l("Failed to load results."),d.map(e=>({...e,points:0}))}finally{c(!1)}}function y(){const n=document.getElementById("gallery");n&&(n.innerHTML=d.map(e=>`
    <div class="image-card">
      <div class="image-container">
        <img src="${e.src}" alt="${e.name}">
      </div>
      <div class="image-info">
        <h3 class="image-title">${e.name}</h3>
        <div class="vote-controls">
          <button class="btn btn-up" onclick="window.vote('${e.name}', 10)">
            <span>👍</span> +10
          </button>
          <button class="btn btn-down" onclick="window.vote('${e.name}', -5)">
            <span>👎</span> -5
          </button>
        </div>
      </div>
    </div>
  `).join(""))}async function h(){const n=document.getElementById("results-gallery");if(!n)return;const e=await g(),i=Math.max(...e.map(o=>o.points));e.filter(o=>o.points===i&&i>0),n.innerHTML=e.map(o=>{const t=d.find(r=>r.name===o.name)||{src:""},s=i>0&&o.points===i;return`
      <div class="image-card ${s?"winner-frame":""}">
        <div class="image-container">
          <img src="${t.src}" alt="${o.name}">
          ${s?'<span class="winner-tag">Winner</span>':""}
        </div>
        <div class="image-info">
          <h3 class="image-title">${o.name}</h3>
          <div class="points-badge">${o.points} pts</div>
        </div>
      </div>
    `}).join("")}window.vote=p;const u=window.location.pathname;u.includes("results.html")||u.endsWith("/results")?h():y();
