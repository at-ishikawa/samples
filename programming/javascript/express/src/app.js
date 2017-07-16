// @flow
import express from 'express';
import config from 'config';
import log4js from 'log4js';

const app = express();
log4js.configure(config.get('log'));
const logger = log4js.getLogger();

logger.debug('Log4js hello world');

app.use(log4js.connectLogger(logger, {
    level: 'info'
}));

app.get('/', (request: express$Request, response: express$Response) => {
    response.send('Hello World!');
});
app.get('/error', (request, response) => {
    throw new Error('error');
});

// After routing
app.use((error, request, response, next) => {
    logger.error(error);
    response.status(500);
    response.send("ERROR");
});

export default app;
