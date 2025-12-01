import{n as b}from"./index-DG_JPB1t.js";import{C as u}from"./auto-iNj9SIZ4.js";const g=document.getElementById("periodFilter"),o=document.getElementById("results"),w=document.getElementById("downloadBtn"),$=document.getElementById("backBtn"),y="http://54.91.198.118:8000/particle";g.addEventListener("change",()=>m(g.value));w.addEventListener("click",()=>{window.open(`${y}/pdf/${g.value}`,"_blank")});$.addEventListener("click",()=>b("#/particle"));window.addEventListener("DOMContentLoaded",()=>m("today"));async function m(c){o.style.display="none";try{const n=await fetch(`${y}/report/${c}`);if(!n.ok){const t=await n.json().catch(()=>({}));throw new Error(t.detail||`Error ${n.status}`)}const{label:r,stats:p,risk:d,times_label:a,series:s}=await n.json();x(r,p,d,a,s)}catch(n){o.innerHTML=`
      <p style="color:red; text-align:center;">
        ${n.message}
      </p>`,h()}}function x(c,n,r,p,d){const a=document.createElement("h2");a.id="period-label",a.textContent=c;let s='<div class="stats-grid">';for(let[t,e]of Object.entries(n)){if(t==="count")continue;const l=r[t]!=null?`${(r[t]*100).toFixed(1)}%`:"N/A";s+=`
      <div class="stats-card">
        <h3>${t.toUpperCase()}</h3>
        <p><strong>Media:</strong> ${e.mean.toFixed(2)}</p>
        <p><strong>Mín:</strong> ${e.min.toFixed(2)}</p>
        <p><strong>Máx:</strong> ${e.max.toFixed(2)}</p>
        <p><strong>Riesgo:</strong> ${l}</p>
      </div>
    `}s+="</div>";for(let t of Object.keys(d)){const e=t.replace(/_/g," ").toUpperCase();s+=`
      <div class="metric-block">
        <div class="metric-header">${e}</div>
        <div class="chart-container">
          <canvas id="chart_${t}" width="400" height="200"></canvas>
        </div>
      </div>
    `}o.innerHTML="",o.appendChild(a),o.insertAdjacentHTML("beforeend",s),h();for(let[t,e]of Object.entries(d)){const l=document.getElementById(`chart_${t}`).getContext("2d");if(e.every(i=>i===0||i===1)){const i=e.filter(v=>v===1).length,f=e.length-i;new u(l,{type:"doughnut",data:{labels:["Crítico","Seguro"],datasets:[{data:[i,f],backgroundColor:["rgba(255, 99, 132, 0.6)","rgba(75, 192, 192, 0.6)"]}]},options:{responsive:!0}})}else new u(l,{type:"line",data:{labels:p,datasets:[{label:t.toUpperCase(),data:e,fill:!1,tension:.1,pointRadius:4}]},options:{responsive:!0,scales:{x:{title:{display:!0,text:"Fecha / Hora"}},y:{title:{display:!0,text:t.toUpperCase()}}}}})}}function h(){o.style.display="flex",o.style.opacity="0",setTimeout(()=>o.style.opacity="1",20)}
