const tariff = require(".");
const { percent } = require(".");
tariff.increaseBy({
    axios: percent(200)
});
console.log(
    "after:",
    tariff.timer(() => require("axios"))
);