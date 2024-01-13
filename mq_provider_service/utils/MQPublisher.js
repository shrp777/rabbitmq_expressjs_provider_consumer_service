import amqplib from "amqplib";

const DIRECT = "direct";
const FANOUT = "fanout";
const TOPIC = "topic";
const HEADERS = "headers";

const EXCHANGE_TYPES = [DIRECT, FANOUT, TOPIC, HEADERS];

async function publish(
  amqpUrl,
  message,
  exchange,
  queue,
  routingKey,
  options = { exchangeType: DIRECT, durable: true }
) {
  let channel, connection;

  if (EXCHANGE_TYPES.indexOf(options.exchangeType) === -1) {
    throw new Error(`${options.exchangeType} is not a valid Exchange Type`);
  }

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
