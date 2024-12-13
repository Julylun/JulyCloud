import { ApiConfiguration } from "../config/api.config"
export {
    getFileToken,
    downloadFileWithToken
}

const BaseGetTokenApi = ApiConfiguration.baseUrl + ':' + ApiConfiguration.port + '/api/storage/get-token?locate=';
const BaseDownloadFileApi = ApiConfiguration.baseUrl + ':' + ApiConfiguration.port + '/api/storage/download?token=';


const getFileToken = async (fileLocation) => {
    return await fetch(BaseGetTokenApi + fileLocation, {
        method: 'GET'
    }).then((response) => {
        if(!response.ok) throw new Error(response.Error);
        return response.json();
    }).then((data) => {
        if(!data.data) throw new Error("Data is null. Unknown exception");
        return data.data;
    }).catch((error) => {
        console.error(error);
        return null;
    })
}

const downloadFileWithToken = async (token, filename) => {
    return await fetch(BaseDownloadFileApi + token, {
        method: 'GET'
    }).then((response) => {
        if(!response.ok) return response.error;
        return response.blob();
    }).then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;

        a.click();

        window.URL.revokeObjectURL(blobUrl);
        return 200;
    }).catch(error => {
        return -1;
    })
}