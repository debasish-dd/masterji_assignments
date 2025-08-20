import React from 'react'

export default function Coins() {
    return (
        <div className='mt-26'>
            <div className='flex justify-items-start gap-2 mx-2'>
                <p className='cursor-pointer text-fuchsia-300'>Market</p>/<p className='cursor-pointer '>Bitcoin</p>
            </div>
            <div className='flex justify-between m-6 items-center'>
                <div>
                    <h1 className='text-4xl m-0.5'>Bitcoin</h1>
                    <p className='ml-1'> BTC</p>
                </div>
                <button className='bg-stone-600 h-10 px-2 rounded-md cursor-pointer'>Boolmark</button>
            </div>
            <div className='m-6'>
                <p className='text-4xl'>$98,450</p>
                <div className='flex justify-start'>
                <p className='mr-2'>Last 7 days </p> 
                <p> +2.3%</p>
                </div>
            </div>

            {/* graph */}

        

        </div>
    )
}
