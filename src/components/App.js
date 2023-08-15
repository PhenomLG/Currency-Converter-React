import './App.scss';

function App() {
  return (
    <div className="app">
        <div className='app__currency'>{50} {"RUB"}</div>
        <div className="app__controls">
          <button>USD</button>
          <button>EUR</button>
          <button>GBP</button>
          <button>update</button>
        </div>
    </div>
  );
}

const getRateInfo = async () => {
  const result = await fetch("https://www.cbr-xml-daily.ru/latest.js")
    .then(data => data.json())
    .then(data => ({
      base: data.base,
      rates: data.rates
    }))
    .catch(err => console.log(err));
  return result;
}
export default App;
