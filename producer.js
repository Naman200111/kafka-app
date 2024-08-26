const { kafka } = require('./client');
const readline = require('readline');

async function init() {
    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer connected successfully');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.setPrompt('Send Message: ');
    rl.prompt();

    rl.on('line', async (line) => {
        const [name, location] = line.split(' ');
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify({
                        name,
                        location,
                    })
                }
            ],
        });
    }).on('close', async () => {
        await producer.disconnect();
    });

    // await producer.send({
    //     topic: 'rider-updates',
    //     messages: [
    //         {
    //             partition: 1,
    //             key: 'location-update',
    //             value: JSON.stringify({
    //                 name: "Rider 1",
    //                 location: "South",
    //             })
    //         }
    //     ],
    // });

    // console.log('Message sent successfully');
    // await producer.disconnect();
}

init();