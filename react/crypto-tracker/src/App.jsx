import { useState } from 'react'
import React from 'react'
import useCoins from '../context/CoinContext'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Coins from '../components/Coins'
import { Outlet } from 'react-router-dom'


function App() {
  const {themeMode} = useCoins()
  return (
   <div className={`${themeMode ? 'bg-gray-800  text-white' : 'bg-gradient-to-r from-lime-50 to-emerald-50 text-gray-900'} min-h-screen overflow-x-hidden`}>
    <Navbar/>
    <div className='pt-35 md:pt-25'>
      <Outlet />
    </div>
</div>
  )
}


export default App
