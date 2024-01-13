import amqplib from "amqplib";

async function publish(
  amqpUrl,
  message,
  exchange,
  queue,
  routingKey,
  options = { exchangeType: "direct", durable: true }
) {
  let channel, connection;

  try {
    console.log("Publishing");
    connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    channel = await connection.createChannel();

    await channel.assertExchange(exchange, options.exchangeType, {
      durable: options.durable
    });
    await channel.assertQueue(queue, { durable: options.durable });
    await channel.bindQueue(queue, exchange, routingKey);

    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );

    process.once("SIGINT", async () => {
      //got sigint, closing connection
      await channel.close();
      await connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error in publishing message", error);
  } finally {
    //Closing channel and connection if available
    await channel.close();
    await connection.close();
    //Channel and connection closed
  }
}

export default publish;
