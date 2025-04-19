const tariff = require(".");
console.log(
    "origin:",
    tariff.timer(() => require("axios"))
);