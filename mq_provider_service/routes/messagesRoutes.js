import { Router } from "express";
import publish from "../utils/MQPublisher.js";
const amqpUrl = process.env.MQ_AMQP_URL || "amqp://localhost:5673";

const router = Router();

router.post("/", async (req, res, next) => {
  const exchange = process.env.MQ_EXCHANGE;
  const queue = process.env.MQ_QUEUE;
  const routingKey = process.env.MQ_ROUTING_KEY;

  try {
    const message = req.body.message;

    await publish(amqpUrl, message, exchange, queue, routingKey);
    res.json({ message: "Message published" });
  } catch (error) {
    console.error(error);
    next(500);
  }
});

export default router;
