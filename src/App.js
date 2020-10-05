import React,{useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const Data_Url = ' https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions,setCurrencyOptions] = useState([])
  const [fromCurrency,setFromCurrency] = useState()
  const [toCurrency,setToCurrency] = useState()
  const [exchangeRate,setExchangeRate] = useState()
  const [amount,setAmount] = useState(1)
  const [amountInFromCurrency,setAmountInFromCurrency] = useState(true)
  // console.log(exchangeRate)

  let toAmount,fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }else {
    toAmount =amount
    fromAmount = amount / exchangeRate
  }

  // console.log(currencyOptions)
  useEffect(() => {
    fetch(Data_Url)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  },[])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${Data_Url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data =>  setExchangeRate(data.rates[toCurrency])) 
    }
  })

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency}
      onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount}
      onChangeAmount = {handleFromAmountChange}
       />
      <div className="equation">=</div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount}
        onChangeAmount = {handleToAmountChange}
       />
    </div>
  );
}

export default App;
