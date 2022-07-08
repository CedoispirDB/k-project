import React from 'react'
import { Link } from 'react-router-dom'
import './css/Profile.css'

function ProfileHome({ userData }) {


    let sum = 0;

    console.log(userData);

    function logout() {
        localStorage.clear();
        window.location.reload(false);
    }

    console.log(userData["user_series"].L);
    userData["user_series"].L.map(serie => {
        console.log(serie.M)
        if (serie.M.status.S === "Watched") {
            sum += parseInt(serie.M.total_episodes.S);
        } else if (serie.M.status.S === "Watching") {
            sum += parseInt(serie.M.currentEp.S);
        }
    });

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
                <button className='btn_logout' onClick={logout}>Logout</button>
            </div>


        </div>
    )
}


export default ProfileHome
