!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}({1:function(e,t){e.exports=function(e,t,n,r){t=isNaN(t=Math.abs(t))?2:t,n=void 0==n?".":n,r=void 0==r?",":r;const o=e<0?"-":"",a=String(parseInt(e=Math.abs(Number(e)||0).toFixed(t))),i=a.length>3?a.length%3:0;return o+(i?a.substr(0,i)+r:"")+a.substr(i).replace(/(\d{3})(?=\d)/g,"$1"+r)+(t?n+Math.abs(e-a).toFixed(t).slice(2):"")}},12:function(e,t,n){const r=n(1);document.querySelectorAll(".accept").forEach(e=>{e.addEventListener("click",()=>{confirm(`Jóváhagyod a rendelést?\nRendelés azonosító: ${e.dataset.id}`)&&fetch(`http://localhost:3000/admin/orders/${e.dataset.id}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then(()=>location.reload())})}),document.querySelectorAll(".shipping").forEach(e=>{e.addEventListener("click",()=>{confirm(`A terméket/termékeket átvette a futárszolgálat?\nRendelés azonosító: ${e.dataset.id}`)&&fetch(`http://localhost:3000/admin/orders/${e.dataset.id}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then(()=>location.reload())})}),document.querySelectorAll(".finish").forEach(e=>{e.addEventListener("click",()=>{confirm(`A rendelés lezárható?\nRendelés azonosító: ${e.dataset.id}`)&&fetch(`http://localhost:3000/admin/orders/${e.dataset.id}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then(()=>location.reload())})}),document.querySelectorAll(".delete").forEach(e=>{e.addEventListener("click",()=>{confirm(`Biztosan törlöd a rendelést?\nRendelés azonosító: ${e.dataset.id}`)&&fetch(`http://localhost:3000/admin/orders/${e.dataset.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"},credentials:"include"}).then(()=>location.reload())})});const o=document.querySelector("#searchModal"),a=document.querySelector(".orderDescription-modal"),i=a.querySelector(".content"),c=a.querySelector(".loader");document.querySelectorAll(".line").forEach(e=>{e.addEventListener("click",t=>{if("A"==t.target.nodeName)return!1;o.classList.add("active"),a.classList.add("active"),a.querySelector(".title").innerHTML=`Rendelés ${e.dataset.id}`,fetch(`http://localhost:3000/admin/orders/description/${e.dataset.id}`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then(e=>e.json()).then(e=>{i.querySelector(".email").innerHTML=e[0][0].email,i.querySelector(".name").innerHTML=e[0][0].nev,i.querySelector(".tel").innerHTML=e[0][0].tel,i.querySelector(".city").innerHTML=e[0][0].irszam+" "+e[0][0].varos,i.querySelector(".address").innerHTML=e[0][0].utcaHazszam,i.querySelector(".date").innerHTML=e[0][0].datum,i.querySelector(".status").innerHTML=e[0][0].allapot,i.querySelector(".finalPrice").innerHTML=r(e[0][0].ar_osszes,0,"."," ")+" Ft";for(const t of e[1]){const e=document.createElement("div");e.classList.add("row","no-wrap","item-details");const n=document.createElement("div");n.classList.add("left");const o=document.createElement("div");n.classList.add("right"),n.innerHTML=`${t.darab} x ${t.gyarto} ${t.termek}`,o.innerHTML=r(t.arosszes,0,"."," ")+" Ft",e.appendChild(n),e.appendChild(o);const a=document.querySelector(".appendAfter");a.parentNode.insertBefore(e,a.nextSibling)}i.classList.add("show"),c.classList.remove("active")})})}),document.querySelector(".close-orderDescription-modal").addEventListener("click",()=>{o.classList.remove("active"),a.classList.remove("active"),i.classList.remove("show"),setTimeout(()=>{c.classList.add("active"),i.querySelectorAll(".item-details").forEach(e=>e.remove())},250)})}});