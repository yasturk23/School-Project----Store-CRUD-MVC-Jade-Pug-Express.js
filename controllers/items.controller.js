const { readItems } = require("../queries/items.queries");
const fs = require("fs");
const path = require("path");

const uploads = path.join(__dirname, "../public/uploads");

const Item = require("./../database/models/item.model");

exports.getItems = async (req, res, next) => {
  console.log("getItems");
  try {
    let limit;
    if (req.query.limit) {
      limit = Number(req.query.limit);
    }
    console.log(limit);
    let params = Number(req.params.page.split("=")[1]);
    //console.log(params);

    let pageNumber = params > 0 ? Math.floor(params) : 0;

    const items = await readItems()
      .skip(params * limit - limit)
      .limit(limit);
    const count = await readItems().count().exec();
    //console.log(count);

    res.render("items", {
      items,

      pageNumber,

      limit,
      count,
      lastPage: Math.floor(count / limit),
    });
  } catch (err) {
    next(err);
  }
};

///////////////////////////////////////////////////////////////

exports.createItem = async (req, res, err) => {
  try {
    console.log("create Item");
    //console.log(req.body);

    let uuidNewImg = getMostRecentFile(uploads).file;
    //console.log(uuidNewImg);
    let pathNewImg = path.resolve(`./../public/uploads/${uuidNewImg}`);
    //console.log(pathNewImg);

    let formattedPathNewImg = String(pathNewImg.split("public")[1]);
    //console.log(`z = ${formattedPathNewImg}`);

    let sku = req.body.sku;
    let name = req.body.name;
    let description = req.body.description;
    let sale_price = req.body.price;
    let brand = req.body.brand;

    ////////////////////////
    console.log(req.file);
    ////////////////

    if (req.file !== undefined) {
      console.log("here");
      let uuidNewImg = getMostRecentFile(uploads).file;
      //console.log(uuidNewImg);
      let pathNewImg = path.resolve(`public/uploads/${uuidNewImg}`);
      //console.log(pathNewImg);

      let formattedPathNewImg = String(pathNewImg.split("public")[1]);
      //console.log(`z = ${formattedPathNewImg}`);

      const newItem = await Item.create({
        sku: sku,
        name: name,
        description: description,
        sale_price: sale_price,
        image_url: formattedPathNewImg,
        brand: brand,
      });
      await newItem.save();
      console.log(`new item`, newItem);
    } else {
      const newItem = await Item.create({
        sku: sku,
        name: name,
        description: description,
        sale_price: sale_price,
        image_url: "/images/image-placeholder.png",
        brand: brand,
      });
      await newItem.save();
      console.log(`new item`, newItem);
    }
    //////////////////////////////////
    // const newItem = await Item.create({
    //   sku: sku,
    //   name: name,
    //   description: description,
    //   sale_price: sale_price,
    //   image_url: formattedPathNewImg,
    //   brand: brand,
    // });
    //await newItem.save();

    /////////////////////////////////////////

    let url = req.rawHeaders[19];
    let limit = Number(url.split("=")[2]);
    //console.log(limit);

    let pageNumber = Number(url.split("=")[1].split("?")[0]);
    // console.log(pageNumber);

    const items = await readItems()
      .skip(pageNumber * limit)
      .limit(limit);
    const count = await readItems().count().exec();
    console.log(count);

    await res.render("items", {
      items,
      pageNumber,
      limit,
      count,
      lastPage: Math.floor(count / limit),
    });

    // let url = req.rawHeaders[19];
    // let limit = Number(url.split("=")[2]);

    // let pageNumber = Number(url.split("=")[1].split("?")[0]);

    // let params = Number(pageNumber * limit);

    // const items = await readItems()
    //   .skip(params * limit)
    //   .limit(limit);
    // const count = await readItems().countDocuments().exec();
  } catch (err) {
    console.log(err.message);
    res.redirect("/items");
  }
};

////////////////////////////////////////////////////////////

exports.deleteItem = async (req, res, err) => {
  try {
    console.log("Delete Item");
    //console.log(req.body);
    let sku = req.body.params.sku;

    console.log(req.rawHeaders[19]);
    let url = req.rawHeaders[19];
    //let limit = Number(url.split("=")[2]);
    //console.log(limit);
    //let pageNumber = Number(url.split("=")[1].split("?")[0]);
    //console.log(pageNumber);

    let item = await Item.findOneAndDelete({ sku: sku }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Item : ", docs);
      }
    });
    return item;
  } catch (err) {
    console.log(err.message);
    return;
  }
};

exports.editItem = async (req, res, err) => {
  console.log("edit Item");

  try {
    let url = req.rawHeaders[27];
    let limit = Number(url.split("=")[2]);

    let pageNumber = Number(url.split("=")[1].split("?")[0]);

    let itemSku = req.body.SKU;
    //console.log(itemSku);

    let newPrice = Number(req.body.Prix);
    let newBrand = req.body.Marque;
    let newName = req.body.Nom;
    let newDescription = req.body.Description;

    //console.log(`req.file = ${req.file}`);

    if (req.file !== undefined) {
      let uuidNewImg = getMostRecentFile(uploads).file;
      //console.log(uuidNewImg);
      let pathNewImg = path.resolve(`public/uploads/${uuidNewImg}`);
      //console.log(pathNewImg);

      let formattedPathNewImg = String(pathNewImg.split("public")[1]);
      //console.log(`z = ${formattedPathNewImg}`);

      Item.findOneAndUpdate(
        { sku: itemSku },
        {
          name: newName,
          description: newDescription,
          sale_price: newPrice,
          brand: newBrand,
          image_url: formattedPathNewImg,
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } else {
      Item.findOneAndUpdate(
        { sku: itemSku },
        {
          name: newName,
          description: newDescription,
          sale_price: newPrice,
          brand: newBrand,
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    const items = await readItems()
      .skip(pageNumber * limit)
      .limit(limit);
    const count = await readItems().count().exec();
    //console.log(count);

    res.render("items", {
      items,
      pageNumber,
      limit,
      count,
      lastPage: Math.floor(count / limit),
    });
  } catch (err) {
    console.log(err);
  }
};

////////////////////////////////////////////

const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};

const orderReccentFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};
