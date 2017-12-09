function autocomplete(input, lat, lng) {
  if (!input) return;

  const dropdown = new google.maps.places.Autocomplete(input);
  
  //listen and react to changes
  // dropdown.addListener('place_changed', () => {
  //   const place = dropdown.getPlace();

  //   if(place.geometry) {
  //     lat.value = place.geometry.location.lat();
  //     lng.value = place.geometry.location.lng();
  //   }
  // });
  
  input.on('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  })

  return dropdown;
}

export default autocomplete;