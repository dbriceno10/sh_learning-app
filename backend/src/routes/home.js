
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review ,Records} = require("../db");



router.get("/", async (req, res, next) => {

    try {
        const {idStudent} = req.query;
        const history = await Records.findAll({
            where: { idStudent: idStudent },
            attributes: ["idVideo"], //saco el atributo id video
          })
        ;
        //*take out duplicate idVideos
        let uniqueID = history.filter( (element,index) => {
            return history.indexOf(element) === index;
        })
       if (uniqueID.length >5 ) uniqueID.length =5; //aca trunco el arreglo para que solo devuelva los primeros 5 registros
        res.status(200).send(uniqueID);
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
  });

  module.exports = router;