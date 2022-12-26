const { Router } = require("express");
const router = Router();

const { dataMaker } = require("./mocks/bulkData");

router.post("/", dataMaker);

module.exports = router;
