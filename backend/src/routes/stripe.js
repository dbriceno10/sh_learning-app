const { Router } = require("express");
const router = Router();
const { stripePay } = require("./controller/stripe/post.order.controller");
const {
  getOrders,
  getOrder,
} = require("./controller/stripe/get.orders.controller");

router.post("/pay", stripePay);
router.get("/orders", getOrders);
router.get("/orders/detail/:id", getOrder);

module.exports = router;
