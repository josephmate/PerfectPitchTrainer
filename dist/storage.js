function listDailyStats() {
    var results = [];
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(DAILY_STATS_PREFIX) == 0) {
            results.push(keys[i]);
        }
    }
    return results;
}
function saveDailyStats(settingName, dailySats) {
    localStorage.setItem(settingName, JSON.stringify(dailySats));
}
function loadDailyStats(settingName) {
    var loadedString = localStorage.getItem(settingName);
    if (loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}
function saveStringArray(settingName, enabledNotes) {
    localStorage.setItem(settingName, JSON.stringify(enabledNotes));
}
function loadStringArray(settingName) {
    var loadedString = localStorage.getItem(settingName);
    if (loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}
function saveBooleanArray(settingName, enabledNotes) {
    localStorage.setItem(settingName, JSON.stringify(enabledNotes));
}
function loadBooleanArray(settingName) {
    var loadedString = localStorage.getItem(settingName);
    if (loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}
function saveNumber(settingName, value) {
    localStorage.setItem(settingName, JSON.stringify(value));
}
function loadNumber(settingName) {
    var loadedString = localStorage.getItem(settingName);
    if (loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}
