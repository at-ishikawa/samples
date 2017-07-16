// @flow
import express from 'express';

const app = express();

app.get('/', (request: express$Request, response: express$Response) => {
  response.send('Hello World!');
});

export default app;
