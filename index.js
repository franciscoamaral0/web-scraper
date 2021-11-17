const { load } = require("cheerio");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const { generate } = require("shortid");
const DomScrapperComposer = require("./Composer");

let myArgs = process.argv.slice(2);

const BASE_URL = `${myArgs[0]}`;
const start = async () => {
  const url = BASE_URL;
  const htmlStr = await (await fetch(url)).text();
  const $ = load(htmlStr);
  fs.writeFileSync(`./htmls/${generate()}-${Date.now()}.html`, $.html());
  const composer = new DomScrapperComposer($);
  const json = composer.domToJSON();
  console.log(json);
  const result = fs.writeFileSync(
    `./jsons/${generate()}-${Date.now()}.json`,
    JSON.stringify(json, null, 2)
  );
  // console.log(result)

  // -----

  let re = /<([a-z]+)(?=[\s>])(?:[^>=]|='[^']*'|="[^"]*"|=[^'"\s]*)*\s?\/?>/gi;
  let m;
  let HashTable = {};

  do {
    m = re.exec(htmlStr);

    if (m) {
      if (!(m[1] in HashTable)) {
        HashTable[m[1]] = 0;
      }

      HashTable[m[1]]++;
    }
  } while (m);

  const values = [];
  for (let key in HashTable) {
    values.push(JSON.stringify(`<${key}> = ${HashTable[key]}`));
  }
  console.log(values);
};

start();
