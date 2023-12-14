const router = require("express").Router();

router.use("/", require("../api/recordApi"));

module.exports = router;
