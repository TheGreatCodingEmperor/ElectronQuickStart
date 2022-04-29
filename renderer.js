// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const setButton = document.getElementById('btn')
const selectButton = document.getElementById('select')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});
selectButton.addEventListener('click', async() => {
    // let files = await window.electronAPI.selectFile(true);
    const filePath = await window.electronAPI.openFile(true)
    console.log(filePath)
});
document.getElementById('folder').addEventListener('click', async() => {
    // let files = await window.electronAPI.selectFile(true);
    const filePath = await window.electronAPI.invoke("file","selectFolder",true);
    console.log(filePath)
});
window.onkeydown = (e) => {
    var keyCode = e.keyCode || e.which;
    switch(keyCode){
      case 116:{
        // f5
        window.electronAPI.reload()
        break;
      }
      default:{
          console.log(keyCode)
        break;
      }
    }
  };