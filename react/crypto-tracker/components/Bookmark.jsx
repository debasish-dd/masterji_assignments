import React from 'react'
import useCoins from '../context/CoinContext'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Bookmark() {
  const { themeMode, bookmarkedCoins, setBookmarkedCoins } = useCoins();


  function deleteBtnHandler(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedCoins((prev) => (
      prev.filter(coin => coin.id !== id)
    ))
  }

  return (
    <div >
      <h3
        className={`h-fit font-stretch-ultra-expanded text-xl p-1 rounded ${themeMode ? 'bg-gray-500' : 'bg-amber-100'} w-fit m-auto mb-3`}
      >BOOKMARK</h3>

      {bookmarkedCoins.length === 0 ? (
        <p className={`text-center mt-4 ${themeMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No bookmarks saved.
        </p>
      ) : (bookmarkedCoins.map((item) => (
        <Link
          to={`/coins/${item.id}`}
          key={item.id}
          className={`flex justify-between rounded mx-6 gap-3 items-center border-b text-sm sm:text-base p-3 sm:px-4 ${themeMode ? 'bg-gray-700 border-neutral-950 text-white hover:bg-gray-600' : 'bg-white border-lime-200 text-black hover:bg-lime-50'} transition-colors min-w-0`}
        >

          {/* Coin Info */}
          <div className="flex items-center gap-3">
            <img className="w-7 h-7 sm:w-9 sm:h-9" src={item?.image?.small} alt={item.name} />
            <p className="font-medium min-w-0 truncate">
              {item?.name} <span className="uppercase text-xs text-gray-400 ml-1">({item?.symbol})</span>
            </p>
          </div>



          <button
            onClick={(e)=>deleteBtnHandler(e,item.id)}
            
            className={` p-2 rounded-lg cursor-pointer ${themeMode ? 'text-white bg-gray-800 hover:bg-gray-700' : 'text-black bg-emerald-200 hover:bg-emerald-300 font-semibold'}`}>
            Delete
          </button>
        </Link>
      )))
      }



    </div>
  )
}

export default Bookmark 