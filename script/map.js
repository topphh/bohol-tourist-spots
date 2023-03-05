// Create a map and set its center to the center of Bohol.
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

// Create a new tile layer using OpenStreetMap.
var tile_layer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
      attribution: "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.",
      detectRetina: false,
      maxNativeZoom: 18,
      maxZoom: 18,
      minZoom: 9,
      noWrap: false,
      opacity: 10,
      subdomains: "abc",
      tms: false
  }
).addTo(map);

// Loop through all elements in spots-info.json and place the information onto a spot in the map.
fetch("res/spots-info.json")
  .then(response => response.json())
  .then(data => {
      data.forEach(item => {
          console.log(`${item.name}, ${item.address}, ${item.description}`);
          var popup = L.popup({maxWidth: "100%"});
          let spotmark = L.marker([item.latitude, item.longitude], {}).addTo(map);

          // Create an HTML object for each image source.
          let imagesHTML = "";
          item.imageSource.forEach(src => {
              imagesHTML += `<div class="spot-image"><img src="${src}" width="240" height="180"></div>`;
          });

          // Add the next image icon if there is more than one image.
          if (item.imageSource.length > 1) {
              imagesHTML += '<div class="next-image-icon"><i class="fas fa-chevron-right"></i></div>';
          }

          var popup_html = $(`<div id="spot-popup">
              <div id="spot-name">${item.name}</div>
              <div id="spot-images">${imagesHTML}</div>
              <div id="spot-description">${item.description}</div>
          </div>`)[0];

          popup.setContent(popup_html);
          spotmark.bindPopup(popup);

          // Navigate through multiple images.
          if (item.imageSource.length > 1) {
              let imageIndex = 0;
              let spotImages = popup_html.querySelectorAll(".spot-image");

              popup_html.querySelector(".next-image-icon").addEventListener("click", () => {
                  imageIndex = (imageIndex + 1) % item.imageSource.length;
                  spotImages.forEach(img => img.style.display = "none");
                  spotImages[imageIndex].style.display = "block";
              });
          }

          spotmark.bindTooltip(`<div>${item.name}</div>`, {sticky: true});
      });
  })
  .catch(error => console.error(error));
