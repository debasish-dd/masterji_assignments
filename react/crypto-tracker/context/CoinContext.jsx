import React, { createContext, useContext, useEffect, useState } from 'react'

export const CoinContext = createContext()

export const CoinContextProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState([])
    const [currency, setCurrency] = useState({
        name: 'usd',
        symbol: '$'
    })
    
    const [currId, setCurrId] = useState("")
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
        fetchAllCoin();
    }, [currency])

    useEffect(() => {
        setDisplayCoins(allCoins)

    }, [allCoins])


     
    return (
        <CoinContext.Provider value={{ allCoins, currency, setCurrency, displayCoins, setDisplayCoins }}>
            {children}
        </CoinContext.Provider>
    )
}

const useCoins = () => useContext(CoinContext)
export default useCoins
