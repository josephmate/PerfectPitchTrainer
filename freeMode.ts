
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
    applySettings(getNotesByRankEnabledMap());
}

// prepare the guess buttons
applyFreeModeSettings();