import useCoins from '../context/CoinContext'
import { Link } from 'react-router-dom';



function Home() {
  const {  currency , displayCoins  } = useCoins();
  
  
 
  return (
    <div className="max-w-6xl mx-auto px-2">
      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] p-4 rounded-t-2xl items-center border-b bg-stone-800 text-sm sm:text-base font-bold">
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
          className="grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 bg-neutral-700 border-b-neutral-950"
        >
          {/* Rank */}
          <p className="hidden sm:block">{item.market_cap_rank}</p>


          {/* Coin Info */}
          <div className="flex items-center gap-2">
            <img className="w-7 h-7 sm:w-9 sm:h-9" src={item.image} alt="img" />
            <p className="font-medium">
              {item.name} <span className="uppercase ">({item.symbol})</span>
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
