import express from "express";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import consume from "./utils/MQConsumer.js";

import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const queue = process.env.MQ_QUEUE;
const consumerTag = process.env.MQ_CONSUMER_TAG;
const amqpUrl = process.env.MQ_AMQP_URL || "amqp://localhost:5673";

await consume(amqpUrl, queue, consumerTag);

export default app;
