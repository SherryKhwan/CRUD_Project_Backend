const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectMongodb } = require("./lib/utils");
const app = express();

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectMongodb()
  .then((connected) => {
    console.log(`connected to mongodb`);
    app.use("/api/record", require("./routes/recordRoutes"));
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
