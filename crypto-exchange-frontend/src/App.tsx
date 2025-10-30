
import Portfolio from './components/Portfolio'
import portfolioService from './services/portfolio'
import cryptocurrencyService from './services/cryptocurrencies'
import {
  Routes, Route, useNavigate
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import SignupForm from './components/SignupForm'
import useAuthStore from './hooks/useAuthStore'
import Layout from './layout'
import TradeContainer from './components/TradeForm'
import TransactionsHistory from './components/TransactionsHistory'
import { useEffect, useState } from 'react'
import type { CryptocurrencyData, PortfolioData } from './types'
import { Loading } from './components/Loading'


const App = () => {


  const currentUser = useAuthStore((state) => state.currentUser)
  const navigate = useNavigate()

  const [portfolio, setPortfolio] = useState<PortfolioData>()
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptocurrencyData[]>([])

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolio = await portfolioService.getPortfolio()
        setPortfolio(portfolio)
      } catch (err) {
        console.error('Failed to load portfolio:', err)
      }
    }
    const fetchCryptocurrencies = async () => {
      try {
        const cryptocurrencies = await cryptocurrencyService.getCryptocurrencies()
        setCryptocurrencies(cryptocurrencies)
      } catch (err) {
        console.error('Failed to load cryptocurrencies:', err)
      }
    }
    if (currentUser) {
      fetchPortfolio()
      fetchCryptocurrencies()
    }

  }, [currentUser])


  if (!currentUser) return (
    <div>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>


    </div>
  )

  if (!portfolio || cryptocurrencies.length === 0) return <Loading />

  return (
    <div>
      <Layout>

        <Routes>
          <Route path="/portfolio" element={<Portfolio cryptocurrencies={cryptocurrencies} />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/trade" element={<TradeContainer cryptocurrencies={cryptocurrencies} onSuccess={() => navigate('/portfolio')} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/transactions" element={<TransactionsHistory />} />
        </Routes>
      </Layout>
    </div>
  )

}

export default App
