// map of note rank to the checkbox that enables it
var freeModeNoteSettings = [];
// prepare the guess settings
var freeModeSettingsList = document.getElementById("freeModeSettingsList");
notesByRank.forEach(function (note) {
    var listItem = document.createElement("li");
    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;
    freeModeNoteSettings[note.rank] = check;
    listItem.appendChild(check);
    var span = document.createElement("span");
    span.innerText = note.name;
    listItem.appendChild(span);
    freeModeSettingsList.appendChild(listItem);
});
function getNotesByRankEnabledMap() {
    var enabledNotes = [];
    freeModeNoteSettings.forEach(function (value, index) {
        if (value.checked) {
            enabledNotes[index] = true;
        }
        else {
            false;
        }
    });
    return enabledNotes;
}
function applyFreeModeSettings() {
    applySettings(getNotesByRankEnabledMap());
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
// prepare the guess buttons
applyFreeModeSettings();
