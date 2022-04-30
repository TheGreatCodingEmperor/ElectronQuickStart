export default class FileService{
    async selectFolder(multi){
        return window.electronAPI.invoke("file","selectFolder",multi);
    }
    async selectFile(multi){
        return window.electronAPI.invoke("file","selectFile",multi);
    }
    async readText(path){
        return window.electronAPI.invoke("file","readText",path);
    }
    async readBytes(path){
        return window.electronAPI.invoke("file","readBytes",path);
    }
    async writeText(path,content){
        return window.electronAPI.invoke("file","writeText",path,content);
    }
    async writeBytes(path,content){
        return window.electronAPI.invoke("file","writeBytes",path,content);
    }
}