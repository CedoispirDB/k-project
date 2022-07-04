import React from 'react'
import { Link } from 'react-router-dom'
import './css/Profile.css'

function ProfileHome({ userData, logout}) {

    let sum = 0;

    return (
        <div className='profile_container'>
            <div className='profile_wrapper'>
                <div className='status box'>
                    <Link to="/watched" className='link'>
                    {userData.number_of_watched} Watched 
                    </Link> 
                    <br />
                    <Link to="/watching" className='link'>
                    {userData.number_of_watching} Watching 
                    </Link>
                    <br />
                    <Link to="/want-to-watch" className='link'>
                    {userData.number_of_want_to_watch} Want to Watch
                    </Link>
                </div>
                <div className='total_episodes box'>
                    <p className='total_numb'>
                        {sum}
                    </p>
                    <p className='total_text'>Episodes watched</p>
                </div>
                <button className='btn_logout' onClick={logout}>Logout</button>
            </div>

            
        </div>
    )
}

export default ProfileHome
