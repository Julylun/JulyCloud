import ResourceConfig from '../../assets/resources/resource.config'

import { getFileToken, downloadFileWithToken } from "../../api/dowloadFileApi";

export {
    extensionToIconPath,
    changeDir,
    popUpDownloadFile,
    handlePopupItemClick
}

/**
 * IconSet contains all supported extension icons.
 * The extension icons can update in /src/assets/resources/resources.config.json and /public/assets/images/extensionIcon
 */
const IconSet = new Set(ResourceConfig.availableIcons);


/**
 * This function is used to find and return extension icon basing on extension text and IconSet.
 * If the extension is directory, the result will be a "Folder icon".
 * And if the extension type doesn't contain in the IconSet (ResourceConfig), the result will be a "File icon".
 * @example 
 *  let extensionImagePath = extensionToIconPath("DOC");
 *  console.log(extensionImagePath); //Result: /assets/images/extennsionIcon/DOC.png
 * @param {string} extension 
 * @returns string 
 */
const extensionToIconPath = (extension) => {
    const baseUrl = "/assets/images/extensionIcon/"
    if (extension == 'directory')
        return baseUrl + 'FOLDER.png';
    if (IconSet.has(extension.toLowerCase()))
        return baseUrl + extension.toUpperCase() + ".png";
    else return baseUrl + 'UNKNOWN.png';
}

/**
 * This function points user's location to another path belonging to user's choice
 * @param {string} filePath 
 */
const changeDir = (filePath) => {
    window.location.href = window.location.origin + '/mycloud/file?locate=' + filePath
    // window.history.pushState({},'',window.location.origin + '/mycloud/file?locate=' + filePath)
}


const popUpDownloadFile = async (fileLocation) => {
    const fileRegex = /[^/\\]+(?=\.[^/\\]+$)/;
    const folderRegex = /([^/\\]+)\/?$/;

    try {
        let token = await getFileToken(fileLocation);
        console.log(token)
        if (!token) throw new Error("NULL_TOKEN");

        let matchedName = fileLocation.match(fileRegex);
        let filename = (matchedName) ? matchedName[0] : fileLocation.match(folderRegex)[0]

        let downloadStatus = await downloadFileWithToken(token, filename);
        if (downloadStatus == 200) {
            console.log("Downloading file progress is working!")
            return true;
        }
        else {
            console.error("An error occurs when donwload file");
            return false;
        }
    } catch (error) {
        switch (error) {
            case 'NULL_TOKEN': {
                console.log("Token is null");
                return false;
            }
            default: {
                console.error("Unknown error: " + error);
                return false;
            }
        }
    }
}

const handlePopupItemClick = async (buttonName, nextLocation) => {
    console.log("Handle is still working bro, button name ->" + buttonName)
    switch (buttonName) {
        case 'Open': {
            changeDir(nextLocation);
            break;
        }
        case 'Download': {
            console.log("[handlePopupItemClick] - Start download item")
            return await popUpDownloadFile(nextLocation);
        }
    }
}