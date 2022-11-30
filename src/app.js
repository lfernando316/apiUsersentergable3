const express = require("express");

const db = require("./utils/database");

const userRouter = require("./users/users.router");

const port = 9000;

const app = express();

db.authenticate()
  .then(() => {
    console.log("Database Authenticated");
  })
  .catch((err) => {
    console.log(err);
  });

db.sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Ok!" });
});

app.use("/api/v1", userRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
