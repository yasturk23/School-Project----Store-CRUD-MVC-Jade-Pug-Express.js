const data = require("../data")

const { createSale } = require("../queries/sales.queries")
const { readItems } = require("../queries/items.queries")
const { readLines, deleteAllLines } = require("../queries/lines.queries")

function getConfigs() {
  var configs
  if (!configs) configs = data.getConfigs()
  return configs
}

function getResults(lines) {
  const subtotal = +lines
    .reduce((acc, line) => {
      return acc + line.total
    }, 0)
    .toFixed(2)
  const gst = +(subtotal * getConfigs().taxes.gst).toFixed(2)
  const qst = +(subtotal * getConfigs().taxes.qst).toFixed(2)
  const total = +(subtotal + gst + qst).toFixed(2)

  return { subtotal, gst, qst, total }
}

exports.getSaleForm = async (req, res, next) => {
  try {
    const [items, lines] = await Promise.all([readItems(), readLines()])
    res.render("sale", { configs: getConfigs(), items: items, lines: lines, results: getResults(lines) })
  } catch (err) {
    next(err)
  }
}

exports.closeSale = async (req, res, next) => {
  try {
    const lines = await readLines()
    const results = getResults(lines)
    await Promise.all([createSale({ lines, results }), deleteAllLines()])
    res.redirect("/sale")
  } catch (err) {
    next(err)
  }
}
