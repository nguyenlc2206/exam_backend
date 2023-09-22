/** Define response error type */
export type ResponseError = {
    statusCode: number
    status: String
    message: String
    stack: any
    isOperational: boolean
}
