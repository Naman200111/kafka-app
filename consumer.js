const { kafka } = require('./client');
const groupId  = process.argv[2]; // second (0,1,2) argument passed to the command

async function init() {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    console.log('Consumer connected successfully');

    await consumer.subscribe({
        topic: 'rider-updates',
    });

    await consumer.connect();

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(
                `${groupId} [${topic}]: Part:${partition}: ${message.value}]`
            );
        },
    })

    console.log('Consumer connected successfully');
}

init();