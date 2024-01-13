import amqplib from "amqplib";

async function consume(
  amqpUrl,
  queue,
  consumerTag,
  options = { durable: true, noAck: false }
) {
  let connection, channel;

  try {
    connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    channel = await connection.createChannel();
    channel.prefetch(10);

    await channel.assertQueue(queue, { durable: options.durable });
    await channel.consume(
      queue,
      async (message) => {
        await onMessageReceived(message);
        await channel.ack(message);
      },
      {
        noAck: options.noAck,
        consumerTag: consumerTag
      }
    );

    process.once("SIGINT", async () => {
      //got sigint, closing connection
      await channel.close();
      await connection.close();
      //
      process.exit(0);
    });
  } catch (err) {
    console.error("Error in consuming message", err);
    //Closing channel and connection if available
    await channel.close();
    await connection.close();
    //Channel and connection closed
  }

  async function onMessageReceived(message) {
    console.log("Message received");
    try {
      const { consumerTag, deliveryTag, redelivered, exchange, routingKey } =
        message.fields;

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
      } = message.properties;
      console.log({ headers });

      const payload = JSON.parse(Buffer.from(message.content).toString());
      console.log(payload);
    } catch (error) {
      console.error(error);
    }
  }
}

export default consume;
