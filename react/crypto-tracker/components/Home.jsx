import React from 'react'

function Home() {
    return (
        <div className='w-3xl m-auto'>

            <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] p-5 rounded-lg items-center border-b-1 mt-5 bg-gradient-to-tr from-slate-600 to-stone-700'>
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p>24H Charge</p>
                <p className="text-right">Market Cap</p>
            </div>

        </div>
    )
}

export default Home 