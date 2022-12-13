import React, {useState} from 'react'
import currentUser from '../current_user'
import './ProfilePage.css'

export default function ProfilePage() {
    const [user, setUser] = useState(currentUser)

    return (
        <div className='profile-div'>{user.name}</div>
    )
}
