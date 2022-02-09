const { Student } = require("../../../db.js");

const getStudents = async (req,res) => {
    try {
        
        let getAllStudents = await Student.findAll()
    
        res.status(200).json(getAllStudents)
    }catch(err) {
        console.error(err)
        console.log('Error in getStudents')
    }
}

module.exports={
    getStudents,
}