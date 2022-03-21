const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });


connectToMongo();

const app = express();
const port = 5555;

app.use(express.json());
app.use(cors());

// Available Routes
app.use(require("./routes/auth"));
app.use(require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
