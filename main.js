const { app, globalShortcut, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");
const { defaultShortcuts, shortcutGenerator }= require(path.resolve("./js/shortcuts"));

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:", 
    slashes: true
  }));

  let paused;

  defaultShortcuts();
  shortcutGenerator("esc", () => { 
    if (!paused) {
      mainWindow.webContents.send("pause"); 
      paused = true;
    } else {
      mainWindow.webContents.send("start");
      paused = false;
    } 
  });

  mainWindow.on("closed", function () {
    mainWindow = null;    
    globalShortcut.unregisterAll()
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
