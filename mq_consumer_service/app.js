import express from "express";
import logger from "morgan";
import indexRouter from "./routes/index.js";

import helmet from "helmet";
import amqplib from "amqplib";

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const queue = process.env.MQ_QUEUE;
const consumerTag = process.env.MQ_CONSUMER_TAG;

const connection = await amqplib.connect(
  process.env.MQ_AMQP_URL,
  "heartbeat=60"
);
const channel = await connection.createChannel();
channel.prefetch(10);

await channel.assertQueue(queue, { durable: true });
await channel.consume(
  queue,
  async (msg) => {
    await onMessageReceived(msg);
    await channel.ack(msg);
  },
  {
    noAck: false,
    consumerTag: consumerTag
  }
);

async function onMessageReceived(msg) {
  console.log("Message received");
  try {
    //console.log(msg);
    const { consumerTag, deliveryTag, redelivered, exchange, routingKey } =
      msg.fields;

    console.log({ consumerTag });
    console.log({ deliveryTag });
    console.log({ redelivered });
    console.log({ exchange });
    console.log({ routingKey });

    const {
      headers,
      deliveryMode,
      priority,
      replyTo,
      expiration,
      messageId,
      timestamp,
      type,
      userId,
      appId,
      clusterId
    } = msg.properties;
    console.log({ headers });

    const payload = JSON.parse(Buffer.from(msg.content).toString());
    console.log(payload);
  } catch (error) {
    console.error(error);
  }
}

process.once("SIGINT", async () => {
  console.log("got sigint, closing connection");
  await channel.close();
  await connection.close();
  process.exit(0);
});

export default app;
