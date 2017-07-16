// @flow
import express from 'express';
import config from 'config';

const app = express();

app.get('/', (request: express$Request, response: express$Response) => {
    response.send('Hello World!');
});

export default app;
