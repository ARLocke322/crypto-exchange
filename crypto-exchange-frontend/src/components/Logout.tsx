import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/users'

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const doLogout = async () => {
            try {
                await userService.logout()
            } catch (err) {
                console.error(err)
            } finally {
                navigate('/')
            }
        }
        doLogout()
    }, [navigate])

    return <p>Logging out...</p>
}

export default Logout
