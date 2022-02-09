const { Teacher } = require("../../../db.js");

const getTeachers = async (req,res) => {
    try {
        
        let getAllTeachers = await Teacher.findAll()
    
        res.status(200).json(getAllTeachers )
    }catch(err) {
        console.error(err)
        console.log('Error in getTeachers')
    }
}

module.exports={
    getTeachers,
}