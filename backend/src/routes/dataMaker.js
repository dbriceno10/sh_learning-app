const { Router } = require("express");
const router = Router();

const { dataMaker } = require("./mocks/bulkData");

router.get("/", dataMaker);

module.exports = router;
