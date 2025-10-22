import React, { useEffect, useState } from 'react'
import useCoins from '../context/CoinContext';

function ComparisonTable({ coin1, coin2 }) {
    const { currency, themeMode } = useCoins()
    
    const [firstCoin, setFirstCoin] = useState(null)
    const [secondCoin, setSecondCoin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setLoading(true);
                
                const response1 = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=${coin1.id}`
                );
                const response2 = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=${coin2.id}`
                );
                
                const data1 = await response1.json();
                const data2 = await response2.json();
                
                console.log(data1);
                
                setFirstCoin(data1[0]);
                setSecondCoin(data2[0]);
                
            } catch (error) {
                console.error('Error fetching coins:', error);
            } finally {
                setLoading(false);
            }
        };
        
        if (coin1?.id && coin2?.id && currency?.name) {
            fetchCoins();
        }
    }, [currency, coin1?.id, coin2?.id]); 

    if (loading || !firstCoin || !secondCoin) {
        return <div className="m-6 p-6 text-center">Loading comparison data...</div>;
    }

    const getCurrencySymbol = () => currency.name === 'usd' ? '$' : '₹';
    const currSymbol = getCurrencySymbol();

    // Format number with locale
    const formatValue = (value) => {
        if (value === null || value === undefined) return 'N/A';
        if (typeof value === 'number') {
            return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
        }
        return value;
    };

    return (
        <div className={`m-6 rounded ${themeMode ? 'bg-gray-700' : 'bg-emerald-200'} p-6 overflow-x-auto`}>
            <table className="w-full">
                <thead>
                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <th className="text-left py-3 font-semibold">Metric</th>
                        <th className="text-center py-3 font-semibold">{firstCoin.name}</th>
                        <th className="text-center py-3 font-semibold">{secondCoin.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Market Cap</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.market_cap)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.market_cap)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Current Price</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.current_price)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.current_price)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Price Change (24h)</td>
                        <td className="text-center py-3">
                            <span className={`${firstCoin.price_change_percentage_24h>0? 'text-green-800': 'text-red-800'} font-semibold`}>{firstCoin.price_change_percentage_24h?.toFixed(2)}% </span>
                            
                        </td>
                        <td className="text-center py-3">
                            <span className={`${secondCoin?.price_change_percentage_24h>0? 'text-green-800': 'text-red-800'} font-semibold`}>{firstCoin.price_change_percentage_24h?.toFixed(2)}% </span>
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Total Volume</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.total_volume)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.total_volume)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Fully Diluted Valuation</td>
                        <td className="text-center py-3">
                            {firstCoin.fully_diluted_valuation 
                                ? `${currSymbol} ${formatValue(firstCoin.fully_diluted_valuation)}` 
                                : 'Not Available'}
                        </td>
                        <td className="text-center py-3">
                            {secondCoin.fully_diluted_valuation 
                                ? `${currSymbol} ${formatValue(secondCoin.fully_diluted_valuation)}` 
                                : 'Not Available'}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">High (24h)</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.high_24h)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.high_24h)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Low (24h)</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.low_24h)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.low_24h)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Market Cap Change (24h)</td>
                        <td className="text-center py-3">
                            <span className={`${firstCoin.market_cap_change_percentage_24h>0? 'text-green-800': 'text-red-800'} font-semibold`}>{firstCoin.market_cap_change_percentage_24h?.toFixed(2)}% </span>
                           
                        </td>
                        <td className="text-center py-3">
                           <span className={`${secondCoin?.market_cap_change_percentage_24h>0? 'text-green-800': 'text-red-800'} font-semibold`}>{secondCoin?.market_cap_change_percentage_24h?.toFixed(2)}% </span>
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Circulating Supply</td>
                        <td className="text-center py-3">
                            {formatValue(firstCoin.circulating_supply)}
                        </td>
                        <td className="text-center py-3">
                            {formatValue(secondCoin.circulating_supply)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Total Supply</td>
                        <td className="text-center py-3">
                            {formatValue(firstCoin.total_supply)}
                        </td>
                        <td className="text-center py-3">
                            {formatValue(secondCoin.total_supply)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">Max Supply</td>
                        <td className="text-center py-3">
                            {firstCoin.max_supply ? formatValue(firstCoin.max_supply) : 'Unlimited'}
                        </td>
                        <td className="text-center py-3">
                            {secondCoin.max_supply ? formatValue(secondCoin.max_supply) : 'Unlimited'}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">All-Time High</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.ath)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.ath)}
                        </td>
                    </tr>

                    <tr className={`border-b ${themeMode ? 'border-gray-600' : 'border-emerald-300'}`}>
                        <td className="py-3">All-Time Low</td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(firstCoin.atl)}
                        </td>
                        <td className="text-center py-3">
                            {currSymbol} {formatValue(secondCoin.atl)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ComparisonTable