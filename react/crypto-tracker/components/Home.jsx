import useCoins from '../context/CoinContext'
import { Link } from 'react-router-dom';

function Home() {
  const {  currency , displayCoins, themeMode  } = useCoins();
  

  // fix css for smaller devices

  return (
    <div className="max-w-7xl mx-auto px-2">
      {/* Header Row */}
      <div className={`hidden sm:grid sm:grid-cols-3 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] gap-2 lg:gap-0 p-2 sm:p-4 rounded-t-2xl items-center border-b ${themeMode ? 'bg-slate-800 text-white border-stone-700' : 'bg-lime-100 text-gray-900 border-lime-200'} text-xs sm:text-sm lg:text-base font-bold`}>

        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p>24H Change</p>
        <p className="text-right">Market Cap</p>
      </div>

      {displayCoins.slice(0, 10).map((item, index) => (
        <Link
          to={`/coins/${item.id}`}
          key={index}
          className={`grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 ${themeMode ? 'bg-gray-800 border-neutral-950 text-white hover:bg-gray-600' : 'bg-white border-lime-200 text-black hover:bg-lime-50'} transition-colors`}
        >
          {/* Rank */}
          <p className="hidden sm:block">{item.market_cap_rank}</p>

          {/* Coin Info */}
          <div className="flex items-center gap-2">
            <img className="w-7 h-7 sm:w-9 sm:h-9" src={item.image} alt="img" />
            <p className="font-medium">
              {item.name} <span className="uppercase">({item.symbol})</span>
            </p>
          </div>

          {/* Price */}
          <p>
            {currency.symbol}
            {item.current_price.toLocaleString()}
          </p>

          {/* 24H Change */}
          <p
            className={`${
              item.price_change_percentage_24h.toFixed(2) >= 0
                ? "text-lime-500"
                : "text-orange-500"
            } font-semibold`}
          >
            {item.price_change_percentage_24h.toFixed(2)}%
          </p>

          {/* Market Cap */}
          <p className="text-right hidden sm:block">
            {currency.symbol}
            {item.market_cap.toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default Home