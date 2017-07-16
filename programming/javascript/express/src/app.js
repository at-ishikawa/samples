// @flow
import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import expressValidator from 'express-validator';
import log4js from 'log4js';
import util from 'util';

const app = express();
log4js.configure(config.get('log'));
const logger = log4js.getLogger();

logger.debug('Log4js hello world');

app.use(bodyParser.json());
app.use(expressValidator());
app.use(log4js.connectLogger(logger, {
    level: 'info'
}));

app.get('/', (request: express$Request, response: express$Response) => {
    response.send('Hello World!');
});
app.post('/post', (request, response) => {
    request.checkBody({
        'name': {
            notEmpty: true,
            isLength: {
                options: [{
                    min: 3
                }]
            }
        }
    });
    request.getValidationResult()
        .then((result) => {
            if (!result.isEmpty()) {
                response.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
                return;
            }
            response.send(request.body.name);
        });
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