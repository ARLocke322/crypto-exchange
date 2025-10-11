import UserView from "./UserView"
import type { User } from "../types"

interface UserListProps {
    users: User[]
}

const UserList = ({ users }: UserListProps) => {
    return (
        <div>
            {users.map((user) =>
                <UserView key={user.username} user={user} />
            )}
        </div>
    )
}

export default UserList