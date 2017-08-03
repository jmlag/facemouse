const { app, globalShortcut, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');
const robot = require('robotjs');
const screenSize = robot.getScreenSize();

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:', 
    slashes: true
  }));

  globalShortcut.register('CommandOrControl+Space', () => {
    console.log('CommandOrControl+Space is pressed')
    robot.moveMouse(screenSize.width/2, screenSize.height/2);
  })

  globalShortcut.register('CommandOrControl+1', () => {
    console.log('CommandOrControl+1 is pressed')
    robot.moveMouse(screenSize.width/4, screenSize.height/4);
  })

  globalShortcut.register('CommandOrControl+2', () => {
    console.log('CommandOrControl+2 is pressed')
    robot.moveMouse(screenSize.width/4, screenSize.height*3/4);
  })

  globalShortcut.register('CommandOrControl+3', () => {
    console.log('CommandOrControl+3 is pressed')
    robot.moveMouse(screenSize.width*3/4, screenSize.height*3/4);
  })

  globalShortcut.register('CommandOrControl+4', () => {
    console.log('CommandOrControl+4 is pressed')
    robot.moveMouse(screenSize.width*3/4, screenSize.height/4);
  })

  // Open the DevTools. (commented out by default)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;    
    globalShortcut.unregisterAll()
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
