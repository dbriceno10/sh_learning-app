require("dotenv").config();
const { CLIENT_ID } = process.env;
const { Student } = require("../../db");

const clientId = CLIENT_ID

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