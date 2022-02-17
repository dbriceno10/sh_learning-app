const { Router } = require("express");
const router = Router();
<<<<<<< HEAD
const { stripePay } = require("./controller/stripe/post.order.controller");
=======
const { stripePay, generateOrder } = require("./controller/stripe/post.order.controller");
>>>>>>> 56dc094e07215cc905c1364c5d27f0b148dec86d
const {
  getOrders,
  getOrder,
} = require("./controller/stripe/get.orders.controller");

router.post("/pay", stripePay);
<<<<<<< HEAD
=======
router.post("/generate", generateOrder);
>>>>>>> 56dc094e07215cc905c1364c5d27f0b148dec86d
router.get("/orders", getOrders);
router.get("/orders/detail/:id", getOrder);

module.exports = router;
