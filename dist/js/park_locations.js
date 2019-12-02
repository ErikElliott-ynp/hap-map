const parkLocations = [
    {
        name: "Indiana Dunes",
        long: 628,
        lat: 222
    },
    {
        name: "Cuyaghoga Valley",
        long: 725,
        lat: 212
    },
    {
        name: "Shenandoah",
        long: 760,
        lat: 282
    },
    {
        name: "Acadia",
        long: 907,
        lat: 100
    },
    {
        name: "Great Smokey Mountains",
        long: 700,
        lat: 340
    },
    {
        name: "Biscayne",
        long: 800,
        lat: 570
    },
    {
        name: "Hot Springs",
        long: 530,
        lat: 380
    },
    {
        name: "Mammoth Caves",
        long: 651,
        lat: 311
    },
    {
        name: "Rocky Mountain",
        long: 294,
        lat: 235
    },
    {
        name: "Voyageurs",
        long: 514,
        lat: 65
    },
    {
        name: "Saguaro",
        long: 204,
        lat: 415
    },
    {
        name: "Joshua Tree",
        long: 120,
        lat: 355
    },
    {
        name: "Pinnacles",
        long: 40,
        lat: 275
    },
    {
        name: "Mount Ranier",
        long: 100,
        lat: 65
    },

]



export const parkPlacer = () => {
    let svg = d3.select("svg");

    parkLocations.forEach( loc => {
        svg.append('svg:image')
            .attr('class', 'np-icon')
            .attr('xlink:href', './dist/images/tree-solid.svg')
            .attr("transform", `translate(${loc.long}, ${loc.lat})`)
    })
}

export default parkPlacer;