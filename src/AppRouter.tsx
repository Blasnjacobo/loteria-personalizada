/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import { User } from './type/User'
import { UsersInfo } from './consts/Users'
import './App.css'
import './Game.css'

const AppRouter = () => {
  const [code, setCode] = useState('')
  const [active, setActive] = useState(false)
  const [users, setUsers] = useState<User[]>(UsersInfo)

  const activeUser = users.find(user => user.userName === code)
  useEffect(() => {
    if (activeUser) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [code, users])

  return (
    <div>
      <Routes>
        <Route path='/loteria-personalizada/' element={<Home setCode={setCode} active={active} />} />
        <Route path='/loteria-personalizada/Game' element={<Game activeUser={activeUser} />} />
      </Routes>
    </div>
  )
}

export default AppRouter
