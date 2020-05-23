
class Note {
    constructor(public name: string, public isSharp: boolean, public rank: number) { }
}

let notesByRank = [
    new Note("C", false, 0),
    new Note("C#", true, 1),
    new Note("D", false, 2),
    new Note("D#", true, 3),
    new Note("E", false, 4),
    new Note("F", false, 5),
    new Note("F#", true, 6),
    new Note("G", false, 7),
    new Note("G#", true, 8),
    new Note("A", false, 9),
    new Note("A#", true, 10),
    new Note("B", false, 11),
];

let NOTES = {
    "C": notesByRank[0],
    "C#": notesByRank[1],
    "D": notesByRank[2],
    "D#": notesByRank[3],
    "E": notesByRank[4],
    "F": notesByRank[5],
    "F#": notesByRank[6],
    "G": notesByRank[7],
    "G#": notesByRank[8],
    "A": notesByRank[9],
    "A#": notesByRank[10],
    "B": notesByRank[11],
}

class AbsoluteNote {
    constructor(public note: Note, public octave: number) { }

    equals(other: AbsoluteNote): boolean {
        return this.note.rank == other.note.rank
            && this.octave == other.octave
    }
}

function increasePitch(absoluteNote: AbsoluteNote): AbsoluteNote {
    if (absoluteNote.note.rank == 11) {
        return new AbsoluteNote(notesByRank[0],
                absoluteNote.octave + 1);
    }
    return new AbsoluteNote(notesByRank[absoluteNote.note.rank + 1],
            absoluteNote.octave);
}

function displayName(absoluteNote: AbsoluteNote): string {
    return absoluteNote.note.name + " " + absoluteNote.octave;
}
