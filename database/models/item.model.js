const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    sku: {
      type: String,
      minLength: [7, "{VALUE} must have exactly 7 characters"],
      maxLength: [7, "{VALUE} must have exactly 7 characters"],
      required: true,
      unique: true,
    },
    name: {
      type: String,
      maxLength: [125, "Name must be at most 125 characters"],
      required: true,
    },
    description: {
      type: String,
      maxLength: [3000, "Description must be at most 3000 characters"],
    },
    sale_price: {
      type: Number,
      required: true,
      default: 0,
    },
    image_url: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      minLength: [2, "{VALUE} must be at least 2 characters"],
      maxLength: [30, "{VALUE} must be at most 30 characters"],
    },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", schema);
module.exports = Item;
