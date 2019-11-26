console.log('And Here . . . we. . . . go');

let svg = d3.select("svg");

let path = d3.geoPath();

let proj = d3.geoAlbersUsa();

import { metros } from "./js/cities"

d3.json("https://d3js.org/us-10m.v1.json",  (error, us) => {
    if (error) throw error;

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);

    svg.append('path')
        .attr('class', 'county-borders')
        .attr('d', path(topojson.mesh(us, us.objects.counties, function (a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); })));
        
    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })));

    metros.forEach(met => {
        svg.append("circle")
            .attr("r", 5)
            .attr("class", "nyc")
            .attr("transform", function () { return "translate(" + proj([met.long, met.lat]) + ")"; });

    })

});

