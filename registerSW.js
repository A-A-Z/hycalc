if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/hycalc/sw.js', { scope: '/hycalc/' })})}