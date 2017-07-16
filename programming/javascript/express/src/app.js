// @flow
import express from 'express';

const app = express();

app.get('/', (request: express$Request, response: express$Response) => {
  response.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
