import nationalParksGraph from "./js/nat_parks";
import makeMapPlain from './js/map_plain';
import { metros } from "./js/cities";

console.log('And Here . . . we. . . . go');

document.addEventListener("DOMContentLoaded", () => {
    makeMapPlain();
    metros.forEach( met => {
        d3.select('svg')
            .append('circle')
            .attr('r', 5)
            .attr("fill", met.color)
            .origin([met.long, met.lat])

    })

})

// reset

const resetMap = () => {
    d3.selectAll('.cube')
        .remove();
}

let reset = document.getElementById('reset');
reset.addEventListener("click", () => {
  resetMap();
})

// creates map with states and counties

let btn = document.getElementById('main');
btn.addEventListener('click', () => {
    resetMap();
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
