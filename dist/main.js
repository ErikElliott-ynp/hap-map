import nationalParksGraph from "./js/nat_parks";
import makeMapPlain from './js/map_plain';

console.log('And Here . . . we. . . . go');

document.addEventListener("DOMContentLoaded", () => {
    makeMapPlain();
})

// reset
let reset = document.getElementById('reset');
reset.addEventListener("click", () => {
    d3.selectAll('.cube')
        .remove();
})

// creates map with states and counties

let btn = document.getElementById('main');
btn.addEventListener('click', () => {
    nationalParksGraph();
})

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
