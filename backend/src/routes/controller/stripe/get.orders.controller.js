const { Order } = require("../../../db");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({});
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      res.status(404).send({ message: "No se encontro el pedido" });
    }
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
};
