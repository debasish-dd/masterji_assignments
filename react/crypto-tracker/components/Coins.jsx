import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useCoins from '../context/CoinContext'
import LineChart from './LineChartComponent'
import LineChartComponent from './LineChartComponent'

//now have to add the chart
export default function Coins() {


    const { coinId } = useParams()
    const [coinData, setCoinData] = useState('null')
    const [historicalCoinData, setHistoricalCoinData] = useState()
    const { currency, displayCoins } = useCoins()


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


    useEffect(() => {
        fetchCoinData()
        fetchHistoricalData()

    }, [coinId, currency])






    return (
        <div className='mt-26'>
            <div className='flex justify-items-start gap-2 mx-2'>
                <Link to={'/'} className='cursor-pointer text-lime-400'>
                    Market
                </Link>
                /
                <p className='cursor-pointer '>
                    {coinId.toString().toLocaleUpperCase()}
                </p>
            </div>
            <div className='flex justify-between m-6 items-center shadow-md p-4 rounded-md bg-neutral-700 px-6'>
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
                <label>
                    <input type='checkbox' defaultChecked className='peer hidden' />
                    <div className='group flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white fill-none p-2 px-3 font-extrabold text-white transition-all active:scale-90 peer-checked:fill-stone-500 peer-checked:hover:text-black'>
                        <div className='z-10 transition group-hover:translate-x-4'>
                            SAVE
                        </div>
                        <svg
                            className='size-6 transition group-hover:-translate-x-6 group-hover:-translate-y-3 group-hover:scale-[750%] duration-500'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                            />
                        </svg>
                    </div>
                </label>
            </div>
            <p className='mx-6 bg-neutral-700 p-2 rounded-md shadow text-lg'>
                {coinData?.description?.en}
            </p>
            <div className='m-6'>
                <p className='text-4xl'>{currency.name === 'usd' ? `$${coinPrice?.toLocaleString()}` : `₹${coinPrice?.toLocaleString()}`}</p>
                <div className='flex justify-start'>
                    <p className='mr-2'>Last 7 days </p>
                    <p> +2.3%</p>
                </div>
            </div>

            {/* chart */}
            <div className='m-6 bg-gray-800 rounded-xl shadow w-100%'>
                {historicalCoinData ? (
                    <LineChartComponent historicalCoinData={historicalCoinData} />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>

            {/* coin Stats */}
            <div className='m-6 bg-neutral-700 p-4 rounded-md shadow text-center text-2xl font-bold'>
                <h2> {coinId?.toString().charAt(0).toUpperCase() + coinId?.toString().slice(1)} Stats  </h2>
            </div>

                {/* comparison table info */}


            <div className="grid grid-cols-5 grid-rows-5 gap-4 text-center m-6 bg-neutral-700 p-4 rounded-md shadow text-lg">
                <div >
                    <h3>Market Cap</h3>
                    <p></p>
                </div>
                <div >
                    <h3>Volume (24h)</h3>
                    <p></p>
                </div>
                <div className="row-start-2">
                    <h3>Circulating Supply</h3>
                    <p></p>
                </div>
                <div className="row-start-2">
                    <h3>Total Supply</h3>
                    <p></p>
                </div>
                <div className="row-start-3">
                    <h3>Max Supply</h3>
                    <p></p>
                </div>
                <div className="row-start-3">
                    <h3>Full Diluted Valuation</h3>
                    <p></p>
                </div>
                <div className="row-start-4">
                    <h3>All Time High</h3>
                    <p></p>
                </div>
                <div className="row-start-4">
                    <h3>All Time Low</h3>
                    <p></p>
                </div>
            </div>

        </div>
    )
}
