const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");

router.post("/", async (req, res, next) => {
  // const { title, description, url, duration, courseName } = req.body;
  const { title, description, duration, courseName } = req.body; //*line without the url
  try {
    const FK = await Course.findOne({
      where: {
        name: courseName,
      },
    });
    const video = await Video.create({
      title,
      description,
      // url, //!the url is the same id .
      duration,
      FKcourseID: FK.id,
    });
    res.status(200).send(video);
  } catch (error) {
    console.error(error)
    res.status(404).send(error);
  }
});

//? Route that return all the videos, if query parameter exist return the info of a particular video
router.get("/", async (req, res, next) => {
  try {
   
    const {idVideo,idStudent} = req.query;
    //*If exists a query parameter return the info of that video
    if (idVideo){
      const dataVideo = await Video.findOne({
        where: {
          id: idVideo,
        },
      });

      Student.update(
        { lastVideos: idVideo },
        { where: { id: idStudent }   }
      )
      res.status(200).send(dataVideo.url);

    } else{ //* Else return all the videos
      const videos = await Video.findAll();
      res.status(200).send(videos);
    }
  } catch (error) {
    console.error(error)
    res.status(404).send(error);
  }
});







module.exports = router;
