const mongoose = require("mongoose");

const schema = mongoose.Schema({
  subtotal: {
    type: Number,
    required: true
  },
  qst: {
    type: Number,
    required: true
  },
  gst: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  lines: {
    type: Array,
    required: true
  }
}, {timestamps: true});

const Sale = mongoose.model("Sale", schema);
module.exports = Sale;