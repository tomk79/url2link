(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}const t=function t(n,o){if(e(n)!=e("string"))for(var r=/h?ttps?\:\/\/[a-zA-Z0-9\.\\-\_]+\/[a-zA-Z0-9\-\_\.\?\&\=\+\%\/\#]*/,a=0;n.childNodes.length>a;a++){var c=n.childNodes[a];if("#text"!=c.nodeName)"#comment"!=c.nodeName&&(["A","PRE","CODE","TEXTAREA","INPUT","SELECT","SCRIPT","STYLE"].includes(c.tagName)||t(c,o));else{var l=r.exec(c.data);if(l){var f=c.data.slice(0,c.data.indexOf(l[0])),i=l[0],d=c.data.slice(c.data.indexOf(l[0])+l[0].length);c.data=f,c.after(d);var u=document.createElement("a");u.innerText=i;var m=i;m.match(/^ttp/)&&(m="h"+m),u.href=m,u.rel="noopener noreferrer",u.target="_blank",c.after(u)}}}else document.querySelectorAll(n).forEach((function(e,n){t(e,o)}))};window.url2link=t})();