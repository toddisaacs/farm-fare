const mongoose = require('mongoose');
const fs = require('fs');

//setup ENV
require('dotenv').config( { path: __dirname + '/../variables.env'} );

mongoose.connect(process.env.DATABASE_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => { 
  console.log(`Mongoose Connection ERROR → ${err.message}`);
});

const Market = require('../model/Market');

const markets = JSON.parse(fs.readFileSync(__dirname + '/markets.json', 'utf-8'));

async function loadData() {
  console.log('Adding fresh data');
  try {
    await Market.insertMany(markets);
  } catch (e) {
    console.log('FAILED TO LOAD DATA - ' + e);
  }
  process.exit();
}

loadData();
