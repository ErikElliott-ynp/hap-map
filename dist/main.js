import nationalParksGraph from "./js/nat_parks";
import makeMapPlain from './js/map_plain';
import axios from 'axios';
import cityParksGraph from './js/city_parks';

console.log('And Here . . . we. . . . go');


window.axios = axios;

document.addEventListener("DOMContentLoaded", () => {
    makeMapPlain();
    
})

// reset

const resetMap = () => {
    d3.selectAll('.np-icon')
        .remove();
    d3.selectAll('.cube')
        .remove();
    d3.selectAll('.circ')
        .remove()
}

let reset = document.getElementById('reset');
reset.addEventListener("click", () => {
    makeMapPlain();
    resetMap();
})

// creates map with states and counties

let btn = document.getElementById('main');
btn.addEventListener('click', () => {
    resetMap();
    nationalParksGraph();
})

let cityParks = document.getElementById('city-parks')
cityParks.addEventListener('click', () => {
    resetMap();
    cityParksGraph();
})

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
