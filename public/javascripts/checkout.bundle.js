!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=25)}({23:function(e,t){const r=document.querySelector("#utanvet");let n;document.querySelectorAll(".btnStep").forEach(e=>{if(2==+e.dataset.id)return n=e}),r.addEventListener("click",()=>{r.checked&&n.classList.remove("disabled")})},24:function(e,t,r){r(5);const n=document.querySelector("#name"),a=document.querySelector("#email"),l=document.querySelector("#city"),c=document.querySelector("#zip"),i=document.querySelector("#address"),o=document.querySelector("#mobile");let s;function d(){n.value.length<5||!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(a.value)||l.value.length<2||c.value.length<4||i.value.length<5||o.value.length<5?s.classList.add("disabled"):s.classList.remove("disabled")}document.querySelectorAll(".btnStep").forEach(e=>{if(1==+e.dataset.id)return s=e}),n.addEventListener("keyup",()=>d()),a.addEventListener("keyup",()=>d()),c.addEventListener("keyup",()=>d()),i.addEventListener("keyup",()=>d()),o.addEventListener("keyup",()=>d()),l.addEventListener("keyup",()=>{d(),c.classList.add("used"),fetch("http://localhost:3000/api/city",{method:"POST",body:JSON.stringify({city:l.value}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>c.value=e.irszam).catch(e=>console.log(e))})},25:function(e,t,r){r(6),r(24),r(23)},5:function(e,t){const r=document.querySelector("#email"),n=document.querySelector("#err_email");function a(e){r.classList.remove("valid"),r.classList.add("error"),n.classList.add("active"),n.innerHTML=e}r.addEventListener("keyup",()=>{""===r.value.trim()?a("Az email mező nem lehet üres"):/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(r.value)?(r.classList.add("valid"),r.classList.remove("error"),n.classList.remove("active"),setTimeout(()=>n.innerHTML="",350)):a("Az email cím nem megfelelő formátumú")})},6:function(e,t){let r=document.querySelectorAll(".btnStep"),n=document.querySelectorAll(".steps_back"),a=document.querySelectorAll(".step"),l=document.querySelectorAll(".circleP");r.forEach(e=>{e.addEventListener("click",()=>{let t=+e.dataset.id;a.forEach(e=>{+e.dataset.id===t+1?e.classList.add("visible"):e.classList.remove("visible")}),l.forEach(e=>{+e.dataset.id===t+1?e.classList.add("active"):e.classList.remove("active")})})}),n.forEach(e=>{e.addEventListener("click",()=>{let t=+e.dataset.id;a.forEach(e=>{+e.dataset.id==t-1?e.classList.add("visible"):e.classList.remove("visible")}),l.forEach(e=>{+e.dataset.id==t-1?e.classList.add("active"):e.classList.remove("active")})})})}});