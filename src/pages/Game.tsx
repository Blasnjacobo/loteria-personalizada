import { useState, useEffect } from 'react'
import { Card, User } from '../type/User'
import { Link } from 'react-router-dom'

interface GameProp {
  activeUser: User | undefined;
}

const Game = ({ activeUser }: GameProp) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [previousCards, setPreviousCards] = useState<Card[]>([])

  useEffect(() => {
    let cardInterval: number

    const startGame = () => {
      const collection = activeUser?.collection || []
      const collectionLength = collection.length

      const shuffledIndices = Array.from({ length: collectionLength }, (_, index) => index)

      // Fisher-Yates shuffle algorithm
      for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]]
      }

      let index = 0

      cardInterval = window.setInterval(() => {
        if (!paused) {
          setCurrentCardIndex(shuffledIndices[index])

          // Speak the name of the current card
          speak(`${collection[shuffledIndices[index]].nombre}`)
          index++
          setPreviousCards((previousCards) => [
            ...previousCards,
            collection[shuffledIndices[index - 1]]
          ])

          if (index === collectionLength) {
            // If all cards are shown, stop the interval
            clearInterval(cardInterval)
            setStarted(false)
            setImageLoaded(false)
          }
        }
      }, 3000)
    }

    if (activeUser && started && !paused) {
      startGame()
    }

    return () => clearInterval(cardInterval)
  }, [activeUser, started, paused])

  const currentCard = activeUser?.collection?.[currentCardIndex]

  const handleClickStart = () => {
    if (!started) {
      setStarted(true)
    } else {
      setPaused(!paused)
    }
  }

  const handleClickRestart = () => {
    setCurrentCardIndex(0)
    setStarted(false)
    setPaused(false)
    setPreviousCards([])
  }

  const speak = (text: string) => {
    if (window.speechSynthesis) {
      const synth = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(text)
      synth.speak(utterance)
    } else {
      console.error('Speech synthesis not supported in this environment.')
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <main className='GameMain'>
      <Link to='/loteria-personalizada/' className='homeButton GoBack'>
        Regresar a la pagina principal
      </Link>
      <section className='PreviousCards '>
        {previousCards.map((card) => (
          <div key={card.id}>
            <img src={card.url} alt={card.nombre} />
          </div>
        ))}
      </section>
      {currentCard && (
        <section className='GameCards FlexCenter' key={currentCard.id}>
          <img
            className='GameImage'
            src={currentCard.url}
            alt={currentCard.nombre}
            onLoad={handleImageLoad}
          />
          {imageLoaded && <div>{currentCard.nombre}</div>}
        </section>
      )}
      <section className='GameButtons'>
        <button onClick={handleClickStart}>
          {!started ? 'Start' : paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={handleClickRestart}>Restart</button>
      </section>
    </main>
  )
}

export default Game
