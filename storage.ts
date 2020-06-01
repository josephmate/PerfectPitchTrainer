


function saveArray(settingName: string, enabledNotes: Array<boolean>) {
    localStorage.setItem(settingName, JSON.stringify(enabledNotes));
}

function loadArray(settingName: string):  Array<boolean> {
    let loadedString = localStorage.getItem("freeModeSettings");
    if(loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}