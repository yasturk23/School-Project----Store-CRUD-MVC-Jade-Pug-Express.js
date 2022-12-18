const router = require("express").Router();
const { getSaleForm, closeSale } = require("../controllers/sales.controller")

router.get("/", getSaleForm)
router.post("/close", closeSale);

module.exports = router;
