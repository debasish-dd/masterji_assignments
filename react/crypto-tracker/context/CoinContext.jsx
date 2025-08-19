import React, { createContext, useContext, useState } from 'react'

export const CoinContext = createContext()

export const CoinContextProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState('hii')

    async function fetchAllCoin() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': ''
            }
        };

        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    //   fetchAllCoin()

    return (
        <CoinContext.Provider value={{ allCoins, setAllCoins , fetchAllCoin }}>
            {children}
        </CoinContext.Provider>
    )
}

const useCoins = () => useContext(CoinContext)
export default useCoins
