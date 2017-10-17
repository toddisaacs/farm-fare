const fs = require('fs');

exports.icon = (name) => {
  return fs.readFileSync(`./public/images/icons/${name}`);
}