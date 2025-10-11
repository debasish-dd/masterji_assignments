import { useState } from 'react'
import useCoins from '../context/CoinContext'
import { Link, useNavigate, Outlet } from 'react-router-dom'


function Navbar() {
  const { setCurrency, setDisplayCoins, allCoins } = useCoins()
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);



  const currencySelector = e => {
    if (e.target.value === 'INR') {
      setCurrency({
        name: 'inr',
        symbol: '₹'
      })
    } else if (e.target.value === 'USD') {
      setCurrency({
        name: 'usd',
        symbol: '$'
      })
    }
  }


  function inputHandler(e) {
    const val = e.target.value.trim().toLowerCase()


    const coins = allCoins.filter(coin => coin.name.toLowerCase().includes(val))
    setDisplayCoins(coins)


  }
  const navigate = useNavigate();


  function preventSubmit(e) {
    e.preventDefault()
    navigate('/')
  }


  return (
    <div className='text-white flex flex-col md:flex-row justify-between items-center w-full bg-stone-900 px-4 py-3 gap-3 md:gap-0 shadow-xl fixed top-0 left-0 z-50'>
      {/* Logo */}
      <Link to={'/'} className=' text-4xl m-2 bg-stone-900 p-3 rounded-2xl cursor-pointer'>
        Crypto Tracker
      </Link>


      {/* Right Side */}
      <div className='flex justify-around gap-3 sm:gap-5 items-center w-full md:w-auto'>
        {/* Search Input */}
        <form
          onSubmit={preventSubmit}
          className='w-full sm:w-[250px] md:w-[330px] shadow-2xl'
        >
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
              >
                <path
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  strokeWidth={2}
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  stroke='currentColor'
                />
              </svg>
            </div>
            <input
              onChange={inputHandler}
              required
              placeholder='Search'
              className='block w-full p-3 ps-10 text-base md:text-lg text-gray-900 border border-gray-300 shadow-2xl rounded-lg bg-stone-900 
                                       focus:ring-blue-500 focus:border-blue-500 outline-none 
                                       dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              type='search'
            />
            <button
              className='absolute end-2.5 bottom-1/2 translate-y-1/2 p-2 md:p-3 text-sm font-medium text-white 
                                           bg-blue-700 rounded-lg hover:bg-blue-800 
                                           focus:ring-4 focus:outline-none focus:ring-blue-300'
            >
              <svg
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                className='w-4 h-4'
              >
                <path
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  strokeWidth={2}
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  stroke='currentColor'
                />
              </svg>
            </button>
          </div>
        </form>


        {/* Currency Selector */}
        <div className='relative inline-flex items-center px-3 py-1 border border-gray-900 bg-stone-700 rounded-xl w-20 shadow-2xl h-11'>
          <select
            onChange={currencySelector}
            className='appearance-none bg-transparent focus:outline-none text-sm md:text-base text-gray-100 w-full'
          >
            <option value='USD' className='bg-stone-800'>
              USD
            </option>
            <option value='INR' className='bg-stone-800'>
              INR
            </option>
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            className='w-4 h-4 ml-2 text-gray-400 absolute right-2 pointer-events-none'
          >
            <path
              d='M19 9l-7 7-7-7'
              strokeWidth={2}
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </div>
      
    </div>
  )
}


export default Navbar
