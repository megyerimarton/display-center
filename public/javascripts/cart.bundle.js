!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=20)}([,,function(t,e){t.exports=function(t){return fetch(`${window.location.origin}/api/cart`,{method:"POST",body:JSON.stringify({id:t}),headers:{"Content-Type":"application/json"},credentials:"include"}).then(t=>t.json())}},function(t,e){t.exports=function(t,e,n,o){e=isNaN(e=Math.abs(e))?2:e,n=void 0==n?".":n,o=void 0==o?",":o;const r=t<0?"-":"",a=String(parseInt(t=Math.abs(Number(t)||0).toFixed(e))),i=a.length>3?a.length%3:0;return r+(i?a.substr(0,i)+o:"")+a.substr(i).replace(/(\d{3})(?=\d)/g,"$1"+o)+(e?n+Math.abs(t-a).toFixed(e).slice(2):"")}},,function(t,e,n){const o=n(3);t.exports=function(){let t=0;document.querySelectorAll(".cartItem").forEach(e=>{e.classList.contains("removed")||(t+=parseInt(e.dataset.price*e.dataset.quantity))}),document.querySelector("#cartValue").innerHTML=o(t,0,"."," ")+" Ft",document.querySelector("#cartValueEnd").innerHTML=o(t,0,"."," ")+" Ft"}},,,,,,,,,,,,function(t,e,n){const o=n(5);t.exports=function(t){t.querySelector(".removeFromCart").addEventListener("click",()=>{fetch(`${window.location.origin}/api/cart`,{method:"DELETE",body:JSON.stringify({id:t.dataset.id}),headers:{"Content-Type":"application/json"},credentials:"include"}).then(t=>console.log(t.json())).then(()=>{t.classList.add("removed"),o(t);let e=!0;document.querySelectorAll(".cartItem").forEach(t=>{t.classList.contains("removed")||(e=!1)}),e&&(document.querySelector("#buyPanel").classList.add("hidden"),document.querySelector(".cartMessage").classList.add("show"));const n=document.querySelector("#menuitem_cart_mobile");n.dataset.cartcounter--,0==+n.dataset.cartcounter&&n.classList.remove("show")})})}},function(t,e,n){const o=n(5);n(2);let r=!1;t.exports=function(t){t.querySelector(".sub").addEventListener("click",()=>{!r&&t.dataset.quantity>1&&(r=!0,fetch(`${window.location.origin}/api/cart`,{method:"PATCH",body:JSON.stringify({id:t.dataset.id}),headers:{"Content-Type":"application/json"},credentials:"include"}).then(t=>t.json()).then(()=>{t.dataset.quantity--,t.querySelector(".quantity-value").innerHTML=t.dataset.quantity,o(t),r=!1}))})}},function(t,e,n){const o=n(5),r=n(2);let a=!1;t.exports=function(t){t.querySelector(".add").addEventListener("click",()=>{!a&&t.dataset.quantity<10&&(a=!0,r(t.dataset.id).then(()=>{t.dataset.quantity++,t.querySelector(".quantity-value").innerHTML=t.dataset.quantity,o(t),a=!1}))})}},function(t,e,n){const o=n(19),r=n(18),a=n(17);document.querySelectorAll(".cartItem").forEach(t=>{o(t),r(t),a(t)})}]);