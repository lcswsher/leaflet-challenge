// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";


// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
    console.log(data.features);
    function styleInfo(feature) {
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#0000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            wweight: 0.5
        };

    }

    function getColor(magnitude) {
    if (magnitude > 4) {
         return 'red'
     }   else if (magnitude > 3) {
         return 'orange'
     }   else if (magnitude > 2) {
         return 'yellow'
     }   else {
         return 'green'    
     }
    }   
    
    function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
    }

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap);


    var legend = L.control({
        position: "topright"
    });

    legend.onAdd = function() {
        
    }

    }
    // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.

    // 1.
    // Pass the features to a createFeatures() function:
    createFeatures(data.features);

});


// 2. 
function createFeatures(earthquakeData) {

    let earthquakes = []
    for (i = 0; i < earthquakeData.length; i++) {
        earthquakes.push(
            L.geoJSON(earthquakeData[i]).bindPopup(`</h2>${earthquakeData[i].properties.place}</h2> <p>${Date(earthquakeData[i].properties.time)}</p>`)
        )
    }



    let earthquake_layer = L.layerGroup(earthquakes)

    // YOUR CODE GOES HERE
    // Save the earthquake data in a variable.

    // Pass the earthquake data to a createMap() function.
    createMap(earthquake_layer);

}

d3.json(queryUrl.then function




// 3.
// createMap() takes the earthquake data and incorporates it into the visualization:

function createMap(earthquake_layer) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // Creat an overlays object.

    let overlaymaps = {
        "Earthquakes": earthquake_layer
    }

    // YOUR CODE GOES HERE

    // Create a new map.
    // Edit the code to add the earthquake data to the layers.

    var myMap = L.map("map", {
        center: [39.0119, -98.4842],
        zoom: 5,
        layers: [street, earthquake_layer]
    });

    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlaymaps, {
        collapsed: false
    }).addTo(myMap);

}
