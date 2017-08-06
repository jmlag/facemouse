const settings = require("electron-settings");

const userSettings = settings.getAll();

const defaultSettings = {
  sensitivity: [document.getElementById("sensitivity"), 6],
  delay: [document.getElementById("delay"), 0],
  jitterReduction: [document.getElementById("jitterReduction"), 0.0012],
};

for (let setting in defaultSettings){
  const el = defaultSettings[setting][0];
  el.addEventListener("blur", e => changeSetting(e.target.id, e.target.value));
  el.addEventListener("beforeunload", e => changeSetting(e.target.id, e.target.value));
  if (!userSettings[setting]) settings.set(setting, defaultSettings[setting][1]);
  el.value = (userSettings[setting]) ? userSettings[setting] : defaultSettings[setting][1];
}

function changeSetting(setting, newValue){
  if (defaultSettings[setting][1] !== newValue && newValue){
    settings.set(setting, newValue);
  }
}

module.exports = { userSettings, defaultSettings };