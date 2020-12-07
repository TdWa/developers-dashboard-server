const express = require("express");
const app = express();
const { PORT } = require("./config/constants");
const cors = require("cors");
app.set("json spaces", 2);
const authRouter = require("./routers/auth");

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const User = require("./models").user;

app.use("/", authRouter);

app.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
