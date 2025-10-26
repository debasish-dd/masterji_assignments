import { useState } from 'react'
import useCoins from '../context/CoinContext'
import { Link, useNavigate, Outlet } from 'react-router-dom'


function Navbar() {
  const { setCurrency, setDisplayCoins, allCoins, themeMode, setThemeMode } = useCoins()
  const [open, setOpen] = useState(false)

  const linkClasses = `px-3 py-2 rounded-lg font-medium transition hover:opacity-90 text-sm sm:text-base cursor-pointer`;

  const themeHandler = e => {
    setThemeMode(e.target.checked)
  }

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
    <nav
      className={`flex flex-row flex-wrap md:flex-row justify-around items-center w-full ${themeMode ? 'bg-neutral-800' : 'bg-emerald-50'
        }  md:px-6 py-4  md:gap-6 shadow-lg fixed top-0 left-0 z-50 `}
    >


      {/* Logo */}
      <Link
        // onClick={}
        to={'/'}
        className="">
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="40" viewBox="0 0 180 40" role="img" aria-labelledby="title" className="hover:opacity-80 transition-opacity">
          <title id="title">Crypto Tracker logo</title>

          {/* Gradients */}
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#12c2e9" />
              <stop offset="1" stopColor="#405de6" />
            </linearGradient>
            <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Circular emblem */}
          <g transform="translate(6,6)" filter="url(#f1)">
            <circle cx="14" cy="14" r="14" fill="url(#g1)" />
            {/* Simplified line-chart icon */}
            <polyline
              points="6,18 9,13 13,15 18,9 22,11"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="22" cy="11" r="1.5" fill="#ffffff" />
          </g>

          {/* Text */}
          <text x="46" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700" fill={themeMode ? '#ffffff' : '#064e3b'}>
            Crypto Tracker
          </text>
        </svg>
      </Link>

      <div className=' justify-evenly gap-5 hidden md:flex'>
        <Link to="/" className={`${linkClasses} ${themeMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-100 hover:bg-emerald-200'}`}>Home</Link>
        <Link to="/compare" className={`${linkClasses} ${themeMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-100 hover:bg-emerald-200'}`}>Compare</Link>
        <Link to="/bookmark" className={`${linkClasses} ${themeMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-100 hover:bg-emerald-200'}`}>Bookmark</Link>
      </div>

      <button
        onClick={() => { setOpen((prev) => !prev) }}
        className="w-9 h-10 flex flex-col justify-center items-center gap-1 cursor-pointer md:hidden"
      >
        <span className={`block w-6 h-[2px] rounded-sm transition-all duration-300 ${themeMode ? 'bg-white' : 'bg-black'} ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
        <span className={`block w-6 h-[2px] rounded-sm transition-all duration-300 ${themeMode ? 'bg-white' : 'bg-black'} ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-[2px] rounded-sm transition-all duration-300 ${themeMode ? 'bg-white' : 'bg-black'} ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
      </button>

      {open && (
        <div className={`absolute top-full left-0 w-full flex flex-col items-center ${themeMode? 'dark:bg-gray-800' : 'bg-lime-50'} md:hidden py-2 gap-2 shadow-lg z-50`}>
          <Link to="/" className={`${linkClasses} ${themeMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-100 hover:bg-emerald-200'} w-25 text-center`} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/compare" className={`${linkClasses} ${themeMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-100 hover:bg-emerald-200'} w-25 text-center`} onClick={() => setOpen(false)}>Compare</Link>
          <Link to="/bookmark" className={`${linkClasses} ${themeMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-100 hover:bg-emerald-200'} w-25 text-center`} onClick={() => setOpen(false)}>Bookmark</Link>
        </div>
      )}

      <div className='flex flex-row justify-center items-center gap-3 sm:gap-4 w-full md:w-auto'>
        {/* Search Input */}
        <form
          onSubmit={preventSubmit}
          className='flex-1 max-w-md md:max-w-sm mx-2'
        >
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                className={`w-4 h-4 ${themeMode ? 'text-gray-400' : 'text-gray-500'}`}
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
              placeholder='Search coins...'
              className={`block w-full py-2.5 pl-10 pr-20 text-sm ${themeMode ? 'text-white bg-gray-700 border-gray-600 placeholder-gray-400' : 'text-gray-900 bg-white border-gray-300 placeholder-gray-500'} border rounded-lg focus:ring-2 ${themeMode ? 'focus:ring-cyan-500 focus:border-cyan-500' : 'focus:ring-emerald-500 focus:border-emerald-500'} outline-none transition-all`}
              type='search'
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white rounded-md ${themeMode ? 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500' : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'} focus:ring-2 focus:outline-none transition-colors`}
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
        <div className={`relative inline-flex items-center px-3 py-2.5 border ${themeMode ? 'border-gray-600 bg-gray-700' : 'border-emerald-300 bg-white'} rounded-lg shadow-sm hover:shadow-md transition-shadow`}>
          <select
            onChange={currencySelector}
            className={`appearance-none bg-transparent focus:outline-none text-sm font-medium ${themeMode ? 'text-gray-100' : 'text-gray-700'} pr-6 cursor-pointer`}
          >
            <option value='USD' className={themeMode ? 'bg-gray-700' : 'bg-white'}>
              USD
            </option>
            <option value='INR' className={themeMode ? 'bg-gray-700' : 'bg-white'}>
              INR
            </option>
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            className={`w-4 h-4 absolute right-2 pointer-events-none ${themeMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <path
              d='M19 9l-7 7-7-7'
              strokeWidth={2}
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </svg>
        </div>

        {/* Theme Toggle */}
        <label className="relative h-8 w-14 cursor-pointer flex-shrink-0" htmlFor="switch">
          <input
            onChange={themeHandler}
            defaultChecked={true}
            className="peer sr-only"
            id="switch"
            type="checkbox"
          />
          <span className={`absolute inset-0 rounded-full ${themeMode ? 'bg-gray-600' : 'bg-gray-300'} transition-colors`} />
          <span className={`absolute top-1 left-1 w-6 h-6 rounded-full ${themeMode ? 'bg-cyan-500' : 'bg-white'} shadow-md transition-all peer-checked:translate-x-6`}>
            {themeMode ? (
              <svg className="w-4 h-4 text-white absolute top-1 left-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-yellow-500 absolute top-1 left-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </span>
        </label>
      </div>
    </nav>
  )
}


export default Navbar