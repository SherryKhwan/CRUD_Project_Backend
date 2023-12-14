const { RecordModel } = require("../models");
const GlobalErrors = require("../configs/global-errors");

class RecordService {
  constructor() { }

  getRecordById(_id) {
    return new Promise((resolve, reject) => {
      RecordtModel.findOne({ _id })
        .then((foundRecord) => {
          if (foundRecord) {
            resolve(foundRecord);
          } else {
            reject(
              GlobalErrors.NOT_FOUND({
                message: "Record not found by _id.",
              })
            );
          }
        })
        .catch((e) => {
          console.log(e);
          reject(
            GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
              message: " RecordtModel.findOne({ _id }) was being invoked.",
            })
          );
        });
    });
  }

  getAll(query, pageSize, pageIndex) {
    return new Promise((resolve, reject) => {
      // Calculate the skip value based on page size and index
      const skip = (pageIndex - 1) * pageSize;

      // Perform two queries: one to get the paginated data and another to get the total count
      const findQuery = RecordModel.find(query);
      const countQuery = RecordModel.countDocuments(query);

      Promise.all([findQuery.skip(skip).limit(pageSize), countQuery])
        .then(([foundRecords, totalCount]) => {
          resolve({ data: foundRecords, totalRecords: totalCount });
        })
        .catch((err) => {
          console.log(err);
          reject(
            GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
              message: "fetching list of Records.",
            })
          );
        });
    });
  }

  update(_id, Record) {
    return new Promise((resolve, reject) => {
      RecordModel.updateOne({ _id }, Record)
        .then((updated) => {
          if (updated.matchedCount == 1 && updated.modifiedCount == 1) {
            this.getRecordById(_id)
              .then((Record) => {
                resolve(Record);
              })
              .catch((e) => {
                console.log(e);
                reject(
                  GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
                    message: "this.getRecordById(_id) was being invoked.",
                  })
                );
              });
          } else if (updated.matchedCount == 1) {
            this.getRecordById(_id)
              .then((Record) => {
                resolve(Record);
              })
              .catch((e) => {
                console.log(e);
                reject(
                  GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
                    message: "this.getRecordById(_id) was being invoked.",
                  })
                );
              });
          } else {
            reject(
              GlobalErrors.NOT_FOUND({
                message: "Record was not found by _id.",
              })
            );
          }
        })
        .catch((e) => {
          console.log(e);
          reject(
            GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
              message:
                "RecordtModel.updateOne({ _id }, user) was being invoked.",
            })
          );
        });
    });
  }

  create(Record) {
    return new Promise((resolve, reject) => {
      RecordModel.create(Record)
        .then((created) => {
          if (created) {
            resolve(created);
          } else {
            reject(
              GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
                message: "creating a Record",
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
          reject(
            GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
              message: "creating a Record",
            })
          );
        });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      RecordModel.findByIdAndDelete(_id)
        .then((deleted) => {
          resolve(deleted);
        })
        .catch((err) => {
          console.log(err);
          reject(
            GlobalErrors.INTERNAL_SERVER_ERROR_WITH_MESSAGE({
              message: "deleting a Record.",
            })
          );
        });
    });
  }
}
module.exports = RecordService;
