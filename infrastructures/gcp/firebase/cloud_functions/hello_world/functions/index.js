const functions = require('firebase-functions');

exports.helloWorld = functions.pubsub.topic('topic-name').onPublish((event) => {
  const pubsubMessage = event.data;
  const data = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : 'No data';
  console.log(`${data}`);
  return data;
});
