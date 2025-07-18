(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();function y(t,e,r=0,i=255){return t<r||t>i||e<r||e>i?(alert(`Please enter numbers between ${r} and ${i}`),!1):!0}function b(){const t=document.getElementById("animationContainer");t.style.display="block",document.querySelectorAll(".step").forEach(e=>{e.style.opacity="0"})}function f(t){const e=[];let r=t;for(;r>0;){const i=Math.floor(r/2),n=r%2;e.push({current:r,quotient:i,remainder:n}),r=i}return e.length===0&&e.push({current:0,quotient:0,remainder:0}),e}function h(t,e,r,i,n){const s=document.getElementById("divisionAnimationNum1"),o=document.getElementById("divisionAnimationNum2"),c=document.getElementById("binaryConversion");s.innerHTML=`<strong>Number 1 (${t}) division by 2 steps:</strong>`,o.innerHTML=`<strong>Number 2 (${e}) division by 2 steps:</strong>`,c.innerHTML="",document.getElementById("step1").style.opacity="1";const l=f(t),p=f(e),g=Math.max(l.length,p.length);let a=0;function m(){if(a>=g){c.innerHTML=`
        <p>First number: ${t} in decimal</p>
        <p class="number-row">Binary: ${r}</p>
        <p>Second number: ${e} in decimal</p>
        <p class="number-row">Binary: ${i}</p>`,n&&n();return}if(a<l.length){const u=l[a];s.innerHTML+=`
        <div class="division-step">
          <span class="division-highlight">${u.current}</span> ÷ 2 = quotient: <strong>${u.quotient}</strong>, remainder: <strong>${u.remainder}</strong>
        </div>`}if(a<p.length){const u=p[a];o.innerHTML+=`
        <div class="division-step">
          <span class="division-highlight">${u.current}</span> ÷ 2 = quotient: <strong>${u.quotient}</strong>, remainder: <strong>${u.remainder}</strong>
        </div>`}a++,setTimeout(m,700)}m()}function $(t,e,r){const i=document.getElementById("binaryAlignment");i.innerHTML=`
    <p class="number-row">Number 1: ${t}</p>
    <p class="number-row">Number 2: ${e}</p>`,document.getElementById("step2").style.opacity="1",r&&setTimeout(r,1e3)}function d(t,e){let r="";for(let i=0;i<t.length;i++)i===e?r+=`<span class="highlight">${t[i]}</span>`:r+=t[i];return r}function v(t,e,r,i,n){const s=document.getElementById("operation");s.innerHTML=`
    <p class="number-row">Number 1: ${t}</p>
    <p class="number-row">Number 2: ${e}</p>
    <p class="number-row">${i}:       ${" ".repeat(8)}</p>`,document.getElementById("step3").style.opacity="1";let o="        ",c=0;function l(){if(c>=8){n&&n();return}setTimeout(()=>{const p=r[c];o=o.substring(0,c)+p+o.substring(c+1),s.innerHTML=`
        <p class="number-row">Number 1: ${d(t,c)}</p>
        <p class="number-row">Number 2: ${d(e,c)}</p>
        <p class="number-row">${i}:       ${d(o,c)}</p>`,c++,l()},500)}l()}function w(t,e,r,i,n,s,o){const c=document.getElementById("finalResult");c.innerHTML=`
    <p>Decimal representation:</p>
    <p>${t} ${o} ${e} = ${r}</p>
    <p>Binary representation:</p>
    <p class="number-row">${i} ${o} ${n} = ${s}</p>`,document.getElementById("step4").style.opacity="1"}function B(t,e,r,i){if(!y(t,e))return;const n=r(t,e),s=t.toString(2).padStart(8,"0"),o=e.toString(2).padStart(8,"0"),c=n.toString(2).padStart(8,"0");b(),h(t,e,s,o,()=>{setTimeout(()=>{$(s,o,()=>{v(s,o,c,i,()=>{setTimeout(()=>{w(t,e,n,s,o,c,i)},500)})})},1e3)})}function L(t,e){return t|e}function T(t,e){return t&e}function E(t,e){return t^e}export{L as a,E as b,T as c,B as r};
