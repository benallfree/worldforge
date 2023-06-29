!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c,l;function i(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function a(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function u(t,e,n){t.$$.on_destroy.push(a(e,n))}function f(t){return null==t?"":t}function d(t,e){t.appendChild(e)}function g(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function $(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function v(){return m(" ")}function y(){return m("")}function b(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function k(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e){return new t(e)}function C(t){l=t}function E(t){(function(){if(!l)throw new Error("Function called outside component initialization");return l})().$$.on_mount.push(t)}const S=[],A=[];let I=[];const N=[],_=Promise.resolve();let z=!1;function M(t){I.push(t)}const O=new Set;let P=0;function H(){if(0!==P)return;const t=l;do{try{for(;P<S.length;){const t=S[P];P++,C(t),F(t.$$)}}catch(e){throw S.length=0,P=0,e}for(C(null),S.length=0,P=0;A.length;)A.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];O.has(e)||(O.add(e),e())}I.length=0}while(S.length);for(;N.length;)N.pop()();z=!1,O.clear(),C(t)}function F(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const T=new Set;let j;function L(){j={r:0,c:[],p:j}}function R(){j.r||r(j.c),j=j.p}function W(t,e){t&&t.i&&(T.delete(t),t.i(e))}function B(t,e,n,r){if(t&&t.o){if(T.has(t))return;T.add(t),j.c.push((()=>{T.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function D(t){t&&t.c()}function q(t,n,s,c){const{fragment:l,after_update:i}=t.$$;l&&l.m(n,s),c||M((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):r(n),t.$$.on_mount=[]})),i.forEach(M)}function U(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];I.forEach((r=>-1===t.indexOf(r)?e.push(r):n.push(r))),n.forEach((t=>t())),I=e}(n.after_update),r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function J(t,e){-1===t.$$.dirty[0]&&(S.push(t),z||(z=!0,_.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function G(e,o,s,c,i,a,u,f=[-1]){const d=l;C(e);const g=e.$$={fragment:null,ctx:[],props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:o.target||d.$$.root};u&&u(g.root);let p=!1;if(g.ctx=s?s(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return g.ctx&&i(g.ctx[t],g.ctx[t]=o)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](o),p&&J(e,t)),n})):[],g.update(),p=!0,r(g.before_update),g.fragment=!!c&&c(g.ctx),o.target){if(o.hydrate){const t=($=o.target,Array.from($.childNodes));g.fragment&&g.fragment.l(t),t.forEach(h)}else g.fragment&&g.fragment.c();o.intro&&W(e.$$.fragment),q(e,o.target,o.anchor,o.customElement),H()}var $;C(d)}class V{$destroy(){U(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}let Y=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");const K=[];function Z(e,n=t){let r;const o=new Set;function c(t){if(s(e,t)&&(e=t,r)){const t=!K.length;for(const n of o)n[1](),K.push(n,e);if(t){for(let t=0;t<K.length;t+=2)K[t][0](K[t+1]);K.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(s,l=t){const i=[s,l];return o.add(i),1===o.size&&(r=n(c)||t),s(e),()=>{o.delete(i),0===o.size&&r&&(r(),r=null)}}}}const Q=t=>{if(t<st||t>ot)throw new Error(`Invalid height ${t}`);return t},X=t=>{if(t<0||t>et)throw new Error(`Row size ${t} out of range`);return t},tt=t=>{if(t<0||t>et)throw new Error(`Row size ${t} out of range`);return t},et=100,nt=t=>{if(t<0||t>et)throw new Error(`Grid size ${t} out of range`);return t},rt=(t,e)=>[X(parseInt(t.toString())),tt(parseInt(e.toString()))],ot=999,st=0;var ct=(t=>(t.Rock="R",t.Spring="S",t.Water="W",t.Land="L",t))(ct||{});const lt=(t,e)=>`${t}:${e}`,it=({x:t,y:e})=>lt(t,e),at=t=>{const[e,n]=t.split(/:/);if(void 0===e||void 0===n)throw new Error(`${t} is not a valid coordinate`);return((t,e)=>({x:X(parseInt(t.toString())),y:tt(parseInt(e.toString()))}))(e,n)};function ut(e){let n,r,o,s,c;return{c(){n=$("div"),n.textContent="WorldForge",r=v(),o=$("button"),o.textContent="Enter"},m(t,l){g(t,n,l),g(t,r,l),g(t,o,l),s||(c=b(o,"click",e[1]),s=!0)},p:t,i:t,o:t,d(t){t&&h(n),t&&h(r),t&&h(o),s=!1,c()}}}function ft(t){const{navigate:e}=He;return[e,()=>e(_e.Home)]}class dt extends V{constructor(t){super(),G(this,t,ft,ut,s,{})}}function gt(e){let n,r,s,c,l;return{c(){n=$("div"),r=$("img"),i(r.src,s=e[1])||x(r,"src",s),x(r,"class","svelte-g5d0f1"),x(n,"class","tile svelte-g5d0f1")},m(t,s){g(t,n,s),d(n,r),c||(l=b(n,"click",(function(){o(e[0])&&e[0].apply(this,arguments)})),c=!0)},p(t,[n]){e=t,2&n&&!i(r.src,s=e[1])&&x(r,"src",s)},i:t,o:t,d(t){t&&h(n),c=!1,l()}}}function ht(t,e,n){let r,{asset:o}=e,{onClick:s=(()=>{})}=e;return t.$$set=t=>{"asset"in t&&n(2,o=t.asset),"onClick"in t&&n(0,s=t.onClick)},t.$$.update=()=>{4&t.$$.dirty&&n(1,({sprite:r}=o),r)},[s,r,o]}class pt extends V{constructor(t){super(),G(this,t,ht,gt,s,{asset:2,onClick:0})}}function $t(t,e,n){const r=t.slice();return r[7]=e[n][0],r[8]=e[n][1],r}function mt(t){let e,n;function r(){return t[5](t[7])}return e=new pt({props:{asset:t[8],onClick:r}}),{c(){D(e.$$.fragment)},m(t,r){q(e,t,r),n=!0},p(n,o){t=n;const s={};1&o&&(s.asset=t[8]),1&o&&(s.onClick=r),e.$set(s)},i(t){n||(W(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function vt(t){let e,n,o,s,c,l,i,a=Object.entries(t[0]),u=[];for(let r=0;r<a.length;r+=1)u[r]=mt($t(t,a,r));const f=t=>B(u[t],1,1,(()=>{u[t]=null}));return{c(){for(let t=0;t<u.length;t+=1)u[t].c();e=v(),n=$("button"),n.textContent="New",o=v(),s=$("button"),s.textContent="close"},m(r,a){for(let t=0;t<u.length;t+=1)u[t]&&u[t].m(r,a);g(r,e,a),g(r,n,a),g(r,o,a),g(r,s,a),c=!0,l||(i=[b(n,"click",t[6]),b(s,"click",t[3])],l=!0)},p(t,[n]){if(5&n){let r;for(a=Object.entries(t[0]),r=0;r<a.length;r+=1){const o=$t(t,a,r);u[r]?(u[r].p(o,n),W(u[r],1)):(u[r]=mt(o),u[r].c(),W(u[r],1),u[r].m(e.parentNode,e))}for(L(),r=a.length;r<u.length;r+=1)f(r);R()}},i(t){if(!c){for(let t=0;t<a.length;t+=1)W(u[t]);c=!0}},o(t){u=u.filter(Boolean);for(let e=0;e<u.length;e+=1)B(u[e]);c=!1},d(t){p(u,t),t&&h(e),t&&h(n),t&&h(o),t&&h(s),l=!1,r(i)}}}function yt(t,e,n){let r,o;u(t,He,(t=>n(4,o=t)));const{createAsset:s,openAssetEditor:c,closeAssetEditor:l}=He;return t.$$.update=()=>{16&t.$$.dirty&&n(0,({assets:r}=o),r)},[r,s,c,l,o,t=>c(t),()=>{const t=s();c(t)}]}class bt extends V{constructor(t){super(),G(this,t,yt,vt,s,{})}}function xt(t,e,n){let r,o,s;if(t/=360,n/=100,0===(e/=100))r=o=s=n;else{const c=(t,e,n)=>(n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t),l=n<.5?n*(1+e):n+e-n*e,i=2*n-l;r=Math.round(255*c(i,l,t+1/3)),o=Math.round(255*c(i,l,t)),s=Math.round(255*c(i,l,t-1/3))}return[r,o,s]}function kt(t){const e=t.toString(16);return 1===e.length?`0${e}`:e}const wt="#00000000",Ct="#FFFFFF";function Et(t){const e=.06,n=[],r=t=>{const{r:e,g:n,b:r}=t,o=t=>{const e=t.toString(16);return 1===e.length?"0"+e:e};return`#${o(e)}${o(n)}${o(r)}`},o=(s=t,{r:parseInt(s.slice(1,3),16),g:parseInt(s.slice(3,5),16),b:parseInt(s.slice(5,7),16)});var s;let c=o;{const t=[];for(;;){c={r:Math.min(Math.round(c.r+(255-c.r)*e),255),g:Math.min(Math.round(c.g+(255-c.g)*e),255),b:Math.min(Math.round(c.b+(255-c.b)*e),255)};const n=r(c);if(t[t.length-1]===n)break;t.push(n)}n.push(...t.reverse())}c=o;{const t=[];for(;;){c={r:Math.max(Math.round(.94*c.r),0),g:Math.max(Math.round(.94*c.g),0),b:Math.max(Math.round(.94*c.b),0)};const e=r(c);if(t[t.length-1]===e)break;t.push(e)}n.push(...t)}return n}function St(t){const e=t[0].length,n=t.length,r=document.createElement("canvas");r.width=e,r.height=n;const o=r.getContext("2d");if(!o)throw new Error("Canvas context is not supported.");const s=o.createImageData(e,n);let c=0;for(let l=0;l<n;l++)for(let n=0;n<e;n++){const e=t[l][n],r=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);s.data[c++]=r,s.data[c++]=o,s.data[c++]=i,s.data[c++]=255}o.putImageData(s,0,0);return r.toDataURL("image/png")}!function(t){const e=[],n=360/t;for(let c=0;c<t;c++){const t=xt(c*n,100,50),l=(r=t[0],o=t[1],s=t[2],`#${kt(r)}${kt(o)}${kt(s)}`);e.push(l)}var r,o,s}(32);function At(e){let n,r,s,c,l,i,a=e[1]===wt?"❌":"";return{c(){n=$("div"),r=$("div"),s=m(a),x(r,"class","symbol svelte-arqdtx"),x(n,"class","color svelte-arqdtx"),x(n,"style",c=`background-color: ${e[1]}; border: 1px solid ${e[0]?Ct:e[1]}`)},m(t,c){g(t,n,c),d(n,r),d(r,s),l||(i=b(n,"click",(function(){o(e[2])&&e[2].apply(this,arguments)})),l=!0)},p(t,[r]){e=t,2&r&&a!==(a=e[1]===wt?"❌":"")&&k(s,a),3&r&&c!==(c=`background-color: ${e[1]}; border: 1px solid ${e[0]?Ct:e[1]}`)&&x(n,"style",c)},i:t,o:t,d(t){t&&h(n),l=!1,i()}}}function It(t,e,n){let{selected:r=!1}=e,{color:o}=e,{onClick:s=(()=>{})}=e;return t.$$set=t=>{"selected"in t&&n(0,r=t.selected),"color"in t&&n(1,o=t.color),"onClick"in t&&n(2,s=t.onClick)},[r,o,s]}class Nt extends V{constructor(t){super(),G(this,t,It,At,s,{selected:0,color:1,onClick:2})}}function _t(t){return t.reduce(((t,e)=>t.concat(e)),[])}function zt(t){return t.filter(((t,e,n)=>n.indexOf(t)===e))}const Mt={0:"✏️",1:"🧹"},Ot=t=>parseInt(t),Pt=t=>zt(_t(t)).filter((t=>t!==wt)),Ht=Array.from({length:16},(()=>Array(16).fill(wt))),Ft=St(Ht),Tt=Pt(Ht),jt={id:Y(),name:"New Asset",canvas:Ht,sprite:Ft,customPalette:Tt};function Lt(e){let n,r,s,c,l,i=Mt[e[0]]+"";return{c(){n=$("button"),r=m(i),x(n,"class",s=f(e[3]===e[0]?"selected":"")+" svelte-q9ktce")},m(t,s){g(t,n,s),d(n,r),c||(l=b(n,"click",(function(){o(e[1])&&e[1].apply(this,arguments)})),c=!0)},p(t,[o]){e=t,1&o&&i!==(i=Mt[e[0]]+"")&&k(r,i),9&o&&s!==(s=f(e[3]===e[0]?"selected":"")+" svelte-q9ktce")&&x(n,"class",s)},i:t,o:t,d(t){t&&h(n),c=!1,l()}}}function Rt(e,n,r){let o,s,c,l,i,f=t;u(e,He,(t=>r(6,i=t))),e.$$.on_destroy.push((()=>f()));let{tool:d}=n,{onClick:g}=n;return e.$$set=t=>{"tool"in t&&r(0,d=t.tool),"onClick"in t&&r(1,g=t.onClick)},e.$$.update=()=>{64&e.$$.dirty&&(r(2,({assetEditor:o}=i),o),f(),f=a(o,(t=>r(5,l=t)))),32&e.$$.dirty&&r(4,({asset:s,currentTool:c}=l),s,(r(3,c),r(5,l))),e.$$.dirty,e.$$.dirty},[d,g,o,c,s,l,i]}class Wt extends V{constructor(t){super(),G(this,t,Rt,Lt,s,{tool:0,onClick:1})}}function Bt(t,e,n){const r=t.slice();return r[18]=e[n][0],r}function Dt(t){let e,n;function r(){return t[11](t[18])}return e=new Wt({props:{tool:Ot(t[18]),onClick:r}}),{c(){D(e.$$.fragment)},m(t,r){q(e,t,r),n=!0},p(n,o){t=n;const s={};8&o&&(s.onClick=r),e.$set(s)},i(t){n||(W(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function qt(t){let e,n,s,c,l,i,a,u,f,m,y,k,w=Object.entries(Mt),C=[];for(let r=0;r<w.length;r+=1)C[r]=Dt(Bt(t,w,r));const E=t=>B(C[t],1,1,(()=>{C[t]=null}));return{c(){e=$("div");for(let t=0;t<C.length;t+=1)C[t].c();n=v(),s=$("input"),c=v(),l=$("button"),l.textContent="save",i=v(),a=$("button"),a.textContent="cancel",u=v(),f=$("button"),f.textContent="clone",x(s,"type","color"),s.value=t[4]},m(r,h){g(r,e,h);for(let t=0;t<C.length;t+=1)C[t]&&C[t].m(e,null);d(e,n),d(e,s),t[12](s),d(e,c),d(e,l),d(e,i),d(e,a),d(e,u),d(e,f),m=!0,y||(k=[b(s,"change",t[7]),b(l,"click",t[5]),b(a,"click",(function(){o(t[2])&&t[2].apply(this,arguments)})),b(f,"click",t[6])],y=!0)},p(r,[o]){if(t=r,8&o){let r;for(w=Object.entries(Mt),r=0;r<w.length;r+=1){const s=Bt(t,w,r);C[r]?(C[r].p(s,o),W(C[r],1)):(C[r]=Dt(s),C[r].c(),W(C[r],1),C[r].m(e,n))}for(L(),r=w.length;r<C.length;r+=1)E(r);R()}(!m||16&o)&&(s.value=t[4])},i(t){if(!m){for(let t=0;t<w.length;t+=1)W(C[t]);m=!0}},o(t){C=C.filter(Boolean);for(let e=0;e<C.length;e+=1)B(C[e]);m=!1},d(n){n&&h(e),p(C,n),t[12](null),y=!1,r(k)}}}function Ut(e,n,r){let o,s,c,l,i,f,d,g,h,p,$,m,v=t;u(e,He,(t=>r(10,m=t))),e.$$.on_destroy.push((()=>v()));let y;return e.$$.update=()=>{1024&e.$$.dirty&&(r(0,({assetEditor:l}=m),l),v(),v=a(l,(t=>r(9,$=t)))),512&e.$$.dirty&&r(8,({asset:i,isColorPickerShowing:f,selectedColor:d}=$),i,(r(4,d),r(9,$))),1&e.$$.dirty&&r(3,({setTool:g,setSelectedColor:h,clearAsset:p}=l),g,(r(2,p),r(0,l),r(10,m))),e.$$.dirty},({saveAsset:o,openAssetEditor:s,createAsset:c}=He),[l,y,p,g,d,()=>{o(i),p()},()=>{const t=c();o({...i,name:`Clone of ${i.name}`,id:t}),s(t)},t=>{h(y.value)},i,$,m,t=>g(Ot(t)),function(t){A[t?"unshift":"push"]((()=>{y=t,r(1,y)}))}]}class Jt extends V{constructor(t){super(),G(this,t,Ut,qt,s,{})}}const Gt=t=>Array(t).fill(0);function Vt(t,e,n){const r=t.slice();return r[1]=e[n],r}function Yt(t){let e,n,r,o;return n=new pt({props:{asset:t[0]}}),{c(){e=$("div"),D(n.$$.fragment),r=v(),x(e,"class","tile svelte-1nytstz")},m(t,s){g(t,e,s),q(n,e,null),d(e,r),o=!0},p(t,e){const r={};1&e&&(r.asset=t[0]),n.$set(r)},i(t){o||(W(n.$$.fragment,t),o=!0)},o(t){B(n.$$.fragment,t),o=!1},d(t){t&&h(e),U(n)}}}function Kt(t){let e,n,r=Gt(9),o=[];for(let c=0;c<r.length;c+=1)o[c]=Yt(Vt(t,r,c));const s=t=>B(o[t],1,1,(()=>{o[t]=null}));return{c(){e=$("div");for(let t=0;t<o.length;t+=1)o[t].c();x(e,"class","tile-container svelte-1nytstz")},m(t,r){g(t,e,r);for(let n=0;n<o.length;n+=1)o[n]&&o[n].m(e,null);n=!0},p(t,[n]){if(1&n){let c;for(r=Gt(9),c=0;c<r.length;c+=1){const s=Vt(t,r,c);o[c]?(o[c].p(s,n),W(o[c],1)):(o[c]=Yt(s),o[c].c(),W(o[c],1),o[c].m(e,null))}for(L(),c=r.length;c<o.length;c+=1)s(c);R()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)W(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let e=0;e<o.length;e+=1)B(o[e]);n=!1},d(t){t&&h(e),p(o,t)}}}function Zt(t,e,n){let{asset:r}=e;return t.$$set=t=>{"asset"in t&&n(0,r=t.asset)},[r]}class Qt extends V{constructor(t){super(),G(this,t,Zt,Kt,s,{asset:0})}}function Xt(t,e,n){const r=t.slice();return r[13]=e[n],r}function te(t,e,n){const r=t.slice();return r[16]=e[n],r[18]=n,r}function ee(t,e,n){const r=t.slice();return r[19]=e[n],r[21]=n,r}function ne(t){let e,n,o,s;function c(...e){return t[9](t[18],t[21],...e)}function l(...e){return t[10](t[18],t[21],...e)}return{c(){e=$("div"),x(e,"class","pixel svelte-mkucnf"),x(e,"style",n=`background-color: ${t[19]}`)},m(t,n){g(t,e,n),o||(s=[b(e,"mouseenter",c),b(e,"mousedown",l)],o=!0)},p(r,o){t=r,16&o&&n!==(n=`background-color: ${t[19]}`)&&x(e,"style",n)},d(t){t&&h(e),o=!1,r(s)}}}function re(t){let e,n=t[16],r=[];for(let o=0;o<n.length;o+=1)r[o]=ne(ee(t,n,o));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=y()},m(t,n){for(let e=0;e<r.length;e+=1)r[e]&&r[e].m(t,n);g(t,e,n)},p(t,o){if(84&o){let s;for(n=t[16],s=0;s<n.length;s+=1){const c=ee(t,n,s);r[s]?r[s].p(c,o):(r[s]=ne(c),r[s].c(),r[s].m(e.parentNode,e))}for(;s<r.length;s+=1)r[s].d(1);r.length=n.length}},d(t){p(r,t),t&&h(e)}}}function oe(t){let e,n;function r(){return t[11](t[13])}return e=new Nt({props:{color:t[13],onClick:r}}),{c(){D(e.$$.fragment)},m(t,r){q(e,t,r),n=!0},p(n,o){t=n;const s={};8&o&&(s.color=t[13]),40&o&&(s.onClick=r),e.$set(s)},i(t){n||(W(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function se(t){let e,n,r,o,s,c,l,i,a,u,f,m;n=new Jt({});let y=t[4],b=[];for(let d=0;d<y.length;d+=1)b[d]=re(te(t,y,d));let k=t[3],w=[];for(let d=0;d<k.length;d+=1)w[d]=oe(Xt(t,k,d));const C=t=>B(w[t],1,1,(()=>{w[t]=null}));return f=new Qt({props:{asset:t[0]}}),{c(){e=$("div"),D(n.$$.fragment),r=v(),o=$("div"),s=$("div"),c=$("div");for(let t=0;t<b.length;t+=1)b[t].c();l=v(),i=$("div");for(let t=0;t<w.length;t+=1)w[t].c();a=v(),u=$("div"),D(f.$$.fragment),x(c,"class","canvas svelte-mkucnf"),x(i,"class","custom-palette svelte-mkucnf"),x(s,"class","column"),x(u,"class","column"),x(o,"class","row svelte-mkucnf")},m(t,h){g(t,e,h),q(n,e,null),d(e,r),d(e,o),d(o,s),d(s,c);for(let e=0;e<b.length;e+=1)b[e]&&b[e].m(c,null);d(s,l),d(s,i);for(let e=0;e<w.length;e+=1)w[e]&&w[e].m(i,null);d(o,a),d(o,u),q(f,u,null),m=!0},p(t,[e]){if(84&e){let n;for(y=t[4],n=0;n<y.length;n+=1){const r=te(t,y,n);b[n]?b[n].p(r,e):(b[n]=re(r),b[n].c(),b[n].m(c,null))}for(;n<b.length;n+=1)b[n].d(1);b.length=y.length}if(40&e){let n;for(k=t[3],n=0;n<k.length;n+=1){const r=Xt(t,k,n);w[n]?(w[n].p(r,e),W(w[n],1)):(w[n]=oe(r),w[n].c(),W(w[n],1),w[n].m(i,null))}for(L(),n=k.length;n<w.length;n+=1)C(n);R()}const n={};1&e&&(n.asset=t[0]),f.$set(n)},i(t){if(!m){W(n.$$.fragment,t);for(let t=0;t<k.length;t+=1)W(w[t]);W(f.$$.fragment,t),m=!0}},o(t){B(n.$$.fragment,t),w=w.filter(Boolean);for(let e=0;e<w.length;e+=1)B(w[e]);B(f.$$.fragment,t),m=!1},d(t){t&&h(e),U(n),p(b,t),p(w,t),U(f)}}}function ce(e,n,r){let o,s,c,l,i,f,d,g,h,p=t;u(e,He,(t=>r(8,h=t))),e.$$.on_destroy.push((()=>p()));const $=(t,e,n)=>{t.buttons&&l(e,n)};return e.$$.update=()=>{256&e.$$.dirty&&(r(1,({assetEditor:o}=h),o),p(),p=a(o,(t=>r(7,g=t)))),128&e.$$.dirty&&r(0,({asset:s,selectedColor:c}=g),s),2&e.$$.dirty&&r(2,({setPixel:l,setSelectedColor:i}=o),l,(r(5,i),r(1,o),r(8,h))),1&e.$$.dirty&&r(4,({canvas:f,customPalette:d}=s),f,(r(3,d),r(0,s),r(7,g)))},[s,o,l,d,f,i,$,g,h,(t,e,n)=>$(n,t,e),(t,e,n)=>l(t,e),t=>i(t)]}class le extends V{constructor(t){super(),G(this,t,ce,se,s,{})}}function ie(e){let n,r;return n=new bt({}),{c(){D(n.$$.fragment)},m(t,e){q(n,t,e),r=!0},p:t,i(t){r||(W(n.$$.fragment,t),r=!0)},o(t){B(n.$$.fragment,t),r=!1},d(t){U(n,t)}}}function ae(t){let e,n,r,o,s=t[0].name+"";return r=new le({}),{c(){e=m(s),n=v(),D(r.$$.fragment)},m(t,s){g(t,e,s),g(t,n,s),q(r,t,s),o=!0},p(t,n){(!o||1&n)&&s!==(s=t[0].name+"")&&k(e,s)},i(t){o||(W(r.$$.fragment,t),o=!0)},o(t){B(r.$$.fragment,t),o=!1},d(t){t&&h(e),t&&h(n),U(r,t)}}}function ue(t){let e,n,r,o;const s=[ae,ie],c=[];function l(t,e){return t[0]?0:1}return n=l(t),r=c[n]=s[n](t),{c(){e=$("div"),r.c(),x(e,"class","editor svelte-13i57mu")},m(t,r){g(t,e,r),c[n].m(e,null),o=!0},p(t,[o]){let i=n;n=l(t),n===i?c[n].p(t,o):(L(),B(c[i],1,1,(()=>{c[i]=null})),R(),r=c[n],r?r.p(t,o):(r=c[n]=s[n](t),r.c()),W(r,1),r.m(e,null))},i(t){o||(W(r),o=!0)},o(t){B(r),o=!1},d(t){t&&h(e),c[n].d()}}}function fe(e,n,r){let o,s,c,l,i=t;return u(e,He,(t=>r(3,l=t))),e.$$.on_destroy.push((()=>i())),e.$$.update=()=>{8&e.$$.dirty&&(r(1,({assetEditor:o}=l),o),i(),i=a(o,(t=>r(2,c=t)))),4&e.$$.dirty&&r(0,({asset:s}=c),s),e.$$.dirty},[s,o,c,l]}class de extends V{constructor(t){super(),G(this,t,fe,ue,s,{})}}function ge(t){let e,n,r,o,s,c,l,i;return{c(){e=$("div"),n=$("div"),n.textContent=`${t[1]},${t[2]}`,r=v(),o=$("div"),s=m(t[4]),c=v(),l=$("div"),l.textContent=`${t[3]}`,x(o,"class",f(t[4])+" svelte-1xlzzjt"),x(e,"class","cell svelte-1xlzzjt"),x(e,"style",i=`background-color: ${t[0].topographicalHeat()}`)},m(t,i){g(t,e,i),d(e,n),d(e,r),d(e,o),d(o,s),d(e,c),d(e,l)},p(t,n){1&n&&i!==(i=`background-color: ${t[0].topographicalHeat()}`)&&x(e,"style",i)},d(t){t&&h(e)}}}function he(e){let n,r=e[0]&&ge(e);return{c(){r&&r.c(),n=y()},m(t,e){r&&r.m(t,e),g(t,n,e)},p(t,[e]){t[0]?r?r.p(t,e):(r=ge(t),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null)},i:t,o:t,d(t){r&&r.d(t),t&&h(n)}}}function pe(t,e,n){let{cell:r}=e;const{x:o,y:s,height:c,type:l}=r||{};return t.$$set=t=>{"cell"in t&&n(0,r=t.cell)},[r,o,s,c,l]}class $e extends V{constructor(t){super(),G(this,t,pe,he,s,{cell:0})}}function me(t){let e,n,o,s,c,l,i,a,u,f,p,m,y,k,w,C;return{c(){e=$("div"),n=$("h1"),n.textContent="WorldForge Share Tool",o=v(),s=$("textarea"),c=v(),l=$("div"),i=$("button"),i.textContent="copy",a=v(),u=$("button"),u.textContent="close",f=v(),p=$("div"),m=$("div"),m.textContent="DANGER - import will wipe out your current game. Save the above message first.",y=v(),k=$("button"),k.textContent="import",s.value=t[2],x(s,"class","svelte-1xz1fz9"),x(m,"class","danger svelte-1xz1fz9"),x(k,"class","danger svelte-1xz1fz9")},m(r,h){g(r,e,h),d(e,n),d(e,o),d(e,s),t[8](s),d(e,c),d(e,l),d(l,i),d(l,a),d(l,u),d(l,f),d(l,p),d(p,m),d(p,y),d(p,k),w||(C=[b(i,"click",t[3]),b(u,"click",t[9]),b(k,"click",t[5])],w=!0)},p(t,e){4&e&&(s.value=t[2])},d(n){n&&h(e),t[8](null),w=!1,r(C)}}}function ve(e){let n,r,o,s,c,l=e[0]&&me(e);return{c(){n=$("button"),n.textContent="⤴️",r=v(),l&&l.c(),o=y()},m(t,i){g(t,n,i),g(t,r,i),l&&l.m(t,i),g(t,o,i),s||(c=b(n,"click",e[4]),s=!0)},p(t,[e]){t[0]?l?l.p(t,e):(l=me(t),l.c(),l.m(o.parentNode,o)):l&&(l.d(1),l=null)},i:t,o:t,d(t){t&&h(n),t&&h(r),l&&l.d(t),t&&h(o),s=!1,c()}}}function ye(t,e,n){let r,o,s,c,l;u(t,Pe,(t=>n(6,c=t))),u(t,He,(t=>n(7,l=t)));let i,a=!1,f="";E((()=>{(async function(t){const e=(new TextEncoder).encode(t),n=new CompressionStream("deflate"),r=n.writable.getWriter();r.write(e),r.close();const o=await new Response(n.readable).arrayBuffer(),s=new Uint8Array(o),c=String.fromCharCode.apply(null,s);return encodeURIComponent(btoa(c))})(s).then((t=>{n(2,f=`Hey, check out my WorldForge map!\n\nMap name: ${o}\nMap ID: ${r}\n\nhttps://worldforge.pockethost.io?pm=WFDLC*${t}\n\nNote: If the link doesn't work, just copy this whole message into the WorldForge share tool and click Import.`)})).catch(console.error)}));return t.$$.update=()=>{128&t.$$.dirty&&({id:r,name:o}=l),64&t.$$.dirty&&(s=c)},[a,i,f,()=>{i.select(),document.execCommand("copy"),alert("DLC copied to clipboard! Share on messaging apps!")},()=>{n(0,a=!0)},()=>{const[,t]=i.value.match(/WFDLC\*([a-zA-Z0-9%]+)/)||[];(function(t){const e=atob(decodeURIComponent(t)),n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);const r=new DecompressionStream("deflate"),o=r.writable.getWriter();return o.write(n),o.close(),new Response(r.readable).arrayBuffer().then((function(t){return(new TextDecoder).decode(t)}))})(t).then((t=>{})).catch(console.error)},c,l,function(t){A[t?"unshift":"push"]((()=>{i=t,n(1,i)}))},()=>n(0,a=!1)]}class be extends V{constructor(t){super(),G(this,t,ye,ve,s,{})}}function xe(t,e,n){const r=t.slice();return r[4]=e[n],r}function ke(t,e,n){const r=t.slice();return r[7]=e[n],r}function we(t){let e,n;return e=new $e({props:{cell:t[1].terrain.get(lt(t[4],t[7]))}}),{c(){D(e.$$.fragment)},m(t,r){q(e,t,r),n=!0},p(t,n){const r={};3&n&&(r.cell=t[1].terrain.get(lt(t[4],t[7]))),e.$set(r)},i(t){n||(W(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Ce(t){let e,n,r,o=Gt(t[0]),s=[];for(let l=0;l<o.length;l+=1)s[l]=we(ke(t,o,l));const c=t=>B(s[t],1,1,(()=>{s[t]=null}));return{c(){e=$("div");for(let t=0;t<s.length;t+=1)s[t].c();n=v(),x(e,"class","row svelte-ip4tap")},m(t,o){g(t,e,o);for(let n=0;n<s.length;n+=1)s[n]&&s[n].m(e,null);d(e,n),r=!0},p(t,r){if(3&r){let l;for(o=Gt(t[0]),l=0;l<o.length;l+=1){const c=ke(t,o,l);s[l]?(s[l].p(c,r),W(s[l],1)):(s[l]=we(c),s[l].c(),W(s[l],1),s[l].m(e,n))}for(L(),l=o.length;l<s.length;l+=1)c(l);R()}},i(t){if(!r){for(let t=0;t<o.length;t+=1)W(s[t]);r=!0}},o(t){s=s.filter(Boolean);for(let e=0;e<s.length;e+=1)B(s[e]);r=!1},d(t){t&&h(e),p(s,t)}}}function Ee(t){let e,n,r,o,s,c,l,i;r=new be({});let a=Gt(t[0]),u=[];for(let d=0;d<a.length;d+=1)u[d]=Ce(xe(t,a,d));const f=t=>B(u[t],1,1,(()=>{u[t]=null}));return{c(){e=$("button"),e.textContent="Edit Assets",n=v(),D(r.$$.fragment),o=v();for(let t=0;t<u.length;t+=1)u[t].c();s=y()},m(a,f){g(a,e,f),g(a,n,f),q(r,a,f),g(a,o,f);for(let t=0;t<u.length;t+=1)u[t]&&u[t].m(a,f);g(a,s,f),c=!0,l||(i=b(e,"click",t[3]),l=!0)},p(t,[e]){if(3&e){let n;for(a=Gt(t[0]),n=0;n<a.length;n+=1){const r=xe(t,a,n);u[n]?(u[n].p(r,e),W(u[n],1)):(u[n]=Ce(r),u[n].c(),W(u[n],1),u[n].m(s.parentNode,s))}for(L(),n=a.length;n<u.length;n+=1)f(n);R()}},i(t){if(!c){W(r.$$.fragment,t);for(let t=0;t<a.length;t+=1)W(u[t]);c=!0}},o(t){B(r.$$.fragment,t),u=u.filter(Boolean);for(let e=0;e<u.length;e+=1)B(u[e]);c=!1},d(t){t&&h(e),t&&h(n),U(r,t),t&&h(o),p(u,t),t&&h(s),l=!1,i()}}}function Se(t,e,n){let r;u(t,He,(t=>n(1,r=t)));const{navigate:o}=He;let{size:s=nt(r.terrain.size())}=e;return t.$$set=t=>{"size"in t&&n(0,s=t.size)},[s,r,o,()=>o(_e.Editor)]}class Ae extends V{constructor(t){super(),G(this,t,Se,Ee,s,{size:0})}}const Ie=nt(20),Ne=nt(0);var _e=(t=>(t[t.Splash=0]="Splash",t[t.Home=1]="Home",t[t.Editor=2]="Editor",t))(_e||{});const ze={0:()=>dt,1:()=>Ae,2:()=>de},Me=()=>{const t=(()=>{try{const t=localStorage.getItem("game");if(!t)return;return JSON.parse(t)}catch{}})(),e=Oe;return t&&Object.values(t.assets).forEach((t=>{e.assets[t.id]=(t=>{const{id:e,canvas:n,name:r}=t;return{id:e,canvas:n,name:r,sprite:St(t.canvas),customPalette:Pt(n)}})(t)})),e},Oe={id:Y(),name:"New Game",assets:{},screen:localStorage.getItem("splash")?1:0,assetEditor:(()=>{const t=Z({isColorPickerShowing:!1,selectedColor:"#00FF00",currentTool:0}),{set:e,update:n,subscribe:r}=t;return{subscribe:r,setAsset:t=>n((e=>({...e,asset:t}))),clearAsset:()=>n((t=>(delete t.asset,{...t}))),showColorPicker:()=>n((t=>({...t,isColorPickerShowing:!0}))),hideColorPicker:()=>n((t=>({...t,isColorPickerShowing:!1}))),setSelectedColor:t=>{n((e=>({...e,isColorPickerShowing:!1,selectedColor:t,palette:Et(t)})))},setPixel:(t,e)=>{var r;r=(n,r)=>{const{currentTool:o,selectedColor:s}=n,{canvas:c}=r;return c[t][e]=0===o?s:wt,{...r,canvas:c,sprite:St(c),customPalette:Pt(c)}},n((t=>{const{asset:e}=t;if(!e)throw new Error("Asset required");return{...t,asset:r(t,e)}})),n((t=>{const e=zt(_t(t.asset.canvas)).filter((t=>t!==wt));return{...t,customPalette:e}}))},setTool:t=>n((e=>({...e,currentTool:t})))}})(),terrain:(t=>{const e={size:Ie,nPeaks:Ne,...t},{size:n,nPeaks:r}=e,o={topographicalHeat:()=>wt,minHeight:Number.POSITIVE_INFINITY,maxHeight:Number.NEGATIVE_INFINITY,size:n,cells:{}},s=(t,e)=>{const n=((t,e)=>{const{x:n,y:r}=t,s={type:ct.Land,height:Q(st),...e,slug:it(t),pointArr:rt(n,r),point:t,x:n,y:r,topographicalHeat:()=>o.topographicalHeat(s.height)};return s})(t,e);return o.cells[n.slug]=n,n};return{set:s,get:t=>o.cells[t]||s(at(t)),map:t=>Object.entries(o.cells).map((([e,n])=>t(n,e))),size:()=>n,minHeight:(t,e=!1)=>void 0===t?o.minHeight:o.minHeight=Q(e?t:Math.min(t,o.minHeight)),maxHeight:(t,e=!1)=>void 0===t?o.maxHeight:o.maxHeight=Q(e?t:Math.max(t,o.maxHeight))}})({size:nt(20)})},Pe=(()=>{const t=Z(""),{subscribe:e,update:n,set:r}=t;return{subscribe:e,set:t=>r(t)}})(),He=(()=>{const t=Z(Me()),{subscribe:e,set:n,update:r}=t;e((t=>{const{assets:e}=t,n={assets:Object.values(e).reduce(((t,e,n)=>(t[n]=(t=>{const{canvas:e,id:n,name:r}=t;return{canvas:e,id:n,name:r}})(e),t)),{})},r=JSON.stringify(n);localStorage.setItem("game",JSON.stringify(n)),Pe.set(r)}));const o={createAsset:()=>{const t={...jt,id:Y()};return r((e=>({...e,assets:{...e.assets,[t.id]:t}}))),t.id},openAssetEditor:t=>{r((e=>{var n;return e.assetEditor.setAsset((n=e.assets[t],JSON.parse(JSON.stringify(n)))),e}))},closeAssetEditor:()=>{r((t=>(t.assetEditor.clearAsset(),t))),o.navigate(1)},saveAsset:t=>r((e=>({...e,assets:{...e.assets,[t.id]:t}}))),navigate:t=>r((e=>(localStorage.setItem("splash","1"),{...e,screen:t}))),subscribe:e};return o})(),Fe=7;function Te(t){let e,n,r,o,s=Fe+"";var c=ze[t[0].screen]();return c&&(e=w(c,{})),{c(){e&&D(e.$$.fragment),n=m("\nWorldForge build "),r=m(s)},m(t,s){e&&q(e,t,s),g(t,n,s),g(t,r,s),o=!0},p(t,[r]){if(1&r&&c!==(c=ze[t[0].screen]())){if(e){L();const t=e;B(t.$$.fragment,1,0,(()=>{U(t,1)})),R()}c?(e=w(c,{}),D(e.$$.fragment),W(e.$$.fragment,1),q(e,n.parentNode,n)):e=null}},i(t){o||(e&&W(e.$$.fragment,t),o=!0)},o(t){e&&B(e.$$.fragment,t),o=!1},d(t){e&&U(e,t),t&&h(n),t&&h(r)}}}function je(t,e,n){let r;return u(t,He,(t=>n(0,r=t))),[r]}new class extends V{constructor(t){super(),G(this,t,je,Te,s,{})}}({target:document.getElementById("app")});