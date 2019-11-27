const makeMapPlain = () => {

    let svg = d3.select("svg");
    let path = d3.geoPath();

    // let proj = d3.geoAlbersUsa();


    d3.json("https://d3js.org/us-10m.v1.json", (error, us) => {
        if (error) throw error;
        // border
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .style("fill", "rgb(12, 80, 12)")
            .attr("d", path);
        // counties
        svg.append('path')
            .attr('class', 'county-borders')
            .attr('d', path(topojson.mesh(us, us.objects.counties, (a, b) => a !== b && !(a.id / 1000 ^ b.id / 1000))));
        // states
        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)))

    });



}

export const makeMapPlain;