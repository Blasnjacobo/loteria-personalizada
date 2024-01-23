import { useState, useEffect } from 'react'
import { User } from '../type/User'

interface GameProp {
  activeUser: User | undefined;
}

const Game = ({ activeUser }: GameProp) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (activeUser && started) {
      const collection = activeUser?.collection || []
      const collectionLength = collection.length

      const shuffledIndices = Array.from({ length: collectionLength - 1 }, (_, index) => index + 1)
      console.log(shuffledIndices)

      // Fisher-Yates shuffle algorithm
      for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]]
      }

      let index = 0

      const cardInterval = setInterval(() => {
        setCurrentCardIndex(shuffledIndices[index])

        index++

        if (index === collectionLength) {
          // If all cards are shown, stop the interval
          clearInterval(cardInterval)
        }
      }, 1000)

      return () => clearInterval(cardInterval)
    }
  }, [activeUser, started])

  const currentCard = activeUser?.collection?.[currentCardIndex]

  const handleClickStart = () => {
    setStarted(true)
  }

  return (
    <main className='GameMain'>
      <section>
        {currentCard && (
          <div className='GameCards' key={currentCard.id}>
            <img className='GameImage' src={currentCard.url} alt={currentCard.nombre} />
            <div>{currentCard.nombre}</div>
          </div>
        )}
      </section>
      <section className=''>
        <button onClick={handleClickStart}>Start</button>
      </section>
    </main>
  )
}

export default Game
