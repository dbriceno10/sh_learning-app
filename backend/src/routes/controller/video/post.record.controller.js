const { Records } = require("../../../db");

const postRecord = async (req, res) => {
  try {
    const { idVideo, idStudent } = req.query;
    //*If exists a query parameter add the record to stdent_record table
    const newRecord = await Records.create({
      idVideo,
      idStudent,
    });
    res.status(200).send(newRecord);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

module.exports = {
  postRecord,
};
