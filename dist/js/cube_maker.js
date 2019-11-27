function cubeMaker (met) {

    let origin = [met.long, met.lat];
    let scale = 12, j = 1, cubesData = [], startAngle = Math.PI / 3;
    let svg = d3.select('svg').append('g');
    let cubesGroup = svg.append('g').attr('class', 'cubes');

    let cubes3D = d3._3d()
        .shape('CUBE')
        .x( (d) => d.x )
        .y( (d) => d.y )
        .z( (d) => d.z )
        .rotateY(startAngle)
        .rotateX(-startAngle)
        .origin(origin)
        .scale(scale);

    function processData(data, tt) {

        // Cubes
        let cubes = cubesGroup.selectAll('g.cube').data(data, (d) => d.id);


        let ce = cubes
            .enter()
            .append('g')
            .attr('class', 'cube')
            .attr('fill', met.color)
            .attr('stroke', "#000")
            .merge(cubes)
            .sort(cubes3D.sort);

        cubes.exit().remove();

        //    Faces

        let faces = cubes.merge(ce).selectAll('path.face').data((d) => d.faces, (d) => d.face);

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
                let h = -8;
                let _cube = makeCube(h, x, z);
                _cube.id = 'cube_' + count++;
                _cube.height = h;
                cubesData.push(_cube);
            }
        }
        processData(cubes3D(cubesData), 1000);
    }

    // 3 dimension of each cube
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
}
export default cubeMaker;