const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res, next) => {
  res.json("Hello World");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
