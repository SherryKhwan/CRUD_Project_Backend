const GlobalErrors = require("../configs/global-errors");
const { RecordService } = require("../services");

class RecordController {
  constructor() {
    this.RecordServiceInstance = new RecordService();
  }

  createRecord(req, res) {
    return new Promise((resolve, reject) => {
      const {
        developerName,
        projectName,
        unit,
        unitType,
        level,
        location,
        exposure,
        size,
        bedCount,
        bathCount,
        needParking,
        needLocker,
        needBalcony,
      } = req.body;

      let obj = {
        developerName,
        projectName,
        unit,
        unitType,
        level,
        location,
        exposure,
        size,
        bedCount,
        bathCount,
        needParking,
        needLocker,
        needBalcony,
      };

      this.RecordServiceInstance
        .create(obj)
        .then((created) => {
          resolve(created);
        })
        .catch((e) => {
          reject(e);
        });
    })
  }

  getAllRecords(pageSize, pageIndex) {
    return new Promise((resolve, reject) => {
      try {
        this.RecordServiceInstance
          .getAll(undefined, pageSize, pageIndex)
          .then((Records) => {
            resolve(Records);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        console.log(error)
      }
    });
  }

  getSingleRecord(req, res) {
    return new Promise((resolve, reject) => {
      const { RecordId } = req.params;
      this.RecordServiceInstance
        .getRecordById(RecordId)
        .then((Record) => {
          resolve(Record);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  updateRecord(req, res) {
    return new Promise((resolve, reject) => {
      const { RecordId } = req.params;

      const {
        developerName,
        projectName,
        unit,
        unitType,
        level,
        location,
        exposure,
        size,
        bedCount,
        bathCount,
        needParking,
        needLocker,
        needBalcony,
      } = req.body;

      let obj = {
        developerName,
        projectName,
        unit,
        unitType,
        level,
        location,
        exposure,
        size,
        bedCount,
        bathCount,
        needParking,
        needLocker,
        needBalcony,
      };


      this.RecordServiceInstance
        .update(RecordId, obj)
        .then((updated) => {
          resolve(updated);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });

    });
  }

  deleteRecord(req, res) {
    return new Promise((resolve, reject) => {
      const { RecordId } = req.params;
      this.RecordServiceInstance
        .delete(RecordId)
        .then((deleted) => {
          if (deleted) {
            resolve({
              message: "Record deleted successfully.",
              ...deleted._doc,
            });
          } else {
            reject(
              GlobalErrors.NOT_FOUND({ message: "Record was not found." })
            );
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

}

module.exports = RecordController;
