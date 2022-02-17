require("dotenv").config();
const { STRIPE_KEY } = process.env;
const { Student, Course, Order } = require("../../../db.js");
const stripe = require("stripe")(STRIPE_KEY);

const stripePay = async (req, res) => {
  const { amount, email, token } = req.body;
  try {
    let customer = await stripe.customers.create({
      //Crea el cliente
      email: email,
      source: token.id,
      name: token.card.name,
    });

    let charge = await stripe.charges.create({
      //Crea el cargo
      amount: parseFloat(amount) * 100,
      description: `Payment for USD ${amount}`,
      currency: "USD",
      customer: customer.id,
    });
    if (charge) {
      //Si se creo el cargo
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

const generateOrder = async (req, res) => {
  const { studentId, coursesId, amount, status } = req.body;
  try {
    const student = await Student.findOne({
      //Busca el estudiante
      where: {
        id: studentId,
      },
    });
    if (!student) {
      //Si no existe el estudiante
      return res.status(404).send({ message: "No se encontro el estudiante" });
    }
    student.addCourse(coursesId); //Agrega los cursos al estudiante
    const order = await Order.create({
      studentId: studentId,
      amount: amount,
      arrayCoursesId: coursesId,
      status: status,
    });
    res
      .send(200)
      .send({ message: "Orden generada con exito", orderId: order.id });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { stripePay, generateOrder };
