// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var myMap = L.map("map", {
    center: [40.52, -34.34],
    zoom: 2
});

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
    // console.log(data.features);
    function styleInfo(feature) {
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#0000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            wweight: 0.5
        };
    }

    function getColor(depth) {
    if (depth > 150) {
        return '#ea2c2c'
    }   else if (depth > 100) {
        return '#eaa92c'
    }   else if (depth > 80) {
        return '#d5ea2c'
    }   else if (depth > 60) {
        return '#92ea2c'
    }   else if (depth > 40) {
        return '#2ceabf'
    }   else if (depth > 20) {
        return '#2c99ea'
    }   else {
        return 'green'    
    }
}   
    
    function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 2;
    }

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap);


    var legend = L.control({position: "bottomright"});
        legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depth = [0, 20, 40, 60, 80, 100];
        var colors = ["#2c99ea", "#2ceabf", "#92ea2c", "#d5ea2c", "#eaa92c", "#ea2c2c"];
        div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

        // loop thry the intervals of colors to put it in the label
        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background: ' + colors[i] + '"></i>' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;

    };

    legend.addTo(myMap)

});
