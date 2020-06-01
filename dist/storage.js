function saveArray(settingName, enabledNotes) {
    localStorage.setItem(settingName, JSON.stringify(enabledNotes));
}
function loadArray(settingName) {
    var loadedString = localStorage.getItem("freeModeSettings");
    if (loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}
