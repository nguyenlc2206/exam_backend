import { Request } from 'express';

/** Define type http request */
export type HttpRequest<B = any, H = any, A = any> = {
    body?: B;
    headers?: H;
    account?: A;
};

/** Define type http reponse */
export type HttpResponse<B = any> = {
    body: B;
    statusCode: number;
};

/** Define userInfor */
export type UserInformation = {
    email?: string | undefined;
    role?: string | undefined;
    groupId?: string | undefined;
    userId?: string | undefined;
    password?: string | undefined;
};

/** Deifne interface http request custom */
export interface HttpRequestUser extends Request {
    userInfor?: any;
}
