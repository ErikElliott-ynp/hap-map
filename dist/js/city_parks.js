import { metros } from "./cities"
import cubeMaker from  "./cube_maker"

const cityParksGraph = () => {

    let svg = d3.select("svg");

    let path = d3.geoPath();

    d3.json("https://d3js.org/us-10m.v1.json", (error, us) => {
        if (error) throw error;
        // border
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .style("fill", "rgb(28,g 66, 19)")
            .attr("d", path);
        // counties
        svg.append('path')
            .attr('class', 'county-borders')
            .attr('d', path(topojson.mesh(us, us.objects.counties, (a, b) => a !== b && !(a.id / 1000 ^ b.id / 1000))));
        // states
        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)))

        // add cities bar graphs

        metros.forEach(met => {
            cubeMaker(met, "numParks")
        })

        let para = document.getElementById('info');
        const text = document.createTextNode("Here are relative Happiness levels of major US metros compared to the amount of city parks in the metro area with the number of parks per 10,000 residents displayed")
        para.innerHTML = null;
        para.appendChild(text);
    });

}


export default cityParksGraph;