import axios from "axios"

const URI = 'https://api.agbot.com.br'

export const retrieveData = (currency, timeframe) => (
  axios.get(`${URI}/api/strategies/${currency}/${timeframe}`)
)

export const retrieveCurrencies = () => axios.get(`${URI}/api/coins/`)