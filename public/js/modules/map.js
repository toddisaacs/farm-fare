import axios from 'axios';
import { $ } from  './bling';
import { showProgress, hideProgress } from './utils'

const defaultLat = 39.97;
const defaultLng = -86.12;

const mapOptions = {
  center: { lat: defaultLat, lng: defaultLng },
  zoom: 15  
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

var map_timeout = null;
var markers = [];
var marker = null;

function makeEditMap(mapDiv, latDiv, lngDiv) {
  //showProgress();
  //setup map on given div
  const map = createMap(mapDiv);

  return map;
}

function makeMap(mapDiv) {
  if (!mapDiv) return;
  
  showProgress();
  const map = createMap(mapDiv);

  //grab location & update
  getLocation()
  .then((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;   

    //get data
    loadMarkets(map, lat, lng);
  })
  .catch((error) => {
    console.log('ERROR', error);
  })
  .then(() => {
    hideProgress();
  });

  return map;
}

function createMap(mapDiv) {
  if (!mapDiv) return;
  const map = new google.maps.Map(mapDiv, mapOptions);

  return map;
}



function loadMarkets(map, lat = defaultLat, lng = defaultLng ) {
  //call API
  axios.get(`/api/markets/near?lat=${lat}&lng=${lng}`)
    .then(res => {
      const markets = res.data;

      if (markets.length <= 0) return;

      const bounds = new google.maps.LatLngBounds();
      const infoWindow = new google.maps.InfoWindow();

      //Add Markers
      const markers = markets.map(market => {
        const [marketLng, marketLat] = market.location.coordinates;
        const latlng = new google.maps.LatLng(marketLat, marketLng);
        bounds.extend(latlng);
        const marker = new google.maps.Marker({ map: map, position: latlng, title: market.name });
        marker.place = market;
     
        return marker;
      });

      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);

      // when clicked show info
      markers.forEach(marker => marker.addListener('click', function () {
        const html = `
          <div class="popup">
            <a href="/store/${this.place._id}">
              <img src="/uploads/${this.place.photo || 'market.png'}" alt="${this.place.name}" />
              <p>${this.place.name} - ${this.place.location.address}</p>
            </a>
          </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, this);
      }));

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


//clears the current marker and sets a new one
function setMarker(newMarker) {
  if (marker) {
    marker.setMap(null);
  }

  marker = newMarker;
}

function makeMarker(map, latLng) {
  return new google.maps.Marker({ map: map, position: latLng, title: '' });
}

function markerDetail(market) {
  return `
    <div class="popup">
      <a href="/market/${market._id}">
        <p>${market.name}</p>
      </a>
    </div>
  `;
}

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, locationOptions);
  });
}

export { makeMap, makeEditMap, makeMarker, setMarker, getLocation, populateMap};