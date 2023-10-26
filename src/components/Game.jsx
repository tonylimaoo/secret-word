import { useState, useRef } from 'react'

import './Game.css'
const Game = ({
  gameOver,
  verifyLetter,
  pickedWord,
  pickedCategoy,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus() // focus on input to submit data again
  }

  return (
    <div className='game'>
      <p className='points'>
        <span> Pontuação: {score} </span>
      </p>
      <h1 className='title'>Adivinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategoy}</span>
      </h3>
      <p>Voê ainda tem {guesses} tentativa(s).</p>
      <div className='wordContainer'>
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
        {/* <span className='letter'>A</span>
        <span className='blankSquare'></span> */}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="letter"
              maxLength='1'
              required
              onChange={(e) => { setLetter(e.target.value) }}
              value={letter}
              ref={letterInputRef}
            />
          </label>
          <button>Chutar</button>
        </form>
        <div className="wrongLetters">
          <p>Letras já utilizadas: </p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
        </div>
      </div>
      <button onClick={gameOver}>GameOver</button>
    </div>
  )
}

export default Game