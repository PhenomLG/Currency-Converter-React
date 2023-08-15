import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import './App.scss';

const api = new ApiService();

function App() {
  const [rate, setRate] = useState(0);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    async function fetchRates(){
      const rate = await api.getRateInfo(currency);
      setRate(rate);
    }
    fetchRates();
  }, []);
  
  async function onCurrencyClick(e) {
    const currency = e.target.innerText;
    const rate = await api.getRateInfo(currency);

    e.target.closest('.app__controls').childNodes.forEach(btn => {
      btn.classList.remove('app__btn_active');
    });
    e.target.classList.add('app__btn_active');

    setRate(rate);
    setCurrency(currency);
  }

  async function onUpdateClick(){
    const rate = await api.getRateInfo(currency);
    setRate(rate);
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

export default App;
