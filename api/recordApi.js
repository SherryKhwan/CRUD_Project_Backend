const Router = require("express").Router();
const { RecordController } = require("../controllers");
const RecordValidator = require("../validators/recordValidator");
const { handleSuccessRes, handleError } = require("../lib/utils");

Router.post(
  "/create",
  RecordValidator.validateSchema,
  (req, res) => {
    const RecordControllerInstance = new RecordController();
    RecordControllerInstance
      .createRecord(req, res)
      .then((RecordRes) => {
        handleSuccessRes(res, RecordRes);
      })
      .catch((err) => {
        console.log(err);
        handleError(res, err);
      });
  }
);

Router.get(
  "/getall",
  (req, res) => {
    const RecordControllerInstance = new RecordController();
    const pageSize = parseInt(req.query.pagesize) || 10; // default to 10 if not provided
    const pageIndex = parseInt(req.query.pageindex) || 1; // default to 1 if not provided
    RecordControllerInstance
      .getAllRecords(pageSize, pageIndex)
      .then((RecordsRes) => {
        handleSuccessRes(res, RecordsRes);
      })
      .catch((err) => {
        console.log(err);
        handleError(res, err);
      });
  }
);

Router.get(
  "/:RecordId",
  (req, res) => {
    const RecordControllerInstance = new RecordController();
    RecordControllerInstance
      .getSingleRecord(req, res)
      .then((RecordRes) => {
        handleSuccessRes(res, RecordRes);
      })
      .catch((err) => {
        console.log(err);
        handleError(res, err);
      });
  }
);

Router.delete(
  "/:RecordId/delete",
  (req, res) => {
    const RecordControllerInstance = new RecordController();
    RecordControllerInstance
      .deleteRecord(req, res)
      .then((RecordRes) => {
        handleSuccessRes(res, RecordRes);
      })
      .catch((err) => {
        console.log(err);
        handleError(res, err);
      });
  }
);

Router.put(
  "/:RecordId/update",
  RecordValidator.validateSchemaToUpdate,
  (req, res) => {
    const RecordControllerInstance = new RecordController();
    RecordControllerInstance
      .updateRecord(req, res)
      .then((RecordRes) => {
        handleSuccessRes(res, RecordRes);
      })
      .catch((err) => {
        // console.log(err);
        handleError(res, err);
      });
  }
);


module.exports = Router;
