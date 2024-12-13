import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as DiskReader from '../../common/node_declare/diskreader/diskreader'
import { PathInfo } from 'src/common/class.global';
import path from 'path';
import * as Jwt from 'jsonwebtoken'
import { match, throws } from 'assert';
import { HttpError } from 'src/common/enum.global';
import * as Mime from 'mime-types'

const SECRET_KEY = "naulnauxgnaohhnanalcognoad"
@Injectable()
export class StorageService {
    private logger = new Logger(StorageService.name)

    getFileMimeType = (filePath: string): string => {
        const mimeType = Mime.lookup(filePath) || 'application/octet-stream';
        return mimeType;
    }
    getFileNameFromPath = (filePath: string): string => {
        let matchedName = filePath.match(/[^\\/]+$/);
        return matchedName[0];
    }
    getFolderNameFromPath = (folderPath: string): string => {
        let matchedName = folderPath.match(/([^/\\]+)\/?$/);
        return matchedName[0];
    }
    getFilePathFromToken = (token: string) => {
        try {
            const decodedObject = Jwt.verify(token, SECRET_KEY);

            return decodedObject.filePath;
        } catch (error) {
            this.logger.debug("Token is expired or not valid")
            throw new Error(HttpError.NOT_FOUND)
        }
    }

    generateTemporaryDownloadToken = (filePath: string) => {
        try {
            const expiredTime = 5 * 60; //5 minutes

            const downloadToken = Jwt.sign(
                { filePath, exp: Math.floor(Date.now() / 1000 + expiredTime) },
                SECRET_KEY
            );

            return downloadToken;
        } catch (error) {
            throw new Error(HttpError.INTERNAL_SERVER_ERROR);
        }
    }

    isFileExist(filePath: fs.PathLike | string): boolean {
        return fs.existsSync(filePath);
    }

    isAFile(filePath: fs.PathLike | string): boolean {
        try {
            const stats = fs.statSync(filePath);
            return !stats.isDirectory()
        } catch (error) {
            this.logger.error("<isAFile>: An error occurs when checking is this a file.")
            throw new Error(HttpError.INTERNAL_SERVER_ERROR);
        }
    }


    getListDisks() {
        try {
            const diskInfo = DiskReader._getDiskDetails()
            return diskInfo;
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    /**
     * Return file size basing on path string
     * @param filePath 
     * @returns number
     */
    getFileSize(filePath: fs.PathLike): number {
        try {
            let stats = fs.statSync(filePath);
            if (stats) return stats.size;
        } catch (error) {
            this.logger.error(error);
            return -1;
        }
    }


    /**
     * List all directories and files from folderPath and return their file path (from folderPath) 
     * @param folderPath 
     * @returns string[]
     */
    getListFilesAndFolders(folderPath: fs.PathLike | string) {
        try {

            const entries = fs.readdirSync(folderPath);
            return entries.map(entry => {
                let isFile = false;
                let matchedExtension = entry.match(/\.([a-zA-Z0-9]+)$/)

                if (matchedExtension) isFile = true

                this.logger.debug("Array Of Matched Extension", matchedExtension)
                return new PathInfo(
                    path.basename(entry, path.extname(entry)),
                    folderPath + '/' + entry,
                    (matchedExtension) ? matchedExtension[1] : 'directory',
                    (isFile) ? this.getFileSize(folderPath + '/' + entry) : -1,
                    isFile
                )

            }

            )
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}
