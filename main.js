
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icons/apple-icon-72x72.png'),
  })

  let webContents = mainWindow.webContents;
    webContents.on('new-window', function(event, url){
      event.preventDefault();
      app.shell.openExternal(url);
  });

  mainWindow.loadURL('https://glorytoheaven.tk')
  mainWindow.once('ready-to-show', () => {
     mainWindow.show()
 })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
