const { Router } = require("express");
const router = Router();
const { stripePay, generateOrder } = require("./controller/stripe/post.order.controller");
const {
  getOrders,
  getOrder,
} = require("./controller/stripe/get.orders.controller");

router.post("/pay", stripePay);
router.post("/generate", generateOrder);
router.get("/orders", getOrders);
router.get("/orders/detail/:id", getOrder);
