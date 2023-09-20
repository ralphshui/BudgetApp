import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import cutewallet from '../../images/cute-wallet.jpg'

import './Intro.css'

const Intro = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleCreate = () => {
    navigate('/create'); 
  };

  return (
    <div className='intro'>
      <div > 
        <h1>
          Be <span className='happy'>Happy.</span>
        </h1>
        <p>
          The first step to financial freedom is personal budgeting. 
          Begin your jouney today.
        </p>
        <p className='button-container'>
          <button className='btn btn--dark'onClick={handleLogin}>Login</button>
          <button className='btn btn--dark'onClick={handleCreate}>SignUp</button>
        </p>
      </div>
      <img src={cutewallet} alt='cartoon-wallet'/>
    </div>
  )
}
export default Intro