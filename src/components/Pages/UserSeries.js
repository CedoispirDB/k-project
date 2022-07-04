import React from 'react'
import SeriesList from '../SeriesList'
import { Link } from 'react-router-dom';
import '../css/SignIn.css'


function UserSeries({ series, prevPage, nextPage, pageNum, category, isSignedIn }) {
    let mySeries = undefined;


    if (isSignedIn) {
        mySeries = series["my_series"].filter(serie => serie.status === category);
       
    }



    return (
        <>
            {!isSignedIn ?
                    <div className='container'>
                        <div className='sign_in_container min'>
                            <p className='login_warning'>You need to login in order to see your series</p>
                            <Link to="/profile">
                                <button className='btn_min' >Go!</button>
                            </Link>
                        </div>
                        {/* {navigate('/profile', { replace: false })} */}
                </div>
                :
                <div className='cards user_series_container'>
                    <div className='cards__container'>
                        <div className='cards__wrapper big'>
                            <ul className='grid_container' >
                                <SeriesList series={mySeries} />
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>


    )
}

export default UserSeries