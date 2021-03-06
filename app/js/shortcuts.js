const { globalShortcut } = require("electron");
const robot = require("robotjs");
const screenSize = robot.getScreenSize();

function shortcutGenerator(keySequence, callback){
  globalShortcut.register(keySequence, () => {
    console.log(keySequence + " is pressed");
    callback();
  });
}

function bulkShortcutGenerator(shortcuts){
  shortcuts.forEach(shortcut => shortcutGenerator(...shortcut));
}

const defaults4 = [
    ["CommandOrControl+1", () => robot.moveMouse(screenSize.width/4, screenSize.height/4)],
    ["CommandOrControl+2", () => robot.moveMouse(screenSize.width/4, screenSize.height*3/4)],
    ["CommandOrControl+3", () => robot.moveMouse(screenSize.width*3/4, screenSize.height*3/4)],
    ["CommandOrControl+4", () => robot.moveMouse(screenSize.width*3/4, screenSize.height/4)] 
];

const defaults6 = [
  ["CommandOrControl+1", () => robot.moveMouse(screenSize.width/6, screenSize.height/4)],
  ["CommandOrControl+2", () => robot.moveMouse(screenSize.width*3/6, screenSize.height/4)],
  ["CommandOrControl+3", () => robot.moveMouse(screenSize.width*5/6, screenSize.height/4)],
  ["CommandOrControl+4", () => robot.moveMouse(screenSize.width/6, screenSize.height*3/4)],
  ["CommandOrControl+5", () => robot.moveMouse(screenSize.width*3/6, screenSize.height*3/4)],      
  ["CommandOrControl+6", () => robot.moveMouse(screenSize.width*5/6, screenSize.height*3/4)],
];

const defaults9 = [
  ["CommandOrControl+1", () => robot.moveMouse(screenSize.width/6, screenSize.height/6)],
  ["CommandOrControl+2", () => robot.moveMouse(screenSize.width*3/6, screenSize.height/6)],
  ["CommandOrControl+3", () => robot.moveMouse(screenSize.width*5/6, screenSize.height/6)],
  ["CommandOrControl+4", () => robot.moveMouse(screenSize.width/6, screenSize.height*3/6)],
  ["CommandOrControl+5", () => robot.moveMouse(screenSize.width*3/6, screenSize.height*3/6)],      
  ["CommandOrControl+6", () => robot.moveMouse(screenSize.width*5/6, screenSize.height*3/6)],  
  ["CommandOrControl+7", () => robot.moveMouse(screenSize.width/6, screenSize.height*5/6)],
  ["CommandOrControl+8", () => robot.moveMouse(screenSize.width*3/6, screenSize.height*5/6)],      
  ["CommandOrControl+9", () => robot.moveMouse(screenSize.width*5/6, screenSize.height*5/6)],
];

function defaultShortcuts(defaults = defaults4){
  shortcutGenerator("Shift+Space", () => robot.moveMouse(screenSize.width/2, screenSize.height/2));
  bulkShortcutGenerator(defaults);
}

module.exports = { defaultShortcuts, shortcutGenerator }
