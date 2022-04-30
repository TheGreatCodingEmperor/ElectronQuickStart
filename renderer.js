// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// import FileService from './frontend/file-service';
// import $ from "jquery";
import FirstPage from './frontend/pages/first-page.js';
import Router from './frontend/components/router.js';
import FileService from './frontend/services/file-service.js';
const _fileService = new FileService;

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
  });

  const el = $('#content-body');
  // el.html((new FirstPage).main());

  const router = new Router;

  router.error404(()=>{
    el.html('<h3>Page Not Found!</h3>')
  });

  router.add('test',()=>{
    el.html(`<div>main</div>`);
  });

  router.add('first',()=>{
    el.html((new FirstPage).main());
  });


  $('a').on('click', (event) => {
    event.preventDefault();
    // Block browser page load

    // Highlight Active Menu on Click
    const target = $(event.target);
    $('.router').removeClass('active');
    target.addClass('active');

    // Navigate to clicked url
    const href = target.attr('href');
    const path = href.slice(1);
    router.navigateTo(path);
  });
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