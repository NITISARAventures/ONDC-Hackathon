var baseLayer=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | GIS Simplified'
});

var map=L.map('map',{
    center:[22.73,79.89],
    zoom:5,
    zoomControl:false,
    layers:[baseLayer],
});

var routing = L.Routing.control({
    waypoints: [
        L.latLng(12.972442, 77.580643),
        L.latLng(31.104605,77.173424)
    ],
    showAlternatives:true,
    altLineOptions:{
        styles:[
            {color:'black',opacity:0.15,weight:9},
            {color:'white',opacity:0.8,weight:6},
            {color:'blue',opacity:0.5,weight:2},
        ]
    },
    geocoder:L.Control.Geocoder.nominatim()
})
routing.addTo(map);