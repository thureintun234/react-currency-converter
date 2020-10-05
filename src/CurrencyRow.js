import React from 'react'

export default function CurrencyRow(props) {
    const { 
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
     } = props
    return (
        <>
            <input type="number" className="input" value={amount} 
            onChange={onChangeAmount} />
            <select className="select" value={selectedCurrency} onChange={onChangeCurrency}>
                {
                currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))
                }
            </select>
        </>
    )
}
