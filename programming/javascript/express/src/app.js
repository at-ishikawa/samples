// @flow
import "babel-polyfill";

import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import expressValidator from 'express-validator';
import i18n from 'i18n';
import log4js from 'log4js';
import util from 'util';

import { User } from './entities/user';
import { Container } from 'inversify';

const container = new Container();
container.bind(User).toSelf();

export default connection => {
    const app = express();
    log4js.configure(config.get('log'));
    const logger = log4js.getLogger();

    logger.debug('Log4js hello world');

    i18n.configure({
        "locales": ["en"],
        "defaultLocale": "en",
        "directory": __dirname + "/messages"
    });

    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(log4js.connectLogger(logger, {
        level: 'info'
    }));
    app.use(i18n.init);

    app.get('/', (request: express$Request, response: express$Response) => {
        response.send(request.__('Hello'));
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

    app.post('/users', (request, response) => {
        let user = container.get(User);
        user.email = 'example@example.com';
        user.password = 'password';
        let userRepository = connection.getRepository(User);
        userRepository.persist(user);
        response.send(user);
    });
    app.get('/error', (request, _) => {
        throw new Error('error');
    });

// After routing
    app.use((error, request, response, _) => {
        logger.error(error);
        response.status(500);
        response.send("ERROR");
    });

    return app;
};
