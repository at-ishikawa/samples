exports.helloWorld = (event, callback) => {
  const pubsubMessage = event.data;
  const data = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : 'No data';
  console.log(`${data}`);
  callback();
};

