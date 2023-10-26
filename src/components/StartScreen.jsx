// CSS
import './StartScreen.css'

const StartScreen = ({ startGame }) => {
    return (
        <div className='start'>
            <h1>Secret Word</h1>
            <p>Clique no botão jogar para começar</p>
            <button onClick={startGame}>Jogar</button>
        </div>
    )
}

export default StartScreen