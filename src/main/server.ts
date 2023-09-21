import express from "express";

import { ExpressConfig } from "./config/express.config";
import { ENV } from "./config/env.config";
import { AppDataSource } from "@src/infrastructure/config/typeorm.config";

/** Define main function */
const main = async () => {
    await AppDataSource.initialize()
        .then(async () => {
            console.log("Connected to database");
            const app = express();
            const Express = new ExpressConfig(app, Number(ENV.port) || 3000);
            await Express.init();
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
};

// run main function
main();
