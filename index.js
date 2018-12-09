const {app, BrowserWindow, ipcMain} = require('electron');

let win;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

function createWindow () {
  win = new BrowserWindow({
    width: 1000, 
    height: 800,
  });
  win.loadURL('http://127.0.0.1:8080');
  // win.loadFile('index.html');
  // win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})







// 监听渲染进程发送的消息
ipcMain.on('asynchronous-message', (event, file) => {
  // const FileAPI = require('file-api');
  // const File = FileAPI.File
  // , FileList = FileAPI.FileList
  // , FileReader = FileAPI.FileReader;
  // // const FileReader = require('filereader');
  // const reader = new FileReader();

  // reader.addEventListener('loadend', function (evt) {
  //   event.sender.send('asynchronous-reply', evt.target.result );
  // });
  // reader.readAsText(new File(file))

    console.log(file)
    event.sender.send('asynchronous-reply', 'main process msg' );



  // console.log(arg);

  // //命令行调用curl，下载天气信息
  // var exec = require('child_process').exec;
  // var cmdStr = 'curl http://www.weather.com.cn/data/sk/101020100.html';
  // exec(cmdStr, function (err, stdout, stderr) {
  //   if (err) {
  //     console.log('get weather api error:' + stderr);
  //   } else {
  //     // var data = JSON.parse(stdout);
  //     // console.log(data);
  //     // 发送消息到渲染进程
  //     event.sender.send('asynchronous-reply', "主进程收到消息" + arg );
  //   }
  // });

});


