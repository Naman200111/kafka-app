// responsible for creating topics and parts
const { kafka } = require('./client');

async function init() {
    const admin = kafka.admin();
    console.log('Connecting to admin');
    await admin.connect();
    console.log('Admin connected successfully');

    // Create a topic
    console.log('Creating topics');
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates', // zomato rider updates
                numPartitions: 2, // north and south india riders
            },
        ],
    });
    console.log('Topics created successfully');

    console.log('Admin disconnecting');
    admin.disconnect();
    console.log('Admin disconnected');
}

init();