import { useEffect, useState } from 'react'
import userService from './services/users'
import UserList from './components/UserList'
import type { User } from './types'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import useUserStore from './hooks/useUserStore'

const App = () => {
  const [users, setUsers] = useState<Array<User>>([])
  const currentUser = useUserStore((state) => state.currentUser)

  const padding = {
    padding: 5
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getAll()
        setUsers(users)
      } catch (err) {
        console.error('Failed to load users:', err)
      }
    }
    fetchUsers()
  }, [])

  if (!currentUser) return <LoginForm />

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/logout">logout</Link>
        </div>

        <Routes>
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/logout" element={<Dashboard />} />
        </Routes>
      </Router>
      
    </div>
  )

}

export default App
