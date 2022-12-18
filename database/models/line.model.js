const mongoose = require("mongoose");

const schema = mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1,"Quantity must be between 1 and 99"],
    max: [99,"Quantity must be between 1 and 99"]
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String
  }
});

schema.virtual('total')
.get( function() { 
  return +(this.quantity * this.price).toFixed(2) 
})


const Line = mongoose.model("Line", schema);
module.exports = Line;