const { Student } = require("../../db");

clientId = "481476732546-redihub2q7951q72m79sjcgglp0iatsc.apps.googleusercontent.com"

const loginGoogle = async (req, res) => {

    const { firstName, lastName, email, tokenId } = req.body
    try {
        let student = await Student.findOne({
            where: { email }
        })
        if (!student) {
            student = await Student.create({ name: firstName, lastname: lastName, email, username: email, tokenId })
        }
        res.send(student)
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    loginGoogle
};