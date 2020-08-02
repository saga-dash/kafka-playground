import kafka from "kafka-node";

const client = new kafka.KafkaClient({
  kafkaHost: "localhost:9092",
  connectTimeout: 1000,
  requestTimeout: 4000,
});
const producer = new kafka.Producer(client, {
  partitionerType: 1,
});

producer.on("ready", () => {
  const payloads = [
    {
      topic: "Topic1",
      messages: JSON.stringify({name: "フグ田サザエ", age: 24})
    },
    {
      topic: "Topic1",
      messages: [
        JSON.stringify({name: "磯野カツオ", age: 11}),
        JSON.stringify({name: "磯野ワカメ", age: 9})
      ]
    }
  ];

  producer.send(payloads, (err, data) => {
    producer.close();
  });
});
producer.on('error', (err) => {
  console.error(err);
})
