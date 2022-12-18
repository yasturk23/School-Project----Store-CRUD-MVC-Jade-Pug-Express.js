const HTTP_PORT = 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./database");
const path = require("path");
const router = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);
app.set("view engine", "pug");

app.use((err, req, res, next) => {
  if (err) {
    console.log("Erreur gérée par le programmeur :: ", err);

    res.render("error", { error: err.message });
  }
});

db.connect(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Serveur NodeJS démarré sur http://localhost:${HTTP_PORT}`);
  });
});
