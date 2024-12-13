export class ResponseData<T>{
    public data: T;
    public statusCode: number;
    public statusMessage: string;
    constructor(data: T, statusCode: number, statusMessage: string) {
        this.data = data;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}

export class PathInfo {
    public name: string;
    public path: string;
    public extension: string;
    public size: number;
    public isFile: boolean;
    constructor(name: string, path: string, extension: string, size: number, isFile: boolean){
        this.name = name;
        this.path = path;
        this.extension = extension;
        this.size = size;
        this.isFile = isFile
    }
}