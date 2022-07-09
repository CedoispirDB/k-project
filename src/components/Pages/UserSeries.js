import React from 'react'
import SeriesList from '../SeriesList'
import { Link } from 'react-router-dom';
import '../css/SignIn.css'
import Loading from './Loading';

function sortList(list) {
    let arr = JSON.parse(JSON.stringify(list));
    let temp_obj;
    let index = 0;
    for (var i = 0; i < arr.length; i++) {
      temp_obj = arr[i];
      let name = temp_obj.M.name.S;
      for (var j = i + 1; j < arr.length - 1; j++) {
        if (name.localeCompare(arr[j].M.name.S) > 0) {
          index = j;
          break;
        }
      }

      let temp = arr[index].M;
      arr[index].M = temp_obj.M;
      arr[i].M = temp;
    }

    return arr;
  }


function UserSeries({ series, prevPage, nextPage, pageNum, category, isSignedIn ,loading}) {
    let mySeries = undefined;


    if (isSignedIn) {
        mySeries = series.user_series.L.filter(serie => serie.M.status.S === category);
        mySeries = sortList(mySeries);
    }


   
    let overflow = "";
    
    // console.log(window.innerWidth)

    overflow = "";

    if(series !== undefined && mySeries.length < 4) {
        overflow = " user_series_container";
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
                <div className={`series${overflow}`}>
                    <div className='series__container'>
                        <div className='series__wrapper big'>
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