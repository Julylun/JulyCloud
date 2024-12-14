import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";
import { ResponseData } from "../class.global";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const status = exception.getStatus();

        const errorResponse = exception.getResponse();
        const errorMessage = typeof errorResponse === 'string' ? errorResponse : errorResponse['message'];
        
        console.error("catched an error")
        let responseData = new ResponseData<any>(null, status, errorResponse['message']);
        response.statusCode = responseData.statusCode;
        response.statusMessage = responseData.statusMessage;
        response.send(responseData);
    }
}