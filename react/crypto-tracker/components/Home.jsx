import React from 'react'
import useCoins from '../context/CoinContext'

function Home() {
  const { allCoins, currency } = useCoins()

  return (
    <div className="max-w-6xl mx-auto px-2">
      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] p-4 rounded-t-2xl items-center border-b mt-5 bg-gradient-to-r from-blue-200 to-cyan-200 text-black text-sm sm:text-base">
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p>24H Change</p>
        <p className="text-right">Market Cap</p>
      </div>

      {allCoins.slice(0, 10).map((item, index) => (
        <div
          key={index}
          className="grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 bg-gradient-to-r from-blue-200 to-amber-200 text-black"
        >
          {/* Rank */}
          <p className="hidden sm:block">{item.market_cap_rank}</p>

          {/* Coin Info */}
          <div className="flex items-center gap-2">
            <img className="w-7 h-7 sm:w-9 sm:h-9" src={item.image} alt="img" />
            <p className="font-medium">
              {item.name} <span className="uppercase text-gray-600">({item.symbol})</span>
            </p>
          </div>

          {/* Price */}
          <p>
            {currency.symbol}
            {item.current_price.toLocaleString()}
          </p>

          {/* 24H Change */}
          <p
            className={`font-semibold ${
              item.price_change_percentage_24h.toFixed(2) >= 0
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {item.price_change_percentage_24h.toFixed(2)}%
          </p>

          {/* Market Cap */}
          <p className="text-right hidden sm:block">
            {currency.symbol}
            {item.market_cap.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Home
