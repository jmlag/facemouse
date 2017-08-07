const { app, globalShortcut, BrowserWindow, ipcMain } = require("electron");
const appPath = app.getAppPath();
const path = require("path");
const url = require("url");
const { defaultShortcuts, shortcutGenerator } = require(path.resolve(appPath, "./app/js/shortcuts"));

let mainWindow;

function createWindow (){
  mainWindow = new BrowserWindow({width: 800, height: 600});
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "app/index.html"),
    protocol: "file:", 
    slashes: true
  }));

  // mainWindow.webContents.openDevTools();
  
  let paused;

  defaultShortcuts();
  shortcutGenerator("shift+esc", () => { 
    if (!paused){
      mainWindow.webContents.send("pause"); 
      paused = true;
    } else {
      mainWindow.webContents.send("start");
      paused = false;
    } 
  });

  mainWindow.on("closed", function (){
    mainWindow = null;    
    globalShortcut.unregisterAll()
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function (){
  if (process.platform !== "darwin"){
    app.quit();
  }
});

app.on("activate", function (){
  if (mainWindow === null){
    createWindow();
  }
});
