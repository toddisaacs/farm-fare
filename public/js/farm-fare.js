import '../sass/style.scss';
import { $, $$ } from './modules/bling';
import { makeMap, makeEditMap, makeMarker, getLocation , setMarker } from './modules/map';
import autocomplete from './modules/autocomplete';

const mapDiv = $('#map');
const editMapDiv = $('#editMap');
const latDiv = $('#lat');
const lngDiv = $('#lng');
const addressDiv = $('#address');

//setup Map
let map;
let addMarker = null;
let clickListener = null;

//main map will show markets for shown location and handle location changes.
if (mapDiv) {
  map = makeMap(mapDiv);
} 

//edit map will allow the user to pinpoint the location and search by address
if (editMapDiv) {
  map = makeEditMap(editMapDiv, latDiv, lngDiv);
  
  //handle user interaction
  google.maps.event.addListener(map, 'click', function(e) {
    clickListener = setTimeout(function() {
      const marker  = makeMarker(map, e.latLng);
      setMarker(marker);
      latDiv.value = e.latLng.lat();
      lngDiv.value = e.latLng.lng();
    }, 200);
  });

  //add double click so we can cancel the single click on zoom
  google.maps.event.addListener(map, 'dblclick', function(event) {    
    clearTimeout(clickListener);
  });

  //setup address search
  const dropdown = autocomplete($('#address'), $('#lat'), $('#lng'));
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();

    if(place.geometry) {
      latDiv.value = place.geometry.location.lat();
      lngDiv.value = place.geometry.location.lng();

      //update map
      if (map) {
        const marker = makeMarker(map, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        setMarker(marker);
      }
    }
  });

}








