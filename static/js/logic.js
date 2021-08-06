// URL - Earthquakes "All Day" at USGS https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php#earthquakes

const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// My corrdinates

var myMap = L.map("map", {
    center: [40.52, -34.34],
    zoom: 2
});

// Tile Layer is from USGSTopo at Leafletproviders preview: "https://leaflet-extras.github.io/leaflet-providers/preview/"

L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
   attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
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
            color: "black",
            weight: .3,            
        };
    }

// color is based on "geological depth of Earthquake", darker colors as depth increases

    function getColor(depth) {
    if (depth < 40) {
        return '#2c99ea'
    }   else if (depth < 60) {
        return '#2ceabf'
    }   else if (depth < 80) {
        return '#92ea2c'
    }   else if (depth < 100) {
        return '#d5ea2c'
    }   else if (depth < 150) {
        return '#eaa92c'
    }   else {
        return '#ea2c2c'
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
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place + "<br>Date: " + Date(feature.properties.time));
        }  
    }).addTo(myMap);

// Legend 

    var legend = L.control({position: "bottomright"});
        legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depth = [0, 40, 60, 80, 100, 150];
        var colors = ["#2c99ea", "#2ceabf", "#92ea2c", "#d5ea2c", "#eaa92c", "#ea2c2c"];
        div.innerHTML += "<h3 style='text-align: left'>Earthquake Depth (km) <br>Past Day </h3>"

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
