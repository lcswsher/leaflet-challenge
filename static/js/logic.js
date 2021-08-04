// Use this link to get the GeoJSON data (all week).

const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// initial 
var myMap = L.map("map", {
    center: [39.0119, -98.4842],
    zoom: 5
});

// check the console log to ensure Json file has loaded

d3.json(link).then(function (data) {
   createFeatures(data.features);
   console.log(data.features)
});

function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
       layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
       onEachFeature: onEachFeature
    });
    createMap(earthquakes);
}

function createMap(earthquakes) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    console.log()
}


