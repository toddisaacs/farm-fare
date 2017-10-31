import { $ } from  './bling';
import { showProgress, hideProgress } from './utils'

const mapOptions = {
  center: { lat: 39.87, lng: -86.46 },
  zoom: 12
};

var locationOptions = {
  enableHighAccuracy: true,
  timeout: 6000,
  maximumAge: 60000
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};


const progressOverlayHtml = `<i class="map-spinner fa fa-spinner fa-pulse fa-3x fa-fw"></i>`;

function makeMap(mapDiv) {
  if (!mapDiv) return;

  const map = new google.maps.Map(mapDiv, mapOptions);
  showProgress();

  //grab location & update
  getLocation()
  .then((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;   

    var panPoint = new google.maps.LatLng(lat, lng);
    map.panTo(panPoint)
  })
  .catch((error) => {
    console.log('ERROR', error);
  })
  .then(() => {
    hideProgress();
  });


  
}

function populateMap() {
  getLocation()
    .then((pos) => {
      console.log(`position ${pos}`);
    })
    .catch((error) => {
      console.log(`ERROR - ${error}`);
    });

}

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, locationOptions);
  });
}

export { makeMap, getLocation, populateMap};