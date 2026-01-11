import { useState } from 'react';
import useCoins from '../context/CoinContext'
import { Link } from 'react-router-dom';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const { currency, displayCoins, themeMode } = useCoins();

  const startIndex = (currentPage - 1) * itemsPerPage
  const totalPages = Math.ceil(displayCoins.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  
  return (
    <div className="max-w-7xl mx-auto px-2 overflow-x-auto pt-0 md:pt-15 lg:pt-0">

      {/* Header Row */}
      <div className={`grid grid-cols-[0.5fr_minmax(0,2fr)_1fr_1fr_1.5fr] gap-2 p-2 rounded-t-2xl items-center border-b ${themeMode ? 'bg-stone-700 text-white border-neutral-700' : 'bg-lime-100 text-gray-900 border-lime-200'} text-xs sm:text-sm lg:text-base font-bold`}>
        <p>#</p>
        <p>Coins</p>
        <p className="text-right">Price</p>
        <p className="text-right">24H Change</p>
        <p className="text-right">Market Cap</p>
      </div>

      {displayCoins.slice(startIndex, (startIndex + itemsPerPage)).map((item, index) => (
        <Link
          to={`/coins/${item.id}`}
          key={item.id}
          className={`grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 ${themeMode ? 'bg-gray-700 border-neutral-950 text-white hover:bg-gray-600' : 'bg-white border-lime-200 text-black hover:bg-lime-50'} transition-colors min-w-0`}
        >
          {/* Rank */}
          <p className="text-sm">{item.market_cap_rank}</p>

          {/* Coin Info */}
          <div className="flex items-center gap-2">
            <img className="w-7 h-7 sm:w-9 sm:h-9" src={item.image} alt={item.name} />
            <p className="font-medium ">
              {item.name} <span className="uppercase text-xs text-gray-400 ml-1">({item.symbol})</span>
            </p>
          </div>

          {/* Price */}
          <p className="whitespace-nowrap text-right">
            {currency.symbol}{item.current_price.toLocaleString()}
          </p>

          {/* 24H Change */}
          <p className={`whitespace-nowrap text-right font-semibold ${item.price_change_percentage_24h >= 0 ? 'text-lime-500' : 'text-orange-500'}`}>
            {item.price_change_percentage_24h.toFixed(2)}%
          </p>

          {/* Market Cap */}
          <p className="whitespace-nowrap text-right min-w-0 truncate shrink-0">
            {currency.symbol}{item.market_cap.toLocaleString()}
          </p>
        </Link>
      ))}

      {/* pagination */}
      <div className='flex justify-center items-center gap-1 sm:gap-2 m-2'>
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`
      ${themeMode ? 'bg-gray-500' : 'bg-green-100'} 
      ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      px-2 py-1 sm:px-7 sm:py-2 
      rounded-lg text-xs sm:text-base
    `}
        >
          ←
        </button>

        {/* Page Numbers */}
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`
        ${page === currentPage
                ? themeMode ? 'bg-gray-700 font-bold' : 'bg-green-300 font-bold'
                : themeMode ? 'bg-gray-500' : 'bg-green-100'
              }
        cursor-pointer px-2 py-1 sm:px-4 sm:py-2 
        rounded-lg text-xs sm:text-base
        min-w-[1.75rem] sm:min-w-[2.5rem]
      `}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`
      ${themeMode ? 'bg-gray-500' : 'bg-green-100'} 
      ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      px-2 py-1 sm:px-7 sm:py-2 
      rounded-lg text-xs sm:text-base
    `}
        >
          →
        </button>
      </div>



    </div>

  )
}

export default Home