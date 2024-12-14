import { Body, Controller, HttpException, HttpStatus, Logger, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { StatusCode, StatusMessage } from 'src/common/enum.global';
import { ResponseData } from 'src/common/class.global';
import { error } from 'console';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('/api/admin')
export class AdminController {
    private logger: Logger = null;
    constructor(
        private readonly adminService: AdminService
    ) {
        this.logger = new Logger(AdminController.name);
    }


    //FIXME: [Doing] resolve problem "Can't get data from form data".
    //TODO: finish changeStorageRoot function
    @Post()
    @UseInterceptors(NoFilesInterceptor)
    changeStorageRoot(@Body() body: any,@Req() request: Request, @Res() response: Response) {
        let responseData: ResponseData<any> = null;
        let newRoot = null;
        console.log(request.body)
        console.log(body)
        try {
            this.logger.log("Received a request from ip adress " + request.ip)

            this.logger.log("Reading configuration file")
            let configurationJsonObject = this.adminService.readConfigurationFile();
            if (!configurationJsonObject) throw new HttpException("[Server Error]: The configuration file is not found", HttpStatus.INTERNAL_SERVER_ERROR);

            newRoot = body.rootPath.toString();

            configurationJsonObject.controller.storage.rootStorage;

            let isSaved = this.adminService.saveConfigurationFile(JSON.stringify(configurationJsonObject));
            if (!isSaved) throw new HttpException("An error occurs when saving configuration file", HttpStatus.INTERNAL_SERVER_ERROR);

            responseData = new ResponseData<any>(null, StatusCode.OK, StatusMessage.OK);
        } catch (error) {
            this.logger.error(error);
            if (error instanceof HttpException) {
                responseData = new ResponseData<any>(null, error.getStatus(), error.getResponse().toString())
            } else {
                switch (error) {
                    default: {
                        responseData = new ResponseData<any>(null, StatusCode.INTERNAL_SERVER_ERROR, StatusMessage.INTERNAL_SERVER_ERROR);
                        break;
                    }
                }
            }
        } finally {
            response.statusCode = responseData.statusCode;
            response.statusMessage = responseData.statusMessage;
            response.send(responseData);
            return;
        }
    }
}
