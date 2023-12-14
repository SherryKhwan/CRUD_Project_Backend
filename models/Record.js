const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  developerName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String    
  },
  unit: {
    type: String,
  },
  unitType: {
    type: String,
  },
  level: {
    type: String,
  },
  location: {
    type: String,
  },
  exposure: {
    type: String,
  },
  size: {
    type: String,
  },
  bedCount: {
    type: Number,
  },
  bathCount: {
    type: Number,
  },
  needParking: {
    type: Boolean,
    default: false
  },
  needLocker: {
    type: Boolean,
    default: false
  },
  needBalcony: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
