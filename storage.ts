
function listDailyStats(): Array<string> {
    let results = [];
    let keys = Object.keys(localStorage);
    for(var i = 0; i < keys.length; i++) {
        if(keys[i].indexOf(DAILY_STATS_PREFIX) == 0) {
            results.push(keys[i]);
        }
    }
    return results;
}

function saveDailyStats(settingName: string, dailySats: DailyStats) {
    localStorage.setItem(settingName, JSON.stringify(dailySats));
}

function loadDailyStats(settingName: string): DailyStats {
    let loadedString = localStorage.getItem(settingName);
    if(loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}

function saveStringArray(settingName: string, enabledNotes: Array<string>) {
    localStorage.setItem(settingName, JSON.stringify(enabledNotes));
}

function loadStringArray(settingName: string): Array<string> {
    let loadedString = localStorage.getItem(settingName);
    if(loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}

function saveBooleanArray(settingName: string, enabledNotes: Array<boolean>) {
    localStorage.setItem(settingName, JSON.stringify(enabledNotes));
}

function loadBooleanArray(settingName: string): Array<boolean> {
    let loadedString = localStorage.getItem(settingName);
    if(loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}

function saveNumber(settingName: string, value: number) {
    localStorage.setItem(settingName, JSON.stringify(value));
}

function loadNumber(settingName: string): number {
    let loadedString = localStorage.getItem(settingName);
    if(loadedString) {
        return JSON.parse(loadedString);
    }
    return undefined;
}