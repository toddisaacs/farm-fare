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
  currentLocationButton(map)

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

    //https://jsfiddle.net/ogsvzacz/6/
    function currentLocationButton(map) {
      var controlDiv = document.createElement('div');
      
      var firstChild = document.createElement('button');
      firstChild.style.backgroundColor = '#fff';
      firstChild.style.border = 'none';
      firstChild.style.outline = 'none';
      firstChild.style.width = '28px';
      firstChild.style.height = '28px';
      firstChild.style.borderRadius = '2px';
      firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      firstChild.style.cursor = 'pointer';
      firstChild.style.marginRight = '10px';
      firstChild.style.padding = '0';
      firstChild.title = 'Your Location';
      controlDiv.appendChild(firstChild);
  
      var secondChild = document.createElement('div');
      secondChild.style.margin = '5px';
      secondChild.style.width = '18px';
      secondChild.style.height = '18px';
      secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
      secondChild.style.backgroundSize = '180px 18px';
      secondChild.style.backgroundPosition = '0 0';
      secondChild.style.backgroundRepeat = 'no-repeat';
      firstChild.appendChild(secondChild);
      
      google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
      });
  
      //add listeners here
      firstChild.addEventListener('click', function (e) {
        e.preventDefault();
  
        var imgX = '0',
            animationInterval = setInterval(function () {
                imgX = imgX === '-18' ? '0' : '-18';
                secondChild.style['background-position'] = imgX+'px 0';
            }, 500);
  
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(latlng);
                const marker = makeMarker(map, latlng);
                setMarker(marker);
  
                clearInterval(animationInterval);
                secondChild.style['background-position'] = '-144px 0';
            });
        } else {
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '0 0';
        }
      });
  
      controlDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  
    } //END locationButton
}








