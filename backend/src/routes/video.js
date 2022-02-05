const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");

router.post("/", async (req, res, next) => {
  const { title, description, url, duration, name } = req.body;
  try {
    const FK = await Course.findOne({
      where: {
        name: name,
      },
    });
    const video = await Video.create({
      title,
      description,
      url,
      duration,
      FKcourseID: FK.id,
    });
    res.status(200).send(video);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.status(200).send(videos);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
