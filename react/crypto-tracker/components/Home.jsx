import useCoins from '../context/CoinContext'
import { Link } from 'react-router-dom';

function Home() {
  const {  currency , displayCoins, themeMode  } = useCoins();
  



  return (
    <div className="max-w-7xl mx-auto px-2 overflow-x-auto">
    {/* Header Row */}
    <div className={`grid grid-cols-[0.5fr_minmax(0,2fr)_1fr_1fr_1.5fr] gap-2 p-2 rounded-t-2xl items-center border-b ${themeMode ? 'bg-stone-700 text-white border-neutral-700' : 'bg-lime-100 text-gray-900 border-lime-200'} text-xs sm:text-sm lg:text-base font-bold`}>
      <p>#</p>
      <p>Coins</p>
      <p className="text-right">Price</p>
      <p className="text-right">24H Change</p>
      <p className="text-right">Market Cap</p>
    </div>

    {displayCoins.slice(0, 10).map((item, index) => (
      <Link
        to={`/coins/${item.id}`}
        key={index}
        className={`grid grid-cols-[0.5fr_minmax(0,2fr)_1fr_1fr_1.5fr] gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 ${themeMode ? 'bg-gray-700 border-neutral-950 text-white hover:bg-gray-600' : 'bg-white border-lime-200 text-black hover:bg-lime-50'} transition-colors min-w-0`}
      >
        {/* Rank */}
        <p className="text-sm">{item.market_cap_rank}</p>

        {/* Coin Info */}
        <div className="flex items-center gap-2 min-w-0">
          <img className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0" src={item.image} alt={item.name} />
          <p className="font-medium min-w-0 truncate">
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
        <p className="whitespace-nowrap text-right">
          {currency.symbol}{item.market_cap.toLocaleString()}
        </p>
      </Link>
    ))}
  </div>



  )
}

export default Home