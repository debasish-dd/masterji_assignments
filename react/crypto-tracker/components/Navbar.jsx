
function Navbar() {
    return (
        <div className='text-white flex justify-between shadow-xl items-center w-screen bg-stone-800 '>
            <h1 className='text-4xl m-2'>Crypto Tracker</h1>

            <div className='flex justify-around m-2 items-center'>

                {/* input */}
                <form className="px-4 w-full max-w-[330px] shadow-2xl">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" htmlFor="default-search">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-3 text-gray-500 dark:text-gray-400">
                                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" />
                            </svg>
                        </div>
                        <input required placeholder="Search" className="block w-full p-4 py-5 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="default-search" type="search" />
                        <button className="absolute end-2.5 bottom-1/2 translate-y-1/2 p-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4">
                                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>

                {/* toggle */}
                <div className="relative inline-flex items-center px-3 py-1 border border-gray-600 bg-stone-800 rounded-xl w-20 shadow-2xl h-11">
                    <select className="appearance-none bg-transparent focus:outline-none text-sm text-gray-100 w-full" name="country-code" id="country-code">
                        <option selected className='bg-stone-400' >USD</option>
                        <option selected className='bg-stone-400' >INR</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-4 h-4 ml-2 text-gray-600 absolute right-2 pointer-events-none">
                        <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </div>

            </div>

        </div>
    )
}

export default Navbar   