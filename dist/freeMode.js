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
// prepare the guess buttons
applyFreeModeSettings();
