const { globalShortcut } = require("electron");
const robot = require("robotjs");
const screenSize = robot.getScreenSize();

function shortcutGenerator(keySequence, callback) {
  globalShortcut.register(keySequence, () => {
    console.log(keySequence + " is pressed");
    callback();
  });
}

function defaultShortcuts() {
  shortcutGenerator("CommandOrControl+Space", () => robot.moveMouse(screenSize.width/2, screenSize.height/2));

  shortcutGenerator("CommandOrControl+1", () => robot.moveMouse(screenSize.width/4, screenSize.height/4));

  shortcutGenerator("CommandOrControl+2", () => robot.moveMouse(screenSize.width/4, screenSize.height*3/4));

  shortcutGenerator("CommandOrControl+3", () => robot.moveMouse(screenSize.width*3/4, screenSize.height*3/4));

  shortcutGenerator("CommandOrControl+4", () => robot.moveMouse(screenSize.width*3/4, screenSize.height/4));
}

module.exports = { defaultShortcuts, shortcutGenerator };
