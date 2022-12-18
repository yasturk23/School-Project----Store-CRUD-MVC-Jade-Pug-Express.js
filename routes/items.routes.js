const {
  createItem,
  getItems,
  deleteItem,
  editItem,
} = require("../controllers/items.controller");

const upload = require("./../utils/multer");

const router = require("express").Router();
////////////////////////////////////////////

//

router.get("/", (req, res) => {
  res.redirect("/items/page=1?limit=10");
});

router.get("/:page", getItems);

router.get("/:page?limit", getItems);

router.post("/", upload, createItem);

router.post("/delete", deleteItem);

router.post("/edit", upload, editItem);

//
////////////////////////////
module.exports = router;
