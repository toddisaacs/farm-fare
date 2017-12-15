const fs = require('fs');

exports.icon = (name) => {
  return fs.readFileSync(`./public/images/icons/${name}`);
}

exports.staticMap = ([lat, lng]) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lng},${lat}&zoom=12&size=800x200&key=${process.env.MAP_KEY_VEGGIE_STAND}&markers=${lng},${lat}&scale=1`;
}
