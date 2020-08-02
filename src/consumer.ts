import kafka from "kafka-node";

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({
  kafkaHost: "localhost:9092",
});
const consumer = new Consumer(
  client,
  [{topic: "Topic1"}],
  {
    groupId: "simple-consumer2",
    autoCommit: true,
    fromOffset: true,
  }
);
consumer.on("message", message => {
  const obj = parse<{name:string,age:number}>(message.value);
  if (!obj) {
    return;
  }
  console.log(obj);
});

function parse<T>(value: unknown): T|undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  try {
    var obj = JSON.parse(value as string);
    return obj
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
