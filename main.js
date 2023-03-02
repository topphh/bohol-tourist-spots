// Create a map and set is center to the center of bohol.
let map = L.map(
    "map",
    {
        center: [9.8347, 124.2829],
        crs: L.CRS.EPSG3857,
        zoom: 10,
        zoomControl: false,
        preferCanvas: false,
    }
);

// create a new tile layer using the OpenStreetMap 
var title_layer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {"attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
).addTo(map);


// loop through all elements in spots-info.json then and place the information to a spots in the map.
fetch("res/spots-info.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      console.log(`${item.name}, ${item.address}, ${item.description}`);
      var popup = L.popup({"maxWidth": "100%"});
      let spotmark = L.marker([item.latitude, item.longitude], {}).addTo(map);
      var popup_html = $(`<div id="popup_html" style="width: 100.0%; height: 100.0%;"><h3>${item.name}</h3><img src="${item.imageSource}" width="240" height="180">
                    <div>${item.description}</div></div>`)[0];
        popup.setContent(popup_html);
        spotmark.bindPopup(popup);
        spotmark.bindTooltip(`<div>${item.name}</div>`, {"sticky": true});
    });
  })
  .catch(error => console.error(error));