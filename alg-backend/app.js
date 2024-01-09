const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const totalRoutes = require("./routes/totalRoutes");
app.use("/totals", totalRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
