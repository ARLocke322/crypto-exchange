
import UserList from './components/UserList'
import {
  Routes, Route, Link
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import SignupForm from './components/SignupForm'
import useAuthStore from './hooks/useAuthStore'
import Layout from './layout'


const App = () => {


  const currentUser = useAuthStore((state) => state.currentUser)

  const padding = {
    padding: 5
  }

  /*
    if (!currentUser) return (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
  
      <div>
            <Link style={padding} to="/login">login</Link>
            <Link style={padding} to="/signup">sign up</Link>
          </div>
    )
    */
  if (!currentUser) return (
    <div>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

      </Routes>


    </div>
  )





  return (
    <div>
      <Layout>

        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </Layout>
    </div>
  )

}

export default App
