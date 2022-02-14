require("dotenv").config();
const { STRIPE_KEY } = process.env;
const { Student, Course } = require("../../../db.js");
const stripe = require("stripe")(STRIPE_KEY);

const stripePay = async (req, res) => {
  const { amount, email, token, studentId, courseId } = req.body;
  try {
    const course = Course.findOne({ //Busca el curso
      where: {
        id: courseId,
      },
    });
    if (!course) { //Si no existe el curso
      return res.status(404).send({ message: "No se encontro el curso" });
    }
    const student = Student.findOne({ //Busca el estudiante
      where: {
        id: studentId,
      },
    });
    if (!student) { //Si no existe el estudiante
      return res.status(404).send({ message: "No se encontro el estudiante" });
    }

    let customer = await stripe.customers.create({ //Crea el cliente
      email: email,
      source: token.id,
      name: token.card.name,
    });

    let charge = await stripe.charges.create({ //Crea el cargo
      amount: parseFloat(amount) * 100,
      description: `Payment for USD ${amount}`,
      currency: "USD",
      customer: customer.id,
    });
    if (charge) { //Si se creo el cargo
      student.addCourse(course.id); //Agrega el curso al estudiante
      // return res.status(200).send(charge);
      return res.status(200).send({ message: "Pago realizado con exito" });
    } else {
      return res.status(404).send({ message: "Ha ocurrido un error" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { stripePay };