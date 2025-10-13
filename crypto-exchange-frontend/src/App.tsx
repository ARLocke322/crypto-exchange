
import UserList from './components/UserList'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import useUserStore from './hooks/useAuthStore'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import SignupForm from './components/SignupForm'

const App = () => {

  
  const currentUser = useUserStore((state) => state.currentUser)

  const padding = {
    padding: 5
  }

  if (!currentUser) return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/login">login</Link>
          <Link style={padding} to="/signup">sign up</Link>
        </div>

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

        </Routes>
      </Router>

    </div>
  )

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/logout">logout</Link>
        </div>

        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </Router>

    </div>
  )

}

export default App
