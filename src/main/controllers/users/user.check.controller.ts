import * as _ from 'lodash';
import { UsersServices } from '@src/application/services/users/users.services';
import UsersEntity from '@src/domain/entities/user.entity';
import { ENV } from '@src/main/config/env.config';
import catchAsync from '@src/shared/catch-async';
import { HttpRequest } from '@src/shared/entities/http.entity';
import { TokenGeneratorAdapter } from '@src/shared/jwt/jwtAdapter';
import { NextFunction, Request, Response } from 'express';

/** define user check controller */
export class CheckUserController {
    constructor(private _userServices: UsersServices<UsersEntity>) {}

    /** execute function */
    execute = catchAsync(async (req: HttpRequest, res: Response, next: NextFunction) => {
        const accessToken = req.headers?.authorization.split(' ')[1];

        const { jwtSecret, expiresIn } = ENV;
        const tokenGeneratorAdapter = new TokenGeneratorAdapter(jwtSecret, expiresIn);
        const decode = await tokenGeneratorAdapter.decrypt(accessToken);

        const { key: _key, iat: _iat } = decode;
        const keyParse = JSON.parse(JSON.stringify(_key));

        const userFinded = await this._userServices.getUserByEmail(keyParse?.email, true);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Check account user is success',
            data: {
                user: _.omit(userFinded, ['password', 'passwordChangedAt'])
            }
        });
    });
}
