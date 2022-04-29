const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
module.exports = class FileService {
    async handler(tag, ...args) {
        return this[tag](...args);
    }
    readFile(path) {
        return fs.readFileSync(path);
    }
    writeFile(path, content) {
        return fs.writeFileSync(path, content);
    }
    async selectFile(multi) {
        let options = ['openFile'];
        if (multi) {
            options.push('multiSelections')
        }
        dialog.showOpenDialog({ properties: options }).then(result => {
            return result.filePaths;
        }, err => {
            throw err;
        })
    }

    async selectFolder(multi) {
        let options = ['openDirectory'];
        if (multi) { options.push('multiSelections') }
        const { canceled, filePaths } = await dialog.showOpenDialog({ properties: options })
        if (canceled) {
            return
        } else {
            if (multi) { return filePaths }
            else {
                return filePaths[0];
            }
        }
    }
}