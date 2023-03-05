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

fetch("res/spots-info.json")
  .then(response => response.json())
  .then(data => {
      data.forEach(item => {
          const imagesHTML = item.imageSource.map(src => `<div class="spot-image"><img src="${src}" width="240" height="180"></div>`).join('');
          const popup_html = $(`<div id="spot-popup">
          <div id="spot-images">${imagesHTML}${item.imageSource.length > 1 ? '<div class="next-image-icon"><i class="fas fa-chevron-right"></i></div>' : ''}</div>
          <div id="spot-name">${item.name}</div>
          <div id="spot-address">${item.address}</div>
          <div id="spot-description">${item.description}</div>
          </div>`)[0];
          const popup = L.popup({maxWidth: "100%"}).setContent(popup_html);
          const spotmark = L.marker([item.latitude, item.longitude], {}).addTo(map).bindPopup(popup).bindTooltip(`<div>${item.name}</div>`, {sticky: true});
          if (item.imageSource.length > 1) {
              let imageIndex = 0;
              const spotImages = popup_html.querySelectorAll(".spot-image");
              popup_html.querySelector(".next-image-icon").addEventListener("click", () => {
                  imageIndex = (imageIndex + 1) % item.imageSource.length;
                  spotImages.forEach(img => img.style.display = "none");
                  spotImages[imageIndex].style.display = "block";
              });
          }
          console.log(`${item.name}, ${item.address}, ${item.description}`);
      });
  })
  .catch(error => console.error(error));
