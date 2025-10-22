import React, { useEffect, useState } from 'react'
import useCoins from '../context/CoinContext'

function Compare() {

    const { themeMode, displayCoins } = useCoins()
    const [showPopup, setShowPopup] = useState(false)
    const [coinsAvailable, setCoinsAvailable] = useState(true)
    const [popupCoins, setPopupCoins] = useState(displayCoins)
    const [coin1, setCoin1] = useState(null)
    const [coin2, setCoin2] = useState(null)
    const [activeCoins, setActiveCoins] = useState(null)


    function popUpHandler() {
        setShowPopup(false)
    }

    function addBtnHandler(slotNumber) {
        setActiveCoins(slotNumber)
        setShowPopup(true)

    }
    function inputHandler(e) {
        const val = e.target.value.trim().toLowerCase()
        const coins = displayCoins.filter(coin => coin.name.toLowerCase().includes(val))
        setPopupCoins(coins)

    }
    const coinSelector = (item) => {

        setShowPopup(false)
        if (activeCoins === 1) {
            setCoin1(item);
        } else if (activeCoins === 2) {
            setCoin2(item);
        }
    }
    const coinCloseHandler = (slotNumber) => {

        if (slotNumber === 1) {
            setCoin1(null)
        } else if (slotNumber === 2) {
            setCoin2(null)
        }
    }
    useEffect(() => {
        setPopupCoins(displayCoins)
    }, [])
    useEffect(() => {
        (popupCoins.length > 0) ? setCoinsAvailable(true) : setCoinsAvailable(false);
    }, [popupCoins])

    return (
        <div>
            <div
                className={`flex justify-around flex-wrap items-center gap-3 
                ${themeMode ? 'bg-gray-600' : 'bg-lime-200'} 
                p-3 mt-8 sm:mt-8 md:mt-12 lg:mt-6 rounded-2xl sm:mx-0 md:mx-3 lg:mx-6`}
            >


                <CoinSlot coin={coin1} handler={addBtnHandler} onRemove={coinCloseHandler} slotNumber={1} themeMode={themeMode} />

                <span className="md:hidden border-t border-gray-400 w-full" />


                <CoinSlot coin={coin2} handler={addBtnHandler} onRemove={coinCloseHandler} slotNumber={2} themeMode={themeMode} />

            </div>
            {showPopup && (<div
                className={`${themeMode ? "bg-black/30" : "bg-white/30"
                    } backdrop-blur-sm flex items-center justify-center fixed inset-0 z-50`}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={popUpHandler}
                    aria-label="Close"
                    className="absolute top-6 right-8 bg-white dark:bg-gray-600 text-gray-400 hover:text-gray-300 dark:text-gray-500 dark:hover:text-white rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 cursor-pointer"
                >
                    <svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>

                {/* Popup */}
                <div
                    className={`${themeMode ? "bg-cyan-950" : "bg-emerald-100"
                        } p-2 rounded-lg w-[550px] h-[500px] shadow-lg overflow-y-auto`}
                >
                    {/* search bar */}
                    <div className="flex items-center border w-80 focus-within:border-indigo-500 transition duration-300 mt-2 pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden m-auto mb-2">
                        <input
                            type="text"
                            onChange={inputHandler}
                            placeholder="Search for products" className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm text-black" />
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={22} height={22} viewBox="0 0 30 30" fill="#6B7280">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                        </svg>
                    </div>

                    {coinsAvailable ? (
                        popupCoins.slice(0, 10).map((item) => (
                            <div
                                key={item.id}
                                onClick={() => coinSelector(item)}
                                className={`${themeMode
                                    ? "bg-cyan-700 hover:bg-gray-500/40 text-white"
                                    : "bg-emerald-800 text-white hover:bg-emerald-600"
                                    } p-3 rounded shadow-lg flex items-center gap-3 cursor-pointer transition-colors duration-200 m-0.5`}
                            >
                                <img
                                    className='w-8 h-8'
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    {item.symbol && (
                                        <p className="text-xs opacity-75">{item.symbol.toUpperCase()}</p>
                                    )}
                                </div>
                                {item.current_price && (
                                    <p className="text-sm font-semibold">
                                        ${item.current_price.toLocaleString()}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className='text-center m-5 p-5 font-semibold'>No coins available</p>
                    )}


                </div>
            </div>)}
            <button className={`${themeMode ? "bg-gray-600 hover:bg-gray-700" : "bg-emerald-600 hover:bg-emerald-700" } block mt-2 p-3 w-50 h-fit m-auto rounded-lg font-semibold text-white`}>
                Compare
            </button>
        </div>
    )
}

function CoinSlot({ coin, handler, onRemove, slotNumber, themeMode }) {
    if (!coin) {
        return (<button
            onClick={() => handler(slotNumber)}
            title="Add New"
            className="group cursor-pointer outline-none hover:rotate-90 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" />
                <path d="M8 12H16" strokeWidth="1.5" />
                <path d="M12 16V8" strokeWidth="1.5" />
            </svg>
        </button>)
    } else return (
        <div className="relative w-full sm:max-w-[285px] mx-auto">
            <button
                onClick={() => onRemove(slotNumber)}
                className="absolute bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200 -top-2 -right-1 cursor-pointer"
                title="Remove coin"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div
                key={coin.id}
                onClick={() => coinSelector(coin)}
                className={`${themeMode
                    ? "bg-cyan-700 text-white"
                    : "bg-emerald-800 text-white"
                    } 
  flex items-center gap-4 p-3 rounded-xl shadow-md
  transition-colors duration-200 w-full sm:max-w-[280px] mx-auto`}
            >
                <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-10 h-10 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                />

                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <p className="font-semibold truncate">{coin.name}</p>
                    {coin.symbol && (
                        <p className="text-xs opacity-70 truncate">
                            {coin.symbol.toUpperCase()}
                        </p>
                    )}
                </div>
            </div>

        </div>
    )

}

export default Compare