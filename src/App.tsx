import * as React from "react";
import "./App.css";

const NOTE_NAMES = [
  ["A"],
  ["A#", "Bb"],
  ["B"],
  ["C"],
  ["C#", "Db"],
  ["D"],
  ["D#", "Eb"],
  ["E"],
  ["F"],
  ["F#", "Gb"],
  ["G"],
  ["G#", "Ab"],
];

const getNoteIndex = (noteName: string) =>
  NOTE_NAMES.findIndex((names) => names.includes(noteName));
const getNoteNameAtInterval = (
  noteName: string,
  interval: number
): string[] => {
  const noteIndex = getNoteIndex(noteName);
  const newNoteNames = NOTE_NAMES.at(
    (noteIndex + interval) % NOTE_NAMES.length
  ) || [];
  if (interval < 0) {
    return newNoteNames.toReversed();
  }
  return newNoteNames;
};

// const CHROMATIC_INTERVALS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// const MAJOR_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
// const MINOR_INTERVALS = [2, 1, 2, 2, 1, 2, 2];

// const getScale = (noteName: string, intervals: number[]): string[][] => {
//   let noteIndex = getNoteIndex(noteName);
//   const scale = [NOTE_NAMES[noteIndex]];
//   intervals.forEach((interval) => {
//     const currentNoteName = NOTE_NAMES[noteIndex][0];
//     const newNoteNames = getNoteNameAtInterval(currentNoteName, interval);
//     scale.push(newNoteNames);
//     noteIndex = getNoteIndex(newNoteNames[0]);
//   });
//   return scale;
// };

const formatNote = (notes: string[], join: boolean = true): string => {
  return join ? notes.join("/") : notes[0]
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomNoteIndex = (): number => {
  return getRandomInt(NOTE_NAMES.length);
};

const GUESS_INTERVALS = [1, 2];
const GUESS_INTERVAL_NAMES = ["half step", "whole step"];

function App() {
  const [currentNoteIndex, setCurrentNoteIndex] = React.useState(() =>
    getRandomNoteIndex()
  );
  const [noteNameIndex, setNoteNameIndex] = React.useState(0);
  const currentNoteName = React.useMemo(
    () => NOTE_NAMES[currentNoteIndex][noteNameIndex],
    [currentNoteIndex, noteNameIndex]
  );
  const [guessIntervalIndex, setGuessIntervalIndex] = React.useState(1);
  const [guessIntervalDirection, setGuessIntervalDirection] = React.useState(1);
  const guessIntervalName = React.useMemo(
    () =>
      `${GUESS_INTERVAL_NAMES[guessIntervalIndex]} ${
        guessIntervalDirection > 0 ? "up" : "down"
      }`,
    [guessIntervalIndex, guessIntervalDirection]
  );

  const correctResponse = React.useMemo(() => {
    return formatNote(
      getNoteNameAtInterval(
        currentNoteName,
        GUESS_INTERVALS[guessIntervalIndex] * guessIntervalDirection
      )
    );
  }, [currentNoteName, guessIntervalIndex, guessIntervalDirection]);
  const [showResponse, setShowResponse] = React.useState(false);

  return (
    <>
        <h1>{currentNoteName}</h1>
        <h2>{guessIntervalName}</h2>
        <h2>{showResponse ? correctResponse : "?"}</h2>
        <button
          onClick={() => {
            if (showResponse) {
              const newIndex = getRandomNoteIndex();
              const newNameIndex = getRandomInt(NOTE_NAMES[newIndex].length);
              setCurrentNoteIndex(newIndex);
              setNoteNameIndex(newNameIndex);
              setGuessIntervalIndex(getRandomInt(GUESS_INTERVALS.length));
              setGuessIntervalDirection(getRandomInt(2) * 2 - 1);
              setShowResponse(false);
            } else {
              setShowResponse(true);
            }
          }}
        >
          {showResponse ? "Next" : "Reveal"}
        </button>
    </>
  );
}

export default App;
