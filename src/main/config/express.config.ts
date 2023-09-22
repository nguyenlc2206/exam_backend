import express, { NextFunction, Request, Express } from "express";

import { expressCors } from "./express.cors";
import { rateLimit } from "express-rate-limit";
import { setupRoutes } from "./express.routes";
import AppError from "src/error-handling/app.error";
import { globalErrorConfig } from "src/error-handling/global.error";

export class ExpressConfig {
    private app: Express;
    private port: number;

    constructor(express: Express, port: number) {
        this.app = express;
        this.port = port;
    }

    public async init(): Promise<void> {
        try {
            /** json pareser */
            this.app.use(express.json());

            /** cors config */
            expressCors(this.app);

            /** limiter request config */
            // Limit requests from same API
            const limiter = rateLimit({
                max: 100,
                windowMs: 60 * 60 * 1000,
                message:
                    "Too many requests from this IP, please try again in an hour!",
            });
            this.app.use("/api", limiter);

            /** routes config */
            setupRoutes(this.app);

            /** check url not support in this server */
            this.app.all("*", (req: Request, _, next: NextFunction) => {
                next(
                    new AppError(
                        `Unsupport path ${req.originalUrl} on this server!`,
                        404
                    )
                );
            });

            /** global config respose error */
            this.app.use(globalErrorConfig);

            /** listen port */
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        } catch (error) {
            console.error(error);
        }
    }
}
