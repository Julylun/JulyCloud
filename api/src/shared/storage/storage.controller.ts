import { BadRequestException, Controller, Get, Injectable, Logger, Post, Req, Res } from '@nestjs/common';
import { StorageService } from './storage.service';
import { PathInfo, ResponseData } from 'src/common/class.global';
import { HttpError, StatusCode, StatusMessage } from 'src/common/enum.global';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
const achiver = require('archiver');

@Controller('api/storage')
export class StorageController {
    private startPath: string = null;
    private configuration: any = null;
    private logger: Logger = null;
    constructor(
        private readonly storageService: StorageService,
    ) {
        this.logger = new Logger(StorageController.name)


        this.logger.log("Reading configuration file.");
        this.configuration = storageService.loadStorageConfiguartion();

        this.startPath = this.configuration.controller.storage.rootStorage.toString();
        this.logger.log('Set default start path to {' + this.startPath  +'}');

       
    }


    getListAt(location: string) {
        try {
            let fileStructure = this.storageService.getListFilesAndFolders(location);
            if (!fileStructure) throw new Error(StatusCode.BAD_REQUEST + '');

            let responseData = new ResponseData<PathInfo[]>(fileStructure, StatusCode.OK, "OK");
            return responseData;
        } catch (error) {
            switch (error) {
                case StatusCode.BAD_REQUEST + '': {
                    return new ResponseData<any>(null, StatusCode.BAD_REQUEST, "BAD REQUEST");
                }
                default: return new ResponseData<any>(null, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error");
            }
        }

    }

    @Get()
    async getListFile(@Res() resp: Response) {
        this.logger.debug("getListFile", "Start")
        let responseData = this.getListAt(this.startPath);
        resp.statusCode = responseData.statusCode;
        resp.statusMessage = responseData.statusMessage;
        resp.send(responseData);
        return;
    }

    @Get('/file')
    async getListFileAt(@Req() req: Request, @Res() resp: Response) {
        let responseData = null;
        try {
            const locate: string = req.query.locate.toString();

            this.logger.debug("getListFileAt", 'Start at ')
            this.logger.debug(locate)
            if (locate == null) {
                this.logger.debug("variable debug", "locate value is null")
                throw new Error(StatusCode.BAD_GATEWAY + '');
            }
            responseData = this.getListAt(locate);
            resp.statusMessage = responseData.statusMessage;
            resp.statusCode = responseData.statusCode;

        } catch (error) {
            switch (error) {
                case StatusCode.BAD_GATEWAY + '': {
                    responseData = new ResponseData<any>(null, StatusCode.BAD_GATEWAY, "Bad gateway");
                    resp.statusMessage = responseData.statusMessage;
                    resp.statusCode = responseData.statusCode;
                }
                default: {
                    responseData = new ResponseData<any>(null, StatusCode.INTERNAL_SERVER_ERROR, "Internal server error");
                    resp.statusMessage = responseData.statusMessage;
                    resp.statusCode = responseData.statusCode;
                }
            }
        } finally {
            console.log(responseData)
            resp.send(responseData);
        }
    }

    @Get('/download')
    async downloadFileByToken(@Req() req: Request, @Res() resp: Response): Promise<void> {
        this.logger.debug("[downloadFileByToken]", "A user starts downloading");


        let token = req.query.token.toString();
        let responseData = null;


        //TODO: Check path is directory or file, if target is directory then compress it before send
        try {
            if (!token) {
                this.logger.error("Token is invalid");
                throw new Error(HttpError.BAD_REQUEST);
            }
            let filePath = this.storageService.getFilePathFromToken(token);
            if (!this.storageService.isFileExist(filePath)) {
                this.logger.error("File doens't exist");
                throw new Error(HttpError.NOT_FOUND);
            }

            this.logger.debug("[downloadFileByToken]", "File/folder path: " + filePath);

            if (this.storageService.isAFile(filePath)) {
                this.logger.debug("file mime type", this.storageService.getFileMimeType(filePath))
                resp.set({
                    'Content-Type': this.storageService.getFileMimeType(filePath),
                    'Content-Disposition': 'attachment; filename=\"' + this.storageService.getFileNameFromPath(filePath) + '\"'
                })

                const fileStream = createReadStream(filePath);
                fileStream.pipe(resp);
                return;
            } else {
                const folderName = this.storageService.getFolderNameFromPath(filePath);
                resp.set({
                    'Content-Type': 'application/zip',
                    'Content-Disposition': 'attachment; filename=\"' + folderName + '.zip\"'
                })

                const archive = achiver('zip', {
                    zlib: { level: 9 },
                });

                archive.pipe(resp);

                archive.directory(filePath, false);

                archive.finalize();

                archive.on('close', () => {
                    this.logger.debug("[downloadFileByToken]", "User downloaded this folder");
                })

                archive.on('error', (err) => {
                    this.logger.error(err);
                })
                return;
            }
        } catch (error) {
            this.logger.error(error);
            switch (error) {
                case HttpError.BAD_REQUEST: {
                    responseData = new ResponseData(null, StatusCode.BAD_REQUEST, StatusMessage.BAD_REQUEST);
                    break;
                }
                case HttpError.NOT_FOUND: {
                    responseData = new ResponseData(null, StatusCode.NOT_FOUND, StatusMessage.NOT_FOUND);
                    break;
                }
                default: {
                    responseData = new ResponseData(null, StatusCode.INTERNAL_SERVER_ERROR, StatusMessage.INTERNAL_SERVER_ERROR);
                    break;
                }
            }

        } finally {
            if (responseData) {
                resp.statusCode = responseData.statusCode;
                resp.statusMessage = responseData.statusMessage;
                resp.send(responseData);
                return;
            }
        }
    }

    // localhost:port/api/storage/get-token?locate=
    @Get('/get-token')
    getDowloadLink(@Req() req: Request, @Res() resp: Response) {
        this.logger.debug("[getDownloadLink]", "Start a request.")
        let responseData = null;
        let filePath = req.query.locate.toString();
        try {

            //TODO: write checking authentication
            //TODO: create database to save and compare token

            if (!this.storageService.isFileExist(filePath)) throw new Error(HttpError.NOT_FOUND);

            let temporaryToken = this.storageService.generateTemporaryDownloadToken(filePath);
            responseData = new ResponseData<string>(temporaryToken, StatusCode.OK, StatusMessage.OK);
            this.logger.debug("<getDownloadLink>", "Responsing...");
            this.logger.debug("download token -> ", responseData.data);
        } catch (error) {
            this.logger.error(error);
            switch (error) {
                case HttpError.NOT_FOUND: {
                    responseData = new ResponseData<any>(null, StatusCode.NOT_FOUND, StatusMessage.NOT_FOUND);
                    break;
                }
                default: {
                    responseData = new ResponseData<any>(null, StatusCode.INTERNAL_SERVER_ERROR, StatusMessage.INTERNAL_SERVER_ERROR)
                    break;
                }
            }
        } finally {
            resp.statusCode = responseData.statusCode;
            resp.statusMessage = responseData.statusMessage;
            resp.send(responseData);
            return;
        }
    }


}
