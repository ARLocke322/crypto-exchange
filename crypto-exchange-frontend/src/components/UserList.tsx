import UserView from "./UserView"
import type { User } from "../types"
import { useEffect, useState } from "react"
import userService from '../services/users'


const UserList = () => {
    const [users, setUsers] = useState<Array<User>>([])
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
    return (
        <div>
            {users.map((user) =>
                <UserView key={user.username} user={user} />
            )}
        </div>
    )
}

export default UserList