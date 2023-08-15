class ApiService{
    getRateInfo = async (currency) => {
        const result = await fetch("https://www.cbr-xml-daily.ru/latest.js")
          .then(data => data.json())
          .then(data => data.rates)
          .catch(err => console.log(err));
        return this._handleRateResult(result[currency]);
      }
      
    _handleRateResult = (rate) => {
        return (1/ rate).toFixed(2);
      }
}

export default ApiService;