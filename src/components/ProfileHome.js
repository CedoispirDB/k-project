import React from 'react'
import { Link } from 'react-router-dom'
import './css/Profile.css'

function ProfileHome({ userData }) {


    let sum = 0;


    function logout() {
        localStorage.clear();
        window.location.reload(false);
    }


    userData["user_series"].L.map(serie => {
        if (serie.status === "Watched") {
            sum += serie.M.total_ep.N;
        } else if (serie.status === "Watching") {
            sum += serie.M.currentEp.N;
        }
    });

    return (
        <div className='profile_container'>
            <div className='profile_wrapper'>
                <div className='status box'>
                    <Link to="/watched" className='link'>
                        {userData.watched.N} Watched
                    </Link>
                    <br />
                    <Link to="/watching" className='link'>
                        {userData.watching.N} Watching
                    </Link>
                    <br />
                    <Link to="/want-to-watch" className='link'>
                        {userData.want_to_watch.N} Want to Watch
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
