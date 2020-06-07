var DAILY_STATS_PREFIX = "DailyStats:";
/**
 * String array will record the dates with stats:
 * [ "YYYY-MM-DD-NUMOFNOTES" ... "YYYY-MM-DD-NUMOFNOTES" ]
 *
 * Then localStorage will look like
 * save(YYYY-MM-DD-NUMOFNOTES",
 *     "{rights: 1,
 *      wrongs: 2}""
 * );
 */
var DailyStats = /** @class */ (function () {
    function DailyStats(rights, wrongs) {
        this.rights = rights;
        this.wrongs = wrongs;
    }
    return DailyStats;
}());
var DailyStatsKey = /** @class */ (function () {
    function DailyStatsKey(date, numOfNotes) {
        this.date = date;
        this.numOfNotes = numOfNotes;
    }
    return DailyStatsKey;
}());
function currentDateAsString() {
    var currentDate = new Date();
    return currentDate.getFullYear() + "-" + formatTwoDigits(currentDate.getMonth()) + "-" + formatTwoDigits(currentDate.getDay());
}
function getDailyStatPosition() {
    return DAILY_STATS_PREFIX + currentDateAsString() + ":Notes:" + numOfNotes;
}
function incrementDailyRights(numOfNotes) {
    var prevDailyStats = loadDailyStats(getDailyStatPosition());
    if (prevDailyStats == undefined) {
        prevDailyStats = new DailyStats(0, 0);
    }
    saveDailyStats(getDailyStatPosition(), new DailyStats(prevDailyStats.rights + 1, prevDailyStats.wrongs));
}
function incrementDailyWrongs(numOfNotes) {
    var prevDailyStats = loadDailyStats(getDailyStatPosition());
    if (prevDailyStats == undefined) {
        prevDailyStats = new DailyStats(0, 0);
    }
    saveDailyStats(getDailyStatPosition(), new DailyStats(prevDailyStats.rights, prevDailyStats.wrongs + 1));
}
function parseDailyStatsKey(dailyStatsKeyStr) {
    var columns = dailyStatsKeyStr.split(":");
    return new DailyStatsKey(columns[1], parseInt(columns[3]));
}
function addStat(loadedDailyStats, dailyStatsKey, dailyStats) {
    var loadedDailyStatsEntry = loadedDailyStats[dailyStatsKey.date];
    if (loadedDailyStatsEntry == undefined) {
        loadedDailyStatsEntry = {};
        loadedDailyStats[dailyStatsKey.date] = loadedDailyStatsEntry;
    }
    loadedDailyStatsEntry[dailyStatsKey.numOfNotes] = dailyStats;
}
function parseAllDailyStatsFromStorage() {
    var loadedDailyStats = {};
    var availableStats = listDailyStats();
    for (var i = 0; i < availableStats.length; i++) {
        var availableStatStr = availableStats[i];
        var availableStat = parseDailyStatsKey(availableStatStr);
        addStat(loadedDailyStats, availableStat, loadDailyStats(availableStatStr));
    }
    return loadedDailyStats;
}
function loadAllDailyStats() {
    var loadedDailyStats = parseAllDailyStatsFromStorage();
    if (Object.keys(loadedDailyStats).length <= 0) {
        return;
    }
    document.getElementById("history").hidden = false;
    var statsTable = document.getElementById("statsTable");
    // header
    var headerRow = document.createElement("tr");
    var numberOfNotesDesc = document.createElement("td");
    numberOfNotesDesc.innerText = "Number of Notes:";
    headerRow.appendChild(numberOfNotesDesc);
    for (var numOfNotes = 2; numOfNotes <= 12; numOfNotes++) {
        var numberOfNotesHeader = document.createElement("td");
        numberOfNotesHeader.innerText = numOfNotes + "";
        headerRow.appendChild(numberOfNotesHeader);
    }
    statsTable.appendChild(headerRow);
    var dates = Object.keys(loadedDailyStats).sort().reverse();
    // data
    for (var i = 0; i < dates.length; i++) {
        var date = dates[i];
        var tableRow = document.createElement("tr");
        var dateCell = document.createElement("td");
        dateCell.innerText = date;
        tableRow.appendChild(dateCell);
        for (var numOfNotes = 2; numOfNotes <= 12; numOfNotes++) {
            var noteCell = document.createElement("td");
            var dailyStats = loadedDailyStats[date][numOfNotes];
            if (dailyStats != undefined) {
                noteCell.innerText = "R: " + dailyStats.rights
                    + ", W: " + dailyStats.wrongs
                    + ", P: " + calcPercent(dailyStats.rights, dailyStats.rights + dailyStats.wrongs);
            }
            tableRow.appendChild(noteCell);
        }
        statsTable.appendChild(tableRow);
    }
}
loadAllDailyStats();
