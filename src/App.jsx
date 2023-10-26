//Css
import './App.css';

// React
import { useCallback, useState, useEffect } from 'react';

// Components
import StartScreen from './components/StartScreen';

// Data
import { wordsList } from './data/word'
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState();
  const [pickedCategoy, setPickedCategory] = useState();
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWorkAndCategory = useCallback(() => {
    // pick random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)]

    // pick random word
    const wordsArray = words[category]
    const word = wordsArray[Math.floor(Math.random() * wordsArray.length)]

    return { word, category };
  }, [words])

  // starts secret word
  const startGame = useCallback(() => {
    // Clear Letter State
    clearLetterStates();
    // pick word and category
    const { word, category } = pickWorkAndCategory();
    // separate letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWorkAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    };

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {

      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);

    } else {

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //check loss condition
  useEffect(() => {
    if (guesses <= 0) {
      // Reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)] // Set deixa valores unicos num array
    if (uniqueLetters.length === guessedLetters.length) {
      setScore((actualScore) => actualScore += 100)

      //Restart word
      startGame();
    }
  }, [guessedLetters, letters, startGame])

  const gameOver = () => {
    setGameStage(stages[2].name);
  }

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
        <Game
          gameOver={gameOver}
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategoy={pickedCategoy}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
