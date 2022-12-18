const Sale = require("../database/models/sale.model.js");

exports.createSale = (data) => {
  return (new Sale({
    lines: data.lines,
    subtotal: data.results.subtotal,
    gst: data.results.gst,
    qst: data.results.qst,
    total: data.results.total,
  })).save()
}