import { Logger } from '@nestjs/common';
import * as NodeDiskInfo from 'node-disk-info'
import drive from 'node-disk-info/dist/classes/drive';




function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}


/**
 * get disk info according current platform.
 *
 * @author Julylun
 * @return {promise<drive[]>} promise resolves array of disks and their info.
 */
export function getdiskinfo(): Promise<drive[]> {
    return new Promise(resolve => {
        let os = require('os');
        if (os.platform() === "win32") {
            let spawn = require("child_process").spawn, child;

            child = spawn("powershell.exe", [" get-psdrive  -psprovider filesystem | select-object name,used,free | ConvertTo-Json"]);

            child.stdout.on("data", function (data) {

                let res = JSON.parse(data);
                res.forEach(obj => renameKey(obj, 'Name', 'mounted'));
                res.forEach(obj => renameKey(obj, 'Used', 'used'));
                res.forEach(obj => renameKey(obj, 'Free', 'available'));

                for (let i = 0; i < res.length; ++i)
                    res[i].mounted = res[i].mounted + ":";

                resolve(res);
            });

        }
        else // other systems
        {
            const nodeDiskInfo = require('node-disk-info');
            nodeDiskInfo.getDiskInfo().then(disks => {
                resolve(disks);
            });
        }
    });
}


export function _getDiskDetails(): Promise<drive[]> {
    let logger = new Logger(_getDiskDetails.name)
    return new Promise((resolve, reject) => {
        let os = require('os');
        if (os.platform() === "win32") {
            let spawn = require("child_process").spawn, child
            // Windows-specific code
            child = spawn("powershell.exe", [
                `Get-WmiObject -Class Win32_DiskDrive | ForEach-Object {
                    $drive = $_;
                    $partitions = Get-WmiObject -Query "ASSOCIATORS OF {Win32_DiskDrive.DeviceID='$($drive.DeviceID)'} WHERE AssocClass=Win32_DiskDriveToDiskPartition" | ForEach-Object {
                        $partition = $_;
                        $logicalDisks = Get-WmiObject -Query "ASSOCIATORS OF {Win32_DiskPartition.DeviceID='$($partition.DeviceID)'} WHERE AssocClass=Win32_LogicalDiskToPartition";
                        $logicalDisks | Select-Object DeviceID, VolumeName, FileSystem, Size, FreeSpace;
                    }
                    [PSCustomObject]@{
                        Model = $drive.Model;
                        InterfaceType = $drive.InterfaceType;
                        Size = $drive.Size;
                        Partitions = $partitions;
                    }
                } | ConvertTo-Json`
            ]);

            let output = '';
            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                console.error(`PowerShell error: ${data.toString()}`);
                reject(new Error(`PowerShell error: ${data.toString()}`));
            });

            child.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`PowerShell process exited with code ${code}`));
                } else {
                    try {
                        let res = JSON.parse(output);

                        logger.debug("Debug res", res)

                        // res.forEach(obj => renameKey(obj, 'DeviceID', 'mounted'));
                        // res.forEach(obj => renameKey(obj, 'Size', 'total'));
                        // res.forEach(obj =>  renameKey(obj, 'FreeSpace', 'available'));
                        // res.forEach(obj => renameKey(obj, 'FileSystem', 'fileSystem'));
                        
                        resolve(res);
                    } catch (error) {
                        reject(new Error(`Error parsing JSON: ${error.message}`));
                    }
                }
            });
        } else {
            // Code for other systems
            const nodeDiskInfo = require('node-disk-info');
            nodeDiskInfo.getDiskInfo().then((disks) => {
                resolve(disks);
            }).catch((error) => {
                console.error(`Error fetching disk info: ${error.message}`);
                reject(error);
            });
        }
    });
}

