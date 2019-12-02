import { metros } from "./cities";
import cubeMaker from "./cube_maker";

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
            .style("fill", "rgb(93, 182, 233)")
            .attr("d", path);
        // counties
        svg.append('path')
            .attr('class', 'county-borders')
            .attr('d', path(topojson.mesh(us, us.objects.counties, (a, b) => a !== b && !(a.id / 1000 ^ b.id / 1000))));
        // states
        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)))

        metros.forEach(met => {
            cubeMaker(met);
        })

    });

    let para = document.getElementById('info');
    const text = document.createTextNode("This represents the average happiness of different major metropolitan areas compared to the national average (5.0)")
    para.innerHTML = null;
    para.appendChild(text);

}

export default makeMapPlain;