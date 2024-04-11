import React from 'react'
import LandingPage from '../Components/LandingPage'
import Login from '../Components/Login'

const Home = ({ toggleLogin }) => {
  return (
    <div>
        <LandingPage toggleLogin={toggleLogin}/>
    </div>
  )
}

export default Home