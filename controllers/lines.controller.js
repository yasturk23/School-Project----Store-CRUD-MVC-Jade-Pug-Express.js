const { readItem } = require("../queries/items.queries")
const { incrementLineQuantity, createLine } = require("../queries/lines.queries")

exports.addLine = async (req, res, next) => {
  try {
    const {sku, quantity} = req.body
    const item = await readItem(sku)
    if (item) {
      let line = await incrementLineQuantity({sku, quantity})
      if (!line) await createLine({sku, quantity, item})
      res.redirect("/sale")
    } else {
      throw new Error(`L'item ${sku} est introuvable`)
    }
  } catch (err) {
    next(err)
  }
}
