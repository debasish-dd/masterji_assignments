import React, { createContext, useContext, useEffect, useState } from 'react'

export const CoinContext = createContext()

export const CoinContextProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState([])
    const [currency, setCurrency] = useState({
        name: 'usd',
        symbol: '$'
    })

    const [themeMode, setThemeMode] = useState(true)
    const [displayCoins, setDisplayCoins] = useState([])
    async function fetchAllCoin() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': import.meta.env.VITE_CRYPTO_KEY
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoins(res))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        setDisplayCoins(allCoins)

    }, [allCoins])

   useEffect(() => {
    async function fetchAllCoin() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': import.meta.env.VITE_CRYPTO_KEY
            }
        };

        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await res.json();
            setAllCoins(data);
        } catch (err) {
            console.error(err);
        }
    }
    
    fetchAllCoin();
}, [currency.name]) 

    // for bookmark 
   const [bookmarkedCoins, setBookmarkedCoins] = useState(() => {
  try {
    const saved = localStorage.getItem('bookmarked')
    if (!saved) return []
    
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to load bookmarks:', error)
    return []
  }
})

    useEffect(() => {
  localStorage.setItem('bookmarked', JSON.stringify(bookmarkedCoins))
}, [bookmarkedCoins])


    return (
        <CoinContext.Provider value={{ allCoins, currency, setCurrency, displayCoins, setDisplayCoins, themeMode, setThemeMode, bookmarkedCoins, setBookmarkedCoins }}>
            {children}
        </CoinContext.Provider>
    )
}

const useCoins = () => useContext(CoinContext)
export default useCoins
