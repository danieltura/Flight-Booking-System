const all = require("./all.json");

const new_file = [];

const needed = new Set([
  "United Arab Emirates",
  "Iran",
  "Germany",
  "United Kingdom",
  "Ethiopia",
  "India",
  "Bangladesh",
  "France",
  "Spain",
  "United States",
  "China",
  "Italy",
  "Mexico",
  "Turkey",
  "Thailand",
  "Canada",
]);
for (const city of all) {
  if (needed.has(city.country)) {
    const n = {
      name: city.name,
      code: city.code,
      city: city.city,
      country: city.country,
    };
    new_file.push(n);
  }
}

new_file.sort((a, b) =>
  a.country > b.country ? 1 : b.country > a.country ? -1 : 0
);
console.log(new_file.length);
const fs = require("fs");
var json = JSON.stringify(new_file);
fs.writeFile("cities_air_port.json", json, "utf8", (callback) =>
  console.log(callback)
);
