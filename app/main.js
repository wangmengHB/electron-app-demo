const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');

let win;


function createWindow () {
  win = new BrowserWindow({
    width: 1000, 
    height: 800,
  });
  // win.loadURL('http://127.0.0.1:8080');
  win.loadFile(path.resolve(__dirname, 'index.html'));
  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });

  win.on('blur', () => {
    app.dock.setBadge("1");
    setTimeout(() => {
      app.dock.bounce('informational');
    }, 2000)
  })

  setTimeout(() => {
    app.dock.bounce('informational');
  }, 2000)

  
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
ipcMain.on('open-file', (event) => {  
  dialog.showOpenDialog(
    win,
    {
      title: 'Select File',
      properties: ['openFile'],
      filters: [
        {
          name: 'Files', 
          extensions: [
            'txt', 
            'css', 
            'html', 
            'js', 
            'vue', 
            'json', 
            'py', 
            'c'
          ]
        }
      ]
    },
    function (fileNames) {

        // check if invalid filename
        if (fileNames === undefined) {
            return;
        };

        // Read file contents otherwise
        let fileName = fileNames[0];

      
        event.returnValue = fileName;
        
    }
  )


  

});


