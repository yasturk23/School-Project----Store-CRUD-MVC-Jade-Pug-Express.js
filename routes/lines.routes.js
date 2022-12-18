const router = require("express").Router();
const { addLine } = require("../controllers/lines.controller")

router.post("/", addLine);

module.exports = router;
