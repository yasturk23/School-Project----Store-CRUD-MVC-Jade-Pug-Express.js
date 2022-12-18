const Item = require("../database/models/item.model");

exports.readItems = () => {
  return Item.find({}).collation({ locale: "fr_CA" }).sort({ name: 1 });
};

exports.readItem = (sku) => {
  return Item.findOne({ sku: sku });
};

exports.createItem = (data) => {
  return new Item({
    sku: data.sku,
    name: data.name,
    description: data.description,
    sale_price: data.sale_price,
    image_url: data.image_url,
    brand: data.item.brand,
  }).save();
};
