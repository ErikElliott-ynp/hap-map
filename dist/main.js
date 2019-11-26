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
        .style("fill", "rgb(12, 80, 12)")
        .attr("d", path);
    
    svg.append('path')
        .attr('class', 'county-borders')
        .attr('d', path(topojson.mesh(us, us.objects.counties, function (a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); })));
    
    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })))
    
    // add cities

    metros.forEach( met => {
        let origin = [met.long, met.lat];
        let scale = 12, j = 1, cubesData = [], startAngle = Math.PI / 4;
        svg = d3.select('svg').append('g');
        let color = d3.scaleOrdinal(d3.schemeCategory20);
        let cubesGroup = svg.append('g').attr('class', 'cubes');
    
        let cubes3D = d3._3d()
            .shape('CUBE')
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .z(function (d) { return d.z; })
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .origin(origin)
            .scale(scale);
    
        function processData(data, tt) {
    
            // Cubes
            let cubes = cubesGroup.selectAll('g.cube').data(data, (d) =>  d.id );
            

            let ce = cubes
                .enter()
                .append('g')
                .attr('class', 'cube')
                .attr('fill', met.color )
                .attr('stroke', "#000" )
                .merge(cubes)
                .sort(cubes3D.sort);
    
            cubes.exit().remove();
    
            //    Faces
    
            let faces = cubes.merge(ce).selectAll('path.face').data( (d) =>  d.faces, (d) =>  d.face );
    
            faces.enter()
                .append('path')
                .attr('class', 'face')
                .attr('fill-opacity', 0.85)
                .classed('_3d', true)
                .merge(faces)
                .transition().duration(tt)
                .attr('d', cubes3D.draw);
    
            faces.exit().remove();
    
           
    
            // Sort Faces
    
            ce.selectAll('._3d').sort(d3._3d().sort);
    
        }
    
        function init() {
            cubesData = [];
            let count = 0;
            for (let z = -j / 2; z <= j / 2; z = z + 5) {
                for (let x = -j; x <= j; x = x + 5) {
                    let h = -6;
                    let _cube = makeCube(h, x, z);
                    _cube.id = 'cube_' + count++;
                    _cube.height = h;
                    cubesData.push(_cube);
                }
            }
            processData(cubes3D(cubesData), 1000);
        }
    
    
        function makeCube(h, x, z) {
            return [
                { x: x - 1, y: h, z: z + 1 }, 
                { x: x - 1, y: 0, z: z + 1 }, 
                { x: x + 1, y: 0, z: z + 1 }, 
                { x: x + 1, y: h, z: z + 1 }, 
                { x: x - 1, y: h, z: z - 1 }, 
                { x: x - 1, y: 0, z: z - 1 }, 
                { x: x + 1, y: 0, z: z - 1 }, 
                { x: x + 1, y: h, z: z - 1 }, 
            ];
        }
    
    
        init();
    })

});



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
