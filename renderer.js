// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// import FileService from './frontend/file-service';
// import $ from "jquery";
import FileService from './frontend/file-service.js';
const _fileService = new FileService;

console.log($("#btn"));
$(document).ready(() => {
  $("#btn").on('click', function () {
    const title = $('#title').val();
    window.electronAPI.setTitle(title)
  });
  $("#select").on('click', async () => {
    const filePath = await _fileService.selectFile(false);
    console.log(filePath)
    console.log(await _fileService.readText(filePath))
    console.log(await _fileService.readBytes(filePath))
    let paths = filePath.split('\\');
    paths.pop();
    paths.push('test.html')
    let path = paths.join('/');
    await _fileService.writeBytes(path, await _fileService.readBytes(filePath));
  });
  $("#folder").on('click', async () => {
    const filePath = await _fileService.selectFolder(true);
    console.log(filePath)
  })
});

window.onkeydown = (e) => {
  var keyCode = e.keyCode || e.which;
  switch (keyCode) {
    case 116: {
      // f5
      window.electronAPI.reload()
      break;
    }
    case 123: {
      // f12
      window.electronAPI.devTool()
      break;
    }
    default: {
      console.log(keyCode)
      break;
    }
  }
};