// map of note rank to the checkbox that enables it
let freeModeNoteSettings = [];
// prepare the guess settings
let freeModeSettingsList = document.getElementById("freeModeSettingsList");

function loadFreeModeSettings() {
    let loadedFreeModeSettings = loadArray("freeModeSettings");
    notesByRank.forEach((note, index) => {
        let listItem = document.createElement("li");
        let check = document.createElement("input");
        check.type = "checkbox";
        check.checked = loadedFreeModeSettings == undefined || loadedFreeModeSettings[index];
        freeModeNoteSettings[note.rank] = check;
        listItem.appendChild(check);
        let span = document.createElement("span");
        span.innerText = note.name;
        listItem.appendChild(span);
        freeModeSettingsList.appendChild(listItem);
    });
}

function getNotesByRankEnabledMap(): Array<boolean> {
    let enabledNotes = [];
    freeModeNoteSettings.forEach((value, index) => {
        if (value.checked) {
            enabledNotes[index] = true;
        } else {
            false;
        }
    });
    return enabledNotes;
}

function applyFreeModeSettings() {
    let enabledNotesMap = getNotesByRankEnabledMap();
    applySettings(enabledNotesMap);
    saveArray("freeModeSettings", enabledNotesMap);
}

function disableFreeMode() {
    document.getElementById("freePracticeExplanation").hidden = true;
    document.getElementById("soundReferenceTools").hidden = true;
    document.getElementById("freeModeSettingsDiv").hidden = true;
    
}

function enableFreeMode() {
    disableTestMode();
    document.getElementById("mode").innerText = "Free practice";
    document.getElementById("freePracticeExplanation").hidden = false;
    document.getElementById("soundReferenceTools").hidden = false;
    document.getElementById("freeModeSettingsDiv").hidden = false;
    applyFreeModeSettings();
}

loadFreeModeSettings();
// prepare the guess buttons
applyFreeModeSettings();