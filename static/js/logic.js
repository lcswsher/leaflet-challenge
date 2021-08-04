// Use this link to get the GeoJSON data.
const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// var myMap = L.map("map", {
//     center: [40.7128, -74.0059],
//     zoom: 11
// });

d3.json(link).then(function (data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {









    
}

// {L.geoJson(data).addTo(myMap);});



// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);




// console.log()


