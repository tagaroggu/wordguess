/**
 * This module contains a diffing algorithm for guesses and answers. This
 * module can be used standalone to implement a custom version of a word
 * guessing game.
 * @module
 */ 

/**
 * @description The letters of a guess, when compared to the answer, can be
 * either correct (1), be contained within the guess but in the wrong spot (-1),
 * or incorrect (0).
 */
const LetterTypes = {
  CORRECT: 1,
  CONTAINS: -1,
  INCORRECT: 0,
} as const;

/**
 * @description Compares the guess to the answer and returns an array of
 * {@link LetterTypes} which shows how the guess compares to the answer.
 * Throws if the guess and answer have different lengths. This may not
 * work very well across different languages/writing systems internationally.
 */
function compare(
  guess: string,
  answer: string,
): (typeof LetterTypes)[keyof typeof LetterTypes][] {
  const guessArray = guess.split("");
  const answerArray = answer.split("");
  if (guessArray.length !== answerArray.length) {
    throw new Error("Guess and Answer must be same length");
  }
  const totalLetterCounts = Object.create(null);
  const usedLetterCounts = Object.create(null);
  answerArray.forEach((letter) => {
    totalLetterCounts[letter] ??= 0;
    totalLetterCounts[letter]++;
    usedLetterCounts[letter] ??= 0;
  });
  const comparisonArray = Array.from({ length: guessArray.length })
    .fill(0);

  // Green boxes, represented in comparisonArray by 1s
  for (let i = 0; i < guessArray.length; i++) {
    // Waow so simple
    if (guessArray[i] === answerArray[i]) {
      comparisonArray[i] = 1;
      usedLetterCounts[guessArray[i]]++;
    }
  }

  // Yellow boxes, represented in comparisonArray by -1s

  for (let i = 0; i < guessArray.length; i++) {
    if (comparisonArray[i]) continue;
    if (usedLetterCounts[guessArray[i]] === totalLetterCounts[guessArray[i]]) {
      continue;
    }
    if (answer.indexOf(guessArray[i]) === -1) continue;

    comparisonArray[i] = -1;
    usedLetterCounts[guessArray[i]]++;
  }

  // Gray boxes are the 0s leftover in comparisonArray
  return comparisonArray as (typeof LetterTypes)[keyof typeof LetterTypes][];
}

export { LetterTypes, compare };
