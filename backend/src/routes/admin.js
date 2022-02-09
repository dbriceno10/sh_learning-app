const { Router } = require("express");
const router = Router();
const {Op} = require('sequelize');
const { Category, Course, Student, Teacher, Video, Review ,Records} = require("../db");


router.get('/courses?name=', async (req, res) => {
    const name = req.query;
    if(name){
        try{           
            let course = await Course.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                }
            });
            res.send(course);
        }catch(error){
            res.sendStatus(500).send(error)
        }
    }else{
        let course = await Course.findAll();
        res.send(course);
    }
});

router.get('/students?name=', async (req, res) => {
    const name = req.query;
    if(name){
        try{           
            let student = await Student.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                }
            });
            res.send(student);
        }catch(error){
            res.sendStatus(500).send(error)
        }
    }else{
        let student = await Student.findAll();
        res.send(student);
    }
});

router.get('/teachers?name=', async (req, res) => {
    const name = req.query;
    if(name){
        try{           
            let teacher = await Teacher.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                }
            });
            res.send(teacher);
        }catch(error){
            res.sendStatus(500).send(error)
        }
    }else{
        let teacher = await Teacher.findAll();
        res.send(teacher);
    }
});

module.exports = router;