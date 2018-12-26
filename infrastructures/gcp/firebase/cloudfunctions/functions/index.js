const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.helloPubSub = functions.pubsub.topic('sample-topic').onPublish((event) => {
  const pubSubMessage = event.data;
  const body = pubSubMessage.data ? Buffer.from(pubSubMessage.data, 'base64').toString() : null;
  const config = functions.config();
  console.log({
    config,
    event,
    body,
    sample: config.sample
  });

  return Promise.resolve(config);
});
