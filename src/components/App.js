import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [rate, setRate] = useState(0);

  async function onClickBtn(e) {
    const currency = e.target.innerText;
    const rates = await getRateInfo();
    setRate((1 / rates[currency]).toFixed(2));
  }

  return (
    <div className="app">
        <div className='app__currency'>{rate} RUB</div>
        <div className="app__controls">
          <button onClick={onClickBtn}>USD</button>
          <button onClick={onClickBtn}>EUR</button>
          <button onClick={onClickBtn}>GBP</button>
          <button>update</button>
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
export default App;
