const { globalShortcut } = require("electron");
const robot = require("robotjs");
const screenSize = robot.getScreenSize();

function shortcutGenerator(keySequence, callback) {
  globalShortcut.register(keySequence, () => {
    console.log(keySequence + " is pressed");
    callback();
  });
}

function bulkShortcutGenerator(shortcuts) {
  shortcuts.forEach(shortcut => shortcutGenerator(...shortcut));
}

function defaultShortcuts() {
  const defaults = [
    ["CommandOrControl+Space", () => robot.moveMouse(screenSize.width/2, screenSize.height/2)],
    ["CommandOrControl+1", () => robot.moveMouse(screenSize.width/4, screenSize.height/4)],
    ["CommandOrControl+2", () => robot.moveMouse(screenSize.width/4, screenSize.height*3/4)],
    ["CommandOrControl+3", () => robot.moveMouse(screenSize.width*3/4, screenSize.height*3/4)],
    ["CommandOrControl+4", () => robot.moveMouse(screenSize.width*3/4, screenSize.height/4)],    
  ];
  bulkShortcutGenerator(defaults);
}

module.exports = { defaultShortcuts, shortcutGenerator }