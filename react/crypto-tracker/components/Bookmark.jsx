import React from 'react'
import useCoins from '../context/CoinContext'
import { Link } from 'react-router-dom';

function Bookmark() {
const { currency, themeMode } = useCoins();  const saved = localStorage.getItem('bookmarkedCoins');
  const bookmarkedCoins = saved?JSON.parse(saved):[]

  
  console.log(themeMode);
  
  return (
    <div >
      <h3
      className={`h-fit font-stretch-ultra-expanded text-xl p-1 rounded ${themeMode?'bg-gray-500':'bg-amber-100'} w-fit m-auto`}
      >BOOKMARK</h3>

      {bookmarkedCoins.map((item, index)=>(
        <Link
          to={`/coins/${item.id}`}
          key={index}
          className={`grid grid-cols-[0.5fr_minmax(0,2fr)_1fr_1fr_1.5fr] gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 ${themeMode ? 'bg-gray-700 border-neutral-950 text-white hover:bg-gray-600' : 'bg-white border-lime-200 text-black hover:bg-lime-50'} transition-colors min-w-0`}
        >
         
          {/* Coin Info */}
          <div className="flex items-center gap-2 min-w-0">
            <img className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0" src={item.image} alt={item.name} />
            <p className="font-medium min-w-0 truncate">
              {item.name} <span className="uppercase text-xs text-gray-400 ml-1">({item.symbol})</span>
            </p>
          </div>

          {/* Price */}
          <p className="whitespace-nowrap text-right">
            {currency.symbol}{item.current_price?.toLocaleString()}
          </p>

          {/* 24H Change */}
          <p className={`whitespace-nowrap text-right font-semibold ${item.price_change_percentage_24h >= 0 ? 'text-lime-500' : 'text-orange-500'}`}>
            {item.price_change_percentage_24h?.toFixed(2)}%
          </p>

         
        </Link>
      ))}
      
    </div>
  )
}

export default Bookmark 