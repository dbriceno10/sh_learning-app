
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");



router.get("/", async (req, res, next) => {

    try {
      const courses = await Course.findAll();
      res.status(200).send(courses);
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  });

  module.exports = router;