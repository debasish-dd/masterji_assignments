import { useState } from 'react'
import React from 'react'
import useCoins from '../context/CoinContext'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Coins from '../components/Coins'

function App() {
  const [count, setCount] = useState(0)

  const {allCoins} =  useCoins()
  return (
   <div className='bg-gradient-to-t from-stone-600 to-neutral-800 min-h-screen text-white overflow-x-hidden overflow-hidden '>
    <Navbar/>
    
    <Home/>
   
   </div>
  )
}

export default App
