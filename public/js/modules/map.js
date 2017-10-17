
const mapOptions = {
  center: { lat: 39.87, lng: -86.46 },
  zoom: 12
};

function makeMap(mapDiv) {
  if (!mapDiv) return;
  const map = new google.maps.Map(mapDiv, mapOptions);
}

export default makeMap;