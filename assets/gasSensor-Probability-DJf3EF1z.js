import{C as g}from"./auto-iNj9SIZ4.js";import{n as b}from"./index-DG_JPB1t.js";const c=document.getElementById("periodFilter"),i=document.getElementById("results"),h=document.getElementById("downloadBtn"),w=document.getElementById("backBtn"),u="http://54.91.198.118:8000/gas";c.addEventListener("change",()=>f(c.value));h.addEventListener("click",()=>{window.open(`${u}/pdf/${c.value}`,"_blank")});w.addEventListener("click",()=>b("#/gas"));window.addEventListener("DOMContentLoaded",()=>f("today"));async function f(r){try{const e=await fetch(`${u}/report/${r}`);if(!e.ok)throw new Error(`Error ${e.status}`);const a=await e.json();k(a)}catch(e){i.innerHTML=`<p style="color:red; text-align:center;">${e.message}</p>`,m()}}function k({label:r,stats:e,risk:a,timeseries:l}){let d='<div class="stats-grid">';for(let[t,o]of Object.entries(e)){if(t==="count")continue;let s=a[t]!=null?`${(a[t]*100).toFixed(1)}%`:"N/A";d+=`
      <div class="stats-card">
        <h3>${t.toUpperCase()}</h3>
        <p><strong>Media:</strong> ${o.mean.toFixed(2)}</p>
        <p><strong>Mín:</strong> ${o.min.toFixed(2)}</p>
        <p><strong>Máx:</strong> ${o.max.toFixed(2)}</p>
        <p><strong>Riesgo:</strong> ${s}</p>
      </div>
    `}d+="</div>";for(let t of Object.keys(l))d+=`
      <div class="metric-block">
        <div class="metric-header">${t.toUpperCase()} (${r})</div>
        <div class="donut-container">
          <canvas id="donut-${t}"></canvas>
        </div>
        <div class="chart-container">
          <canvas id="line-${t}"></canvas>
        </div>
      </div>
    `;i.innerHTML=d,m();for(let t of Object.keys(l)){const o=l[t],s=o.map(n=>n.y),v=o.map(n=>new Date(n.x).toLocaleString()),p={lpg:800,co:50,smoke:300}[t],y=s.filter(n=>n<=p).length,$=s.filter(n=>n>p).length;new g(document.getElementById(`donut-${t}`),{type:"doughnut",data:{labels:["Seguro","Crítico"],datasets:[{data:[y,$],backgroundColor:["#77b4ff","#ff7f7f"]}]},options:{responsive:!0,plugins:{legend:{position:"bottom"}}}}),new g(document.getElementById(`line-${t}`),{type:"line",data:{labels:v,datasets:[{label:t.toUpperCase(),data:s,fill:!0,tension:.3,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(75,192,192,1)"}]},options:{responsive:!0,scales:{x:{ticks:{maxRotation:45,minRotation:30}}}}})}}function m(){i.style.display="flex",setTimeout(()=>i.style.opacity="1",20)}
