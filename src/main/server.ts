import express from 'express';
import compression from 'compression';

import { ExpressConfig } from './config/express.config';
import { ENV } from './config/env.config';
import { AppDataSource } from '../infrastructure/config/typeorm.config';

/** Define main function */
const main = async () => {
    await AppDataSource.connect()
        .then(async () => {
            console.log('Connected to database');
            const app = express();
            app.use(compression());
            const Express = new ExpressConfig(app, Number(ENV.port) || 3000);
            await Express.init();
        })
        .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
};

// run main function
main();
