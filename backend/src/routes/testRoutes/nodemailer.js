const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { Router } = require("express");

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    let Transport = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      auth: {
        user: "", //gmail
        pass: "", //password
      },
    });

    let mailOptions = {
      from: data.email,
      to: "", //your own email and check
      subject: "Test Nodemailer",
      html: `
      
      <h3>Hello this is a message from nodemailer</h3>

      <h3>Mesagge</h3>
      <p>${data.message}</p>
      
      `,
    };

    Transport.sendMail(mailOptions, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send("Email sent succesfully");
      }
    });

    Transport.close();
  } catch (error) {
    console.error(error);
    res.send(`ERROR: ${error}`);
  }
});

module.exports = router;
