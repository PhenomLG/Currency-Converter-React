import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [rate, setRate] = useState(0);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    async function fetchRates(){
      const rates = await getRateInfo();
      setRate(handleRateResult(rates["USD"]));
    }
    fetchRates();
  }, []);
  
  async function onCurrencyClick(e) {
    const currency = e.target.innerText;
    const rates = await getRateInfo();

    e.target.closest('.app__controls').childNodes.forEach(btn => {
      btn.classList.remove('app__btn_active');
    });
    e.target.classList.add('app__btn_active');

    setRate(handleRateResult(rates[currency]));
    setCurrency(currency);
  }

  async function onUpdateClick(){
    const rates = await getRateInfo();
    setRate(handleRateResult(rates[currency]));
  }

  return (
    <div className="app">
        <div className='app__currency'>{rate} RUB</div>
        <div className="app__controls">
          <button className='app__btn app__btn_active' onClick={onCurrencyClick}>USD</button>
          <button className='app__btn' onClick={onCurrencyClick}>EUR</button>
          <button className='app__btn' onClick={onCurrencyClick}>GBP</button>
          <button className='app__btn' onClick={onUpdateClick}>update</button>
        </div>
    </div>
  );
}

const getRateInfo = async () => {
  const result = await fetch("https://www.cbr-xml-daily.ru/latest.js")
    .then(data => data.json())
    .then(data => data.rates)
    .catch(err => console.log(err));
  return result;
}

const handleRateResult = (rate) => {
  return (1/ rate).toFixed(2);
}

export default App;
