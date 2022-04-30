const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
module.exports = class FileService {
    async handler(tag, ...args) {
        return this[tag](...args);
    }
    async readText(path) {
        return fs.readFileSync(path, {encoding:'utf8', flag:'r'});
    }
    async readBytes(path) {
        return fs.readFileSync(path);
    }
    async writeText(path, content) {
        return fs.writeFileSync(path, content,{
            encoding: "utf8",
            flag: "a+",
            mode: 0o666
          });
    }
    async writeBytes(path, content) {
        return fs.writeFileSync(path, content);
    }
    async selectFile(multi) {
        let options = ['openFile'];
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