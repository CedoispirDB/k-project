import React from 'react'
import { Link } from 'react-router-dom'
import './css/Profile.css'

function ProfileHome({ userData }) {


    let sum = 0;


    function logout() {
        localStorage.clear();
        window.location.reload(false);
    }

    if (userData !== undefined) {
        // console.log(userData["user_series"].L);
        userData["user_series"].L.map(serie => {
            if (serie.M.status.S === "1") {
                sum += parseInt(serie.M.total_episodes.S);
            } else if (serie.M.status.S === "2") {
                sum += parseInt(serie.M.current_episode.S);
            }
        });
    }

    return (
        <div className='profile_container'>
            <div className='profile_wrapper'>
                <div className='status box'>
                    <Link to="/watched" className='link'>
                        {userData.watched.S} Watched
                    </Link>
                    <br />
                    <Link to="/watching" className='link'>
                        {userData.watching.S} Watching
                    </Link>
                    <br />
                    <Link to="/want-to-watch" className='link'>
                        {userData.want_to_watch.S} Want to Watch
                    </Link>
                </div>
                <div className='total_episodes box'>
                    <p className='total_numb'>
                        {sum}
                    </p>
                    <p className='total_text'>Episodes watched</p>
                </div>
                <button className='btn_logout' onClick={logout}>Sign out</button>
            </div>


        </div>
    )
}


export default ProfileHome
