// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => {ipcRenderer.send('set-title', title)},
  selectFile: async(multi) => {return ipcRenderer.send('select-file',multi)},
  selectFolder: (multi) => {ipcRenderer.send('select-folder'),multi},
  reload:()=>{ipcRenderer.send('reload')},
  openFile: (multi) => ipcRenderer.invoke('dialog:openFile',multi),
  invoke: ipcRenderer.invoke
})
