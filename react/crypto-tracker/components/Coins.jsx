import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useCoins from '../context/CoinContext'
import LineChartComponent from './LineChartComponent'



export default function Coins() {

    const { coinId } = useParams()
    const [coinData, setCoinData] = useState('null')
    const [historicalCoinData, setHistoricalCoinData] = useState()
    const { currency, displayCoins, themeMode, setBookmarkedCoins, bookmarkedCoins } = useCoins()

    const coin = displayCoins.find(({ id }) => id === coinId);
    const coinPrice = coin ? coin.current_price : null;

    async function fetchCoinData() {
        try {
            const res = await fetch(`/api/coins/${coinId}`, {
                headers: {
                    accept: "application/json",
                    'x-cg-api-key': import.meta.env.VITE_CRYPTO_KEY,
                },
            });


            const data = await res.json()
            setCoinData(data)
        } catch (err) {
            console.error(err)
        }
    }


    async function fetchHistoricalData() {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_CRYPTO_KEY }
        };


        fetch(`/api/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7`)
            .then(res => res.json())
            .then(res => setHistoricalCoinData(res))
            .catch(err => console.error(err));


    }
    const [isBookmarkChecked, setIsBookmarkChecked] = useState(false)

    // for bookmark 
    function bookmarkHandler(e) {
        const isChecked = e.target.checked;
        setBookmarkedCoins((prev) => {
            const isCoinExists = prev.some(coin => coin.id === coinId);
            if (isChecked && !isCoinExists) {
                return [...prev, coinData]
            }
            else if (!isChecked && isCoinExists) return prev.filter(coin => coin.id !== coinId)

            return prev
        })
        
        
    }
    useEffect(() => {
  const exists = bookmarkedCoins.some(coin => coin.id === coinId)
  if (exists !== isBookmarkChecked) {
    setIsBookmarkChecked(exists)
  }
}, [bookmarkedCoins, coinId, isBookmarkChecked])
    

   
    

    useEffect(() => {
        fetchCoinData()
        fetchHistoricalData()


    }, [coinId, currency])

    return (
        <div className={`min-h-screen pt-4 sm:pt-0 ${themeMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-stone-900'} pb-8 transition-colors duration-300`}>

            <div className='flex justify-items-start gap-2 mx-2'>
                <Link to={'/'} className='cursor-pointer text-blue-600'>
                    Market
                </Link>
                /
                <p className='cursor-pointer '>
                    {coinId.toString().toLocaleUpperCase()}
                </p>
            </div>

            <div className={`flex justify-between m-6 flex-wrap items-center shadow-md p-4 rounded-md ${themeMode ? 'bg-gray-700' : 'bg-emerald-50 text-black'} px-6`}>

                <div className='flex items-center'>
                    <div className='flex items-center flex-col'>
                        <h1 className='text-4xl m-0.5'>
                            {coinId.toString().toLocaleUpperCase()}
                        </h1>
                        <p className='ml-1 text-xl font-bold'> {coinData.symbol}</p>
                    </div>
                    <div className='ml-4 w-20 h-20'>
                        <img src={coinData?.image?.large} alt='' />
                    </div>
                </div>

                {/* bookmark  */}
                <label
                    className='flex items-center gap-2 cursor-pointer'>
                    <span className={`font-semibold ${themeMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        SAVE
                    </span>
                    <input
                        onChange={bookmarkHandler}
                        checked={isBookmarkChecked}
                        type='checkbox'
                        className='peer hidden'
                    />
                    <svg
                        className={`size-7 transition-all duration-200 cursor-pointer active:scale-90 ${themeMode
                            ? 'fill-none stroke-cyan-400 peer-checked:fill-cyan-400 peer-checked:stroke-cyan-400'
                            : 'fill-none stroke-emerald-500 peer-checked:fill-emerald-500 peer-checked:stroke-emerald-500'
                            }`}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                    >
                        <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                    </svg>
                </label>

            </div>
            <p className={`mx-6 ${themeMode ? 'bg-gray-700 text-white' : 'bg-emerald-50 text-black'} font-semibold p-2 rounded-md shadow text-lg`}>
                {coinData?.description?.en}
            </p>
            <div className='m-6'>
                <p className='text-4xl'>{currency.name === 'usd' ? `$${coinPrice?.toLocaleString()}` : `₹${coinPrice?.toLocaleString()}`}</p>
                <div className='flex justify-start '>
                    <p className='mr-2'>Last 7 days </p>


                    <p className='inline-block text-green-600'>{coinData?.market_data?.price_change_percentage_7d > 0 ? '+' : ''} </p>
                    <p className={coinData?.market_data?.price_change_percentage_7d > 0 ? 'text-green-600' : 'text-red-600'}>  {coinData?.market_data?.price_change_percentage_7d}</p>


                </div>
            </div>

            {/* chart */}
            <div className={`m-6 rounded-xl shadow-lg ${themeMode ? 'bg-slate-700' : 'bg-lime-50'}`}>
                {historicalCoinData ? (
                    <LineChartComponent historicalCoinData={historicalCoinData} />
                ) : (
                    <p className={`text-center py-8 ${themeMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Loading chart...
                    </p>
                )}
            </div>

            {/* coin Stats */}
            <div className={`m-6 ${themeMode ? 'bg-gray-700 text-white' : 'bg-emerald-50 text-black'} p-4 rounded-md shadow text-center text-2xl font-bold`}>
                <h2> {coinId?.toString().charAt(0).toUpperCase() + coinId?.toString().slice(1)} Stats  </h2>
            </div>

            {/* comparison table info */}

            <div className={`grid grid-cols-2 gap-4 text-center m-6 ${themeMode ? 'bg-gray-700' : 'bg-emerald-50'} p-4 rounded-md shadow text-lg place-items-center`}>
                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Market Cap</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {currency.name == 'usd' ? '$' : '₹'} {coinData?.market_data?.market_cap[currency.name.toLowerCase()].toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Current Price</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {currency.name == 'usd' ? '$' : '₹'} {coinData?.market_data?.current_price[currency.name.toLowerCase()].toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Price Change in 30 days</h3>
                    <p className={`${coinData?.market_data?.price_change_percentage_30d > 0 ? "text-green-600" : "text-red-600"}`}>
                        {coinData?.market_data?.price_change_percentage_30d.toFixed(2) > 0 ? '+' : ''} {coinData?.market_data?.price_change_percentage_30d.toFixed(2)}%
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Total Supply</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {currency.name == 'usd' ? '$' : '₹'} {coinData?.market_data?.total_volume[currency.name.toLowerCase()].toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Max Supply</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {coinData?.market_data?.max_supply ? `${((currency.name == 'usd') ? '$' : '₹')} ${coinData.market_data.max_supply.toLocaleString()}` : 'N/A'}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Full Diluted Valuation</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {coinData?.market_data?.fully_diluted_valuation[currency.name.toLowerCase()] ? ` ${((currency.name == 'usd') ? '$' : '₹')} ${coinData.market_data?.fully_diluted_valuation[currency.name.toLowerCase()].toLocaleString()} ` : 'N/A'}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>High (24Hr)</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {currency.name == 'usd' ? '$' : '₹'} {coinData?.market_data?.high_24h[currency.name.toLowerCase()].toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded">
                    <h3 className={`font-semibold mb-2 ${themeMode ? 'text-white' : 'text-black'}`}>Low (24Hr)</h3>
                    <p className={themeMode ? 'text-white' : 'text-black'}>
                        {currency.name == 'usd' ? '$' : '₹'} {coinData?.market_data?.low_24h[currency.name.toLowerCase()].toLocaleString()}
                    </p>
                </div>
            </div>



        </div>
    )
}
