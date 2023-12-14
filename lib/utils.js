const mongoose = require("mongoose");

function connectMongodb() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB successfully!");
        resolve(true);
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        reject(error);
      });
  });
}

function handleCatch(res, err) {
  res.json({ error: { message: err.message }, success: false }).status(500);
}

function handleError(res, error) {
  res.status(500).json({ error, success: false });
}

function handleSuccessRes(res, data) {
  if (data == null) {
    res.status(201).json({ data: null, success: true });
  }
  res.status(201).json({ data, success: true });
}

function handleValidationError(res, error) {
  res.status(403).json({ success: false, error });
}



module.exports = {
  connectMongodb,
  handleCatch,
  handleError,
  handleSuccessRes,
  handleValidationError,
};
