"use strict";
function stars2(){
    let count = 50;
    let scene = document.querySelector('.takeoff');
    let j = 0;
    while(j < count){
        let star = document.createElement('j');
        let x = Math.floor(Math.random() * window.innerWidth);
        let duration = Math.random() * 1;
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 1 + 'px';
        star.style.height = 20 + 'px';
        star.style.animationDuration = duration + 's';

        scene.appendChild(star);
        j++
    }
}
stars2();