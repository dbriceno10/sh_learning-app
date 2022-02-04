const { Router } = require("express");
const axios = require("axios");
const router = Router();
const courses = require("../../mocks/mocks.js");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error);
  }
})

module.exports = router;