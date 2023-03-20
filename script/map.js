const map = L.map("map", {
  center: [9.8347, 124.2829],
  crs: L.CRS.EPSG3857,
  zoom: 10,
  zoomControl: false,
  preferCanvas: false,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.",
  maxNativeZoom: 18,
  minZoom: 9,
  subdomains: "abc",
}).addTo(map);

// Store a reference to the layer group
const spotMarkers = L.layerGroup().addTo(map);

function addMapLayer(title, images, subtitle, description, lat, long, isPermanent){
  const imagesHTML = images.map(src => `<img  src="${src}">`).join('');
  const popup_html = $(`<div id="spot-popup">
  <div id="spot-images">${imagesHTML}</div>
  <div id="spot-name">${title}</div>
  <div id="spot-address">${subtitle}</div>
  <div id="spot-description">${description}</div>
  </div>`)[0];
  const popup = L.popup({maxWidth: "100%"}).setContent(popup_html);
  const spotmark = L.marker([lat, long], {})
  .addTo(spotMarkers) // Add to layer group instead of map
  .bindPopup(popup)
  .bindTooltip(`<div>${title}</div>`, {sticky: false, permanent: isPermanent})
  .on('popupopen', () => {
    spotmark.closeTooltip();
  })
  .on('popupclose', () => {
    spotmark.openTooltip();
  });
}

function addSpottoMap(hotWord){
  fetch("res/spots-info.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const spotID = `${item.name} ${item.address} ${item.latitude} ${item.longitude}`.toLowerCase();
        if (spotID.includes(hotWord) || hotWord === "all") {
          var isPermanent = !(hotWord === "all" || hotWord == '');
          addMapLayer(item.name, item.imageSource, item.address, item.description, item.latitude, item.longitude, isPermanent);
        }
      });
  }).catch(error => console.error(error));
}
addSpottoMap("all");

//Search Implementation
const inputField = document.querySelector('input');
inputField.addEventListener('input', () => {
  //clear all overlay in map
  const searchStr = inputField.value.toLowerCase();
  spotMarkers.clearLayers();
  addSpottoMap(searchStr);
});