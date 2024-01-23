import React, { SetStateAction } from 'react'
import Header from '../components/Header'

interface StartProps {
    setCode: React.Dispatch<SetStateAction<string>>
    active: boolean
}

const Home = ({ setCode, active }: StartProps) => {
  return (
    <main>
      <section className='header'>
        <Header setCode={setCode} active={active} />
      </section>
      <section className='main-page'>
        <h1 className='main-content'>Bienvenido a TU lotería</h1>
      </section>
    </main>
  )
}

export default Home
