import React, { SetStateAction } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  setCode: React.Dispatch<SetStateAction<string>>;
  active: boolean;
}

const Header = ({ setCode, active }: HeaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCode(value)
  }

  return (
    <div className='header-container'>
      <h1 className='header-title'>Loteria Personalizada</h1>
      <div className='header-code'>
        <div className='input-wrapper'>
          <span>Ingresa tu codigo: </span>
          <div>
            <input
              type='text'
              onChange={handleChange}
              name='code'
              placeholder='Example: 123123123'
            />
          </div>
          <div>
            {(active) && (
              <Link to='/loteria-personalizada/Game' className='homeButton'>
                Go to Game
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
