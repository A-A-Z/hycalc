if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let l={};const c=e=>s(e,o),t={module:{uri:o},exports:l,require:c};i[o]=Promise.all(n.map((e=>t[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B5ou7gnX.css",revision:null},{url:"assets/index-D7Xx8LxH.js",revision:null},{url:"assets/JTUQjIg1_i6t8kCHKm459WxRxC7mw9c-CjbUFnzg.woff2",revision:null},{url:"assets/JTUQjIg1_i6t8kCHKm459WxRxi7mw9c-hA1zIwAL.woff2",revision:null},{url:"assets/JTUQjIg1_i6t8kCHKm459WxRxy7mw9c-C9tplYBx.woff2",revision:null},{url:"assets/JTUQjIg1_i6t8kCHKm459WxRyS7m-SBL4XjR7.woff2",revision:null},{url:"assets/JTUQjIg1_i6t8kCHKm459WxRzS7mw9c-pe6s7PaP.woff2",revision:null},{url:"assets/JTUSjIg1_i6t8kCHKm459W1hyzbi-CHYi_LmU.woff2",revision:null},{url:"assets/JTUSjIg1_i6t8kCHKm459Wdhyzbi-BIVePy9u.woff2",revision:null},{url:"assets/JTUSjIg1_i6t8kCHKm459Wlhyw-BDA6280a.woff2",revision:null},{url:"assets/JTUSjIg1_i6t8kCHKm459WRhyzbi-rV1oiNxr.woff2",revision:null},{url:"assets/JTUSjIg1_i6t8kCHKm459WZhyzbi-BXWSX9tz.woff2",revision:null},{url:"favicon.ico",revision:"6c080845ea4f449ceb8df14f68935614"},{url:"hycalc-logo.svg",revision:"b56a95059f40ddab52de3c7c2ab4d88c"},{url:"index.html",revision:"934448361645f46975ded28c89159bd9"},{url:"mask-icon.svg",revision:"449a2d565202268426de8cd798919398"},{url:"registerSW.js",revision:"8b14bc579a37d858c2c10d2dfe936a18"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"favicon.ico",revision:"6c080845ea4f449ceb8df14f68935614"},{url:"apple-touch-icon.png",revision:"fb6fb84c5b13e273b0243ab22c0e20e9"},{url:"mask-icon.svg",revision:"449a2d565202268426de8cd798919398"},{url:"favicon-64x64.png",revision:"e9cd39985983f6bb1a9b9fc4e859b1ac"},{url:"favicon-192x192.png",revision:"927e99db0e8d55241b633793524126c0"},{url:"favicon-512x512.png",revision:"a08efa2c04d3f3dcebe600c9ca4d81c6"},{url:"favicon-maskable-512x512.png",revision:"b8829329b50031a1daa33a1487db9822"},{url:"manifest.webmanifest",revision:"9452ae9fede7e2d1e60b95d0128b820e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
