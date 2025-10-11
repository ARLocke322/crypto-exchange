import type { User } from "../types"

interface UserViewProps {
    user: User
}

const UserView = ({user}: UserViewProps) => {
    return (
        <li>username: {user.username}, email: {user.email}</li>
    )
}

export default UserView