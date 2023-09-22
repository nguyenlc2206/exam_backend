import express from 'express';
import compression from 'compression';
import AppDataSource from '@src/infrastructure/config/typeorm.config';
import { ENV } from '@src/main/config/env.config';
import ExpressConfig from '@src/main/config/express.config';

/** Define main function */
const main = async () => {
    await AppDataSource.initialize()
        .then(async () => {
            console.log('Connected to database');
            const app = express();
            app.use(compression());
            const Express = new ExpressConfig(app, Number(ENV.port) || 3000);
            await Express.init();
        })
        .catch((err: any) => {
            console.error('Error during Data Source initialization', err);
        });
};

// run main function
main();
