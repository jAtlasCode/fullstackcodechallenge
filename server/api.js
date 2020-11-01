const express = require("express");
const app = express();
const port = 3001;
const restaurantList = require("./restaurantData.json");
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/restaurants", (req, res) => {
  console.log("Client requested the Restaurant List!");
  res.send(restaurantList);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
