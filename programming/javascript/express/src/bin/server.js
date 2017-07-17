#! /usr/bin/env node

import "babel-polyfill";

import app from "../app";
import { createConnection } from 'typeorm';

createConnection().then(async connection => {
    app(connection).listen(3000);
}).catch(e => console.error(e));
