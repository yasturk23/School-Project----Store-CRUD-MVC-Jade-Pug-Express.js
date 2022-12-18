const db = require("../database");
const data = require("./index");
const Item = require("../database/models/item.model");

const removeDuplicatedItems = (items) => {
  return items.filter((item,sku,self)=>self.findIndex(found=>(found.sku === item.sku))===sku)
};

const items = removeDuplicatedItems(data.getItems());

const migrateItems = () => {
  db.connect(() => {

    let count = 0;
  
    Item.deleteMany({}).then(() => {
      items.forEach((item) => {
        const newItem = new Item({
          sku: item.sku,
          name: item.name,
          description: item.description,
          sale_price: item.sale_price,
          image_url: item.image_url,
          brand: item.brand,
        });
        newItem
          .save()
          .then((item) => console.log(`${++count} - Item ${item.sku} ajouté`))
          .catch((err) => console.error(err));
      });
    });
  });
}




/* 
Le code suivant n'est utilisé que pour corriger des erreurs dans le fichier items.json.
Ne pas tenir compte du code suivant
*/
const getItemMaxLength = (property) => {
  let max = 0;
  items.forEach((item) => {
    if(item[property].length > max) {max = item[property].length}
  })
  return max
}

const fixSKUShortLength = () => {
  items.forEach((item) => {
    if(!item.sku.length == 7) {
      console.log(item.sku.padLeft(7, "0"))
    }
  })
}


migrateItems()
console.log(`NAME max = ${ getItemMaxLength("name") }`)
console.log(`BRAND max = ${ getItemMaxLength("brand") }`)
console.log(`DESCRIPTION max = ${ getItemMaxLength("description") }`)