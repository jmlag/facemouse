const { globalShortcut } = require("electron");
const robot = require("robotjs");
const screenSize = robot.getScreenSize();

function shortcuts() {
  globalShortcut.register('CommandOrControl+Space', () => {
    console.log('CommandOrControl+Space is pressed')
    robot.moveMouse(screenSize.width/2, screenSize.height/2);
  });

  globalShortcut.register('CommandOrControl+1', () => {
    console.log('CommandOrControl+1 is pressed')
    robot.moveMouse(screenSize.width/4, screenSize.height/4);
  });

  globalShortcut.register('CommandOrControl+2', () => {
    console.log('CommandOrControl+2 is pressed')
    robot.moveMouse(screenSize.width/4, screenSize.height*3/4);
  });

  globalShortcut.register('CommandOrControl+3', () => {
    console.log('CommandOrControl+3 is pressed')
    robot.moveMouse(screenSize.width*3/4, screenSize.height*3/4);
  });

  globalShortcut.register('CommandOrControl+4', () => {
    console.log('CommandOrControl+4 is pressed')
    robot.moveMouse(screenSize.width*3/4, screenSize.height/4);
  });
}

module.exports = shortcuts;
