const mongoose = require('mongoose');
mongoose.Promise = global.Promise;  //http://mongoosejs.com/docs/promises.html see pluggin in section

const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a Market name!'
  },
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String
});

marketSchema.index({
  location: '2dsphere'
});


module.exports = mongoose.model('Market', marketSchema);