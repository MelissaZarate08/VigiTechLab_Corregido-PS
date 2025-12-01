import{n as i}from"./index-DG_JPB1t.js";const d="http://44.218.235.104:8080/api";async function m(){const t=localStorage.getItem("authToken"),n=await fetch(`${d}/users`,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!n.ok){const a=await n.json();throw new Error(a.message||"Error al obtener usuarios")}const{users:o}=await n.json();return o}async function u(t,n){const o=localStorage.getItem("authToken"),a=await fetch(`${d}/users/${t}/status`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({active:n})});if(!a.ok){const r=await a.json();throw new Error(r.message||"Error al actualizar estado")}return a.json()}function g(){const t=JSON.parse(localStorage.getItem("currentUser"));if(!t||t.role!=="admin")return i("#/dashboard");document.getElementById("admin-name").textContent=t.name;const n=document.getElementById("btn-user"),o=document.getElementById("dropdown-user");n.addEventListener("click",()=>o.classList.toggle("hidden")),document.getElementById("logout").addEventListener("click",()=>{localStorage.removeItem("authToken"),localStorage.removeItem("currentUser"),i("#/")});const a=document.getElementById("users-container");m().then(r=>{r.forEach(e=>{const s=document.createElement("div");s.classList.add("row"),s.innerHTML=`
          <div class="cell">${e.name}</div>
          <div class="cell">${e.id}</div>
          <div class="cell">${e.email}</div>
          <div class="cell">
            <button class="toggle-btn">
              ${e.active?"Desactivar":"Activar"}
            </button>
          </div>
        `;const c=s.querySelector(".toggle-btn");c.addEventListener("click",async()=>{try{await u(e.id,!e.active),e.active=!e.active,c.textContent=e.active?"Desactivar":"Activar"}catch(l){alert(l.message)}}),a.appendChild(s)})}).catch(r=>alert(r.message))}document.addEventListener("DOMContentLoaded",g);export{g as initAdminDashboard};
