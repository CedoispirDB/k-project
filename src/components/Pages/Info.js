import { React, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "../css/Info.css"
import axios from "axios"


function Info({ series, userData, signedIn, setUserDataLocal, username, pass }) {

  const location = useLocation();
  const search = location.search;
  const name = new URLSearchParams(search).get('name');

  const [click, setClick] = useState();



  if (series.length <= 0) {
    return;
  }


  let show = false;

  // console.log(username, pass, series, userData);

  // current serie information
  const currrent_serie_obj = series.filter(serie => serie.M.name.S === name)[0].M;

  let current_status = 0;
  let user_series_list = [];
  let current_list_index = 0;
  let watched = 0;
  let watching = 0;
  let want_to_watch = 0;

  if(userData !== undefined) {

    // current user list of series 
    user_series_list = userData.user_series.L;
  
    console.log("userData: ", userData);
    
    watched = parseInt(userData.watched.S);
    watching = parseInt(userData.watching.S);
    want_to_watch = parseInt(userData.want_to_watch.S);

    console.log("Qunatity of series: ",watched, watching, want_to_watch);

    console.log("currrent_serie_obj: ", currrent_serie_obj);
    console.log("user_series_list: ",user_series_list);

    // user information for specific series
    const current_serie_user_data = user_series_list.filter(serie => {
      if(serie.M.id.S === currrent_serie_obj.id.S) {
        return serie;
      }
      current_list_index++;
    })[0].M;

    console.log("current_serie_user_data: ", current_serie_user_data);
    console.log("current_list_index: ",current_list_index);

    current_status = current_serie_user_data.status.S;

    console.log("current_status: ",current_status);
  }
  
  

  async function saveUserData(username, password, userData, newSerie) {
    console.log(newSerie);
    console.log("making call")
    const res = await axios.put('https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/updateUserSeries', {
      username: username,
      password: password,
      watched: userData.watched.S,
      watching: userData.watching.S,
      want_to_watch: userData.want_to_watch.S,
      user_serie: newSerie
    })

    console.log(res);

  }

  function handleSelection() {
    /* 0 - unwatched
       1 - watched 
       2 - watching
       3 - want ot watch
    */
    let user_input = document.getElementsByClassName("options_select")[0].value;

    let new_user_series_list = [...user_series_list];

    let new_user_data_obj = {};

    if(user_input === "0") {
      // remove from list 
      
      
      new_user_series_list.splice(current_list_index, 1);
      
      switch(current_status) {
        case "1":
          if(watched - 1 >= 0) watched--;
        case "2":
          if(want_to_watch - 1 >= 0) watching--;
        case "3":
          if(want_to_watch - 1 >= 0) want_to_watch--;
      }
    }

    
    new_user_data_obj = {
      user_series: {"L": new_user_series_list},
      watched: {"S": watched + ""},
      watching: {"S": watching + ""},
      want_to_watch: {"S": want_to_watch + ""}
    }

    console.log(new_user_data_obj);


  }



  function createList() {

    let arr = [];
    for (var i = 0; i < parseInt(currrent_serie_obj["No. of episodes"].S); i++) {
      arr.push(i);
    }

    arr.push(i);

    return arr;
  }

  function saveCurrentEp() {
  //   let newCurrentEp = document.getElementsByClassName("ep_numbers options_select")[0].value


  //   for (var i = 0; i < mySeries.length; i++) {
  //     if (currentSerie.id.S == mySeries[i].M.id.S) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   mySeries[i].M.currentEp = { "S": newCurrentEp };

  //   console.log(mySeries[i].M)


  //   user_series["user_series"] = { "L": mySeries };

  //   setUserDataLocal(user_series);


  }


  return (
    <>
      {currrent_serie_obj !== undefined ?
        <div className='container_info'>
          <h1 className='info_name'>{currrent_serie_obj.name.S}</h1>
          <div className='info_container'>
            <img src={currrent_serie_obj.imgUrl.S} alt={currrent_serie_obj.name.S + "_img"} className='info_img'></img>
            <div className='info_details'>
              <p>{currrent_serie_obj.Genre !== undefined ? "Genre: " + currrent_serie_obj.Genre.S.replaceAll(" ", ",  ") : ""}</p>
              <p className='hide_info'>{currrent_serie_obj.Starring !== undefined ? "Starring: " + currrent_serie_obj.Starring.S : ""} <br /></p>
              <p className='dif'>{currrent_serie_obj["No. of episodes"] !== undefined ? "No. of episodes: " + currrent_serie_obj["No. of episodes"].S : ""} </p>
              <p className='hide_info'>{currrent_serie_obj["Original release"] !== undefined ? "Original release: " + currrent_serie_obj["Original release"].S : ""}</p>
              <p className='hide_info'>{currrent_serie_obj["Running time"] !== undefined ? "Running time: " + currrent_serie_obj["Running time"].S : ""}</p>
            </div>
            <div className={!signedIn ? 'info_status_text' : 'info_status'}>
              {!signedIn ?
                <>
                  Status:
                  <Link to="/profile" className='status_login'>login to see</Link>
                </>
                :

                <form name='viewer_options' className='info_form' >
                  <p className='status_text'>Status:</p>
                  <select className='options_select' onChange={handleSelection} defaultValue={current_status}>
                    <option value='0'>Unwatched</option>
                    <option value='1'>Watched</option>
                    <option value='2'>Watching</option>
                    <option value='3'>Want to watch</option>
                  </select>
                  {show && <select className='ep_numbers options_select' onChange={saveCurrentEp}>
                    {/* {list.map((i) => {
                      return <option key={i + 1} value={i}>{i}</option>
                    })
                    } */}
                  </select>
                  }
                </form>
              }
            </div>
          </div>
        </div>
        :
        <>
        </>
      }
    </>
  )

}




export default Info
