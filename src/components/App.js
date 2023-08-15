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

export default App;
