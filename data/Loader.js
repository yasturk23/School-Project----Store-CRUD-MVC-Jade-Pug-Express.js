const fs = require("fs");
const chalk = require("chalk");

class Loader {
  constructor(filename, isUsingId = false, defaultId = 1000) {
    this.filename = filename;
    this.isUsingId = isUsingId;
    this.defaultId = defaultId;
    this.dataKey = filename.match(/[ \w-]+?(?=\.)/gm, "")[0];
  }

  load = () => {
    try {
      const buffer = fs.readFileSync(this.filename);
      const json = buffer.toString();
      return JSON.parse(json);
    } catch (e) {
      return this.isUsingId ? { nextId: this.defaultId, [this.dataKey]: [] } : [];
    }
  };

  save = (object) => {
    const json = JSON.stringify(object);
    fs.writeFileSync(this.filename, json);
  };

  get = () => {
    const content = this.load();
    return this.isUsingId ? content[this.dataKey] : content;
  };

  add = (value, unique = false, key = null) => {
    const content = this.load();
    const data = this.isUsingId ? content[this.dataKey] : content;

    if (unique) {
      if (data.find((r) => r[key] === value[key])) {
        console.log(`Error: ${key} already exists with value ${value[key]}`);
        return;
      }
    }

    const record = this.isUsingId ? { id: content.nextId++, ...value } : value;

    data.push(record);

    this.save(content);
  };

  del = (key, value) => {
    const content = this.load();
    let data = this.isUsingId ? content[this.dataKey] : content;

    if (!data.find((r) => r[key] === value)) {
      console.log(chalk.red.inverse(`Error: ${key} not found with value ${value}`));
      return;
    }

    data = data.filter((r) => r[key] !== value);

    this.save(content);

    console.log(chalk.green.inverse(`Record ${key}=${value} deleted !`));
  };
}

module.exports = Loader;