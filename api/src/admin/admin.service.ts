import { Injectable, Logger } from '@nestjs/common';
import e from 'express';
import * as fs from 'fs'
const CONFIG_PATH = './src/config/default.config.json'

@Injectable()
export class AdminService {
    private logger: Logger = new Logger(AdminService.name);
    readConfigurationFile(): any {
        try {
            let textConfig = fs.readFileSync(CONFIG_PATH).toString();
            this.logger.debug(textConfig);
            let parsedJson = JSON.parse(textConfig);
            return parsedJson;
        } catch (error) {
            return null;
        }
    }

    saveConfigurationFile(fileText: string): boolean{
        try {
            fs.writeFileSync(CONFIG_PATH,fileText);
            return true;
        } catch(error) {
            this.logger.error(error);
            return false;
        }
    }
}
