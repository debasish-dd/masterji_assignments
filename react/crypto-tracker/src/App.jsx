import { useState } from 'react'
import React from 'react'
import useCoins from '../context/CoinContext'
import Navbar from '../components/Navbar'
import Home from '../components/Home'

function App() {
  const [count, setCount] = useState(0)

  const {allCoins} =  useCoins()
  return (
   <div className='bg-gradient-to-t from-stone-500 via-neutral-500 to-gray-700 min-h-screen text-white'>
    <Navbar/>
    
    <Home/>
   </div>
  )
}

export default App
