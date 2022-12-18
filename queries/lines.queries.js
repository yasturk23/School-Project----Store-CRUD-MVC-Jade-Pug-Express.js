const Line = require('../database/models/line.model')

exports.createLine = data => {
  return (new Line({
    sku: data.sku,
    quantity: data.quantity,
    name: data.item.name,
    price: data.item.sale_price,
    image_url: data.item.image_url,
    brand: data.item.brand,
  })).save()
}

exports.readLines = () => {
  return Line.find({})
}

exports.deleteAllLines = () => {
  return Line.deleteMany({});
}

exports.incrementLineQuantity = (data) => {
  return Line.findOneAndUpdate({ sku: data.sku }, { $inc: { quantity: data.quantity } }, { runValidators: true, new: true })
}
