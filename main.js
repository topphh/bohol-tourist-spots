var map = L.map(
    "map",
    {
        center: [9.8347, 124.2829],
        crs: L.CRS.EPSG3857,
        zoom: 10,
        zoomControl: false,
        preferCanvas: false,
    }
);

var title_layer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {"attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
).addTo(map);

var chocolatehills = L.marker([9.8174, 124.1435], {}).addTo(map);
var popup1 = L.popup({"maxWidth": "100%"});
var popup_html = $(`<div id="popup_html" style="width: 100.0%; height: 100.0%;"><h3>Chocolate Hills</h3><img src="res/images/chocolate-hills.jpg" width="240" height="180">
                    <div>The hills are located throughout the towns of Carmen, 
                    Batuan and Sagbayan and consist of about 1,776 mounds of the same general shape. 
                    During the dry season when precipitation in inadequate,
                    the grass-covered hills turn chocolate brown, 
                    hence the name in reference to a branded confection.</div></div>`)[0];
popup1.setContent(popup_html);
chocolatehills.bindPopup(popup1);
chocolatehills.bindTooltip(`<div>Chocolate Hills</div>`, {"sticky": true});