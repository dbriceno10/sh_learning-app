require("dotenv").config();
const { STRIPE_KEY } = process.env;
const { Student, Course, Order } = require("../../../db.js");
const stripe = require("stripe")(STRIPE_KEY);

const stripePay = async (req, res) => {
  const { amount, email, token, studentId, coursesId } = req.body;
  try {
    const student = await Student.findOne({//Busca el estudiante
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
      // return res.status(200).send(charge);
      student.addCourse(coursesId) //Agrega los cursos al estudiante
      const order = await Order.create({
        studentId: studentId,
        amount: amount,
        arrayCoursesId: coursesId,
      });
      return res
        .status(200)
        .send({ message: "Pago realizado con exito", orderId: order.id });
    } else {
      return res.status(404).send({ message: "Ha ocurrido un error" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { stripePay };
