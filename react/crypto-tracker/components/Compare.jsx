import React, { useState } from 'react'
import useCoins from '../context/CoinContext'

function Compare() {

    const { themeMode } = useCoins()
    const [showPopup, setShowPopup] = useState(false)

    const { displayCoins } = useCoins()

    function popUpHandler() {
        setShowPopup(false)
    }

    function addBtnHanfler(e) {
        setShowPopup(true)
    }


    return (
        <div>
            <div className={`flex justify-around items-center gap-3 ${themeMode ? 'bg-gray-600' : 'bg-lime-200'} m-6 p-6 rounded-2xl`}>
                <button
                    title="Add New"
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" />
                        <path d="M8 12H16" strokeWidth="1.5" />
                        <path d="M12 16V8" strokeWidth="1.5" />
                    </svg>
                </button>
                <span className=' border border-t-80' />

                <button
                    onClick={addBtnHanfler}
                    title="Add New"
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" />
                        <path d="M8 12H16" strokeWidth="1.5" />
                        <path d="M12 16V8" strokeWidth="1.5" />
                    </svg>
                </button>

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
                    className="absolute top-6 right-8 bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-300"
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
                        <input type="text" placeholder="Search for products" className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm text-black" />
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={22} height={22} viewBox="0 0 30 30" fill="#6B7280">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                        </svg>
                    </div>

                    {(displayCoins.slice(0, 10)).map((item, ind) => {
                        return (<div
                            key={item.id}
                            className={`${themeMode ? "bg-cyan-700" : "bg-emerald-800 text-white"
                                } p-2 rounded shadow-lg m-0.5 flex justify-between `}>

                            <div className='w-6 h-5'>
                                <img src={item.image} alt={item.id} srcset="" />
                            </div>
                            <p>{item.name}</p>

                        </div>)
                    })}


                </div>
            </div>)}

        </div>
    )
}

export default Compare