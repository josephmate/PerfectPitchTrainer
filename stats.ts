/// <reference path="node_modules/@types/dygraphs/index.d.ts" />

let DAILY_STATS_PREFIX = "DailyStats:";

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
class DailyStats {
    constructor(readonly rights: number, readonly wrongs: number) { }
}

class DailyStatsKey {
    constructor(readonly date: string, readonly numOfNotes: number) { }
}

interface NoteDailyStats {
    [numOfNotes: number]: DailyStats;
}

interface LoadedDailyStats {
    [dateStr: string]: NoteDailyStats;
}

function formatTwoDigits(num: number): string {
    if(num <= 9) {
        return "0" + num;
    }
    return "" + num;
}

function currentDateAsString(): string {
    let currentDate = new Date();
    return currentDate.getFullYear() + "-" + formatTwoDigits(currentDate.getMonth()) + "-" + formatTwoDigits(currentDate.getDate());
}

function getDailyStatPosition(): string {
    return DAILY_STATS_PREFIX + currentDateAsString() + ":Notes:" + numOfNotes;
}

function incrementDailyRights(numOfNotes: number) {
    let prevDailyStats = loadDailyStats(getDailyStatPosition());
    if (prevDailyStats == undefined) {
        prevDailyStats = new DailyStats(0, 0);
    }
    saveDailyStats(getDailyStatPosition(), new DailyStats(prevDailyStats.rights + 1, prevDailyStats.wrongs));
}

function incrementDailyWrongs(numOfNotes: number) {
    let prevDailyStats = loadDailyStats(getDailyStatPosition());
    if (prevDailyStats == undefined) {
        prevDailyStats = new DailyStats(0, 0);
    }
    saveDailyStats(getDailyStatPosition(), new DailyStats(prevDailyStats.rights, prevDailyStats.wrongs + 1));
}

function parseDailyStatsKey(dailyStatsKeyStr: string): DailyStatsKey {
    let columns = dailyStatsKeyStr.split(":");
    return new DailyStatsKey(columns[1], parseInt(columns[3]));
}

function addStat(loadedDailyStats: LoadedDailyStats, dailyStatsKey: DailyStatsKey, dailyStats: DailyStats) {
    var loadedDailyStatsEntry = loadedDailyStats[dailyStatsKey.date];
    if(loadedDailyStatsEntry == undefined) {
        loadedDailyStatsEntry = {};
        loadedDailyStats[dailyStatsKey.date] = loadedDailyStatsEntry;
    }

    loadedDailyStatsEntry[dailyStatsKey.numOfNotes] = dailyStats;
}

function parseAllDailyStatsFromStorage(): LoadedDailyStats {
    let loadedDailyStats = {};
    let availableStats =  listDailyStats();
    for(var i = 0; i < availableStats.length; i++) {
        let availableStatStr = availableStats[i];
        let availableStat = parseDailyStatsKey(availableStatStr);
        addStat(loadedDailyStats, availableStat, loadDailyStats(availableStatStr));
    }
    return loadedDailyStats;
}

function drawDailyStatsTable(loadedDailyStats: LoadedDailyStats) {
    let statsTable = document.getElementById("statsTable");
    // header
    let headerRow = document.createElement("tr");
    let numberOfNotesDesc = document.createElement("td");
    numberOfNotesDesc.innerText = "Number of Notes:";
    headerRow.appendChild(numberOfNotesDesc);
    for(var numOfNotes = 2; numOfNotes <= notesByRank.length; numOfNotes++) {
        let numberOfNotesHeader = document.createElement("td");
        numberOfNotesHeader.innerText = numOfNotes + "";
        headerRow.appendChild(numberOfNotesHeader);
    }
    statsTable.appendChild(headerRow);
    let dates = Object.keys(loadedDailyStats).sort().reverse();
    // data
    for(var i = 0; i < dates.length; i++) {
        let date = dates[i];
        let tableRow = document.createElement("tr");
        let dateCell = document.createElement("td");
        dateCell.innerText = date;
        tableRow.appendChild(dateCell);
        for(var numOfNotes = 2; numOfNotes <= notesByRank.length; numOfNotes++) {
            let noteCell = document.createElement("td");
            let dailyStats = loadedDailyStats[date][numOfNotes];
            if(dailyStats != undefined) {
                noteCell.innerText = "R: " + dailyStats.rights
                + ", W: " + dailyStats.wrongs
                + ", P: " + calcPercentString(dailyStats.rights, dailyStats.rights+dailyStats.wrongs);
            }
            tableRow.appendChild(noteCell);
        }
        statsTable.appendChild(tableRow);
    }
}

function convertLoadedDailyStatsToCsv(loadedDailyStats: LoadedDailyStats): string {
    var result = "Date";
    for(var numOfNotes = 2; numOfNotes <= notesByRank.length; numOfNotes++) {
        result += "," + numOfNotes + " Notes";
    }
    result += "\n";

    let dates = Object.keys(loadedDailyStats).sort();
    // data
    for(var i = 0; i < dates.length; i++) {
        let dateStr = dates[i];
        result += dateStr;
        for(var numOfNotes = 2; numOfNotes <= notesByRank.length; numOfNotes++) {
            result += ",";
            let dailyStats = loadedDailyStats[dateStr][numOfNotes];
            if(dailyStats != undefined) {
                result += calcPercent(dailyStats.rights, dailyStats.rights+dailyStats.wrongs);
            }
        }
        result += "\n";
    }

    console.info(result);
    return result;
}

function drawDailyStatsDygraph(loadedDailyStats: LoadedDailyStats) {
    new Dygraph(
        document.getElementById("statsDygraphDiv"),
        convertLoadedDailyStatsToCsv(loadedDailyStats)
      );
}

function loadAllDailyStats() {
    let loadedDailyStats = parseAllDailyStatsFromStorage();
    if (Object.keys(loadedDailyStats).length <= 0) {
        return;
    }
    document.getElementById("history").hidden = false;
    drawDailyStatsTable(loadedDailyStats);
    drawDailyStatsDygraph(loadedDailyStats);
}

loadAllDailyStats();