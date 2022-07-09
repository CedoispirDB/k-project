import { React, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "../css/Info.css"
import axios from "axios"


function Info({ series, userData, signedIn, setUserDataLocal, username, pass }) {


  async function saveUserData(username, password, user_data, new_serie, adding, current_list_index) {

    let type = "";

    if (adding) {
      type = "append";
      new_serie = new_serie.M;
    } else {
      if (new_serie === undefined) {
        type = "remove";
        new_serie = {};
      } else {
        type = "update";
        new_serie = new_serie.M;
      }
    }

    const obj = {
      username: username,
      password: password,
      watched: user_data.watched.S,
      watching: user_data.watching.S,
      want_to_watch: user_data.want_to_watch.S,
      user_serie: new_serie
    };


    // console.log(obj);

    // console.log("making call")
    const res = await axios.put(`https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/updateUserSeries?index=${current_list_index}&type=${type}`, obj)

    // console.log(res);

  }

  const location = useLocation();
  const search = location.search;
  const name = new URLSearchParams(search).get('name');

  const [click, setClick] = useState(false);

  // console.log(userData);

  if (series.length <= 0) {
    return;
  }


  // console.log("rendering", series)


  // current serie information
  const currrent_serie_obj = series.filter(serie => serie.M.name.S === name)[0].M;

  let current_status = 0;
  let current_episode = 0;
  let user_series_list = [];
  let current_serie_user_data = {};
  let current_list_index = undefined;
  let watched = 0;
  let watching = 0;
  let want_to_watch = 0;

  const total_num_of_episodes = createList();;

  let show = false;

  if (userData !== undefined) {

    // current user list of series 
    user_series_list = userData.user_series.L;


    // console.log("userData: ", userData);

    watched = parseInt(userData.watched.S);
    watching = parseInt(userData.watching.S);
    want_to_watch = parseInt(userData.want_to_watch.S);

    // console.log("Qunatity of series: ", watched, watching, want_to_watch);

    // console.log("currrent_serie_obj: ", currrent_serie_obj);
    // console.log("user_series_list: ", user_series_list);

    // user information for specific series
    current_serie_user_data = user_series_list.filter(serie => {
      if (serie.M.length <= 0) {
        return;
      }
      if (serie.M.id.S === currrent_serie_obj.id.S) {
        return serie;
      }
    });

    for (var i = 0; i < user_series_list.length; i++) {
      if (user_series_list[i].M.id.S === currrent_serie_obj.id.S) {
        current_list_index = i;
      }
    }


    // console.log(current_list_index);

    if (current_serie_user_data.length <= 0) {
      // current serie is not in the user's list
      current_status = "0";
      current_episode = "0";
    } else {
      current_serie_user_data = current_serie_user_data[0].M;
      current_status = current_serie_user_data.status.S;
      current_episode = current_serie_user_data.current_episode.S

    }

    // console.log(current_serie_user_data)

    if (current_status === "2") {
      show = true;
    }

    // console.log("current_serie_user_data: ", current_serie_user_data);
    // console.log("current_list_index: ", current_list_index);



    // console.log("current_status: ", current_status);
  }


  function handleSelection() {
    /* 0 - unwatched
       1 - watched 
       2 - watching
       3 - want ot watch
    */
    let user_input = document.getElementsByClassName("options_select")[0].value;

    let adding = false;
    // console.log("user_series_list in handler before splice: ", user_series_list)

    let new_user_data_obj = {};

    // console.log("user_series_list in handler: ", user_series_list);

    let new_status;

    // console.log(current_status);

    if (current_status === "0") {
      // console.log("adding to list")
      switch (user_input) {
        case "1":
          new_status = "1";
          watched++;
          break;
        case "2":
          new_status = "2";
          watching++;
          show = true;
          break;
        case "3":
          new_status = "3";
          want_to_watch++;
          break;
      }

      current_status = new_status;
      if (current_status === "2") {
        show = true;
      }
      user_series_list.push({
        "M": {
          name: { "S": currrent_serie_obj.name.S },
          status: { "S": new_status },
          imgUrl: { "S": currrent_serie_obj.imgUrl.S },
          rating: { "S": "0" },
          current_episode: { "S": "0" },
          id: { "S": currrent_serie_obj.id.S },
          total_episodes: { "S": currrent_serie_obj["No. of episodes"].S }
        }
      })
      adding = true;
      current_list_index = user_series_list.length - 1;
    } else {

      if (user_input === "0") {
        // remove from list 
        // console.log("removing from list");
        switch (current_status) {
          case "1":
            if (watched - 1 >= 0) watched--;
            break;
          case "2":
            if (watching - 1 >= 0) watching--;
            show = false;
            break;
          case "3":
            if (want_to_watch - 1 >= 0) want_to_watch--;
            break;
        }
        current_status = "0";
        // console.log(current_list_index);
        user_series_list.splice(current_list_index, 1);
      } else {
        // Serie is already in my list, need to make changes
        let temp_obj = current_serie_user_data;

        // console.log("updating list");
        switch (current_status) {
          case "1":
            if (watched - 1 >= 0) watched--;
            break;
          case "2":
            if (watching - 1 >= 0) watching--;
            show = false;
            break;
          case "3":
            if (want_to_watch - 1 >= 0) want_to_watch--;
            break;
        }

        switch (user_input) {
          case "1":
            new_status = "1";
            watched++;
            break;
          case "2":
            new_status = "2";
            watching++;
            show = true;
            break;
          case "3":
            new_status = "3";
            want_to_watch++;
            break;
        }


        current_status = new_status;
        temp_obj.status = { "S": new_status };
        user_series_list.splice(current_list_index, 1, { "M": temp_obj });

      }
    }


    new_user_data_obj = {
      user_series: { "L": user_series_list },
      watched: { "S": watched + "" },
      watching: { "S": watching + "" },
      want_to_watch: { "S": want_to_watch + "" }
    }

    // console.log(user_series_list);
    // user_series_list = sortList(user_series_list);
    // console.log(new_user_data_obj);
    setUserDataLocal(new_user_data_obj);
    userData = new_user_data_obj;
    saveUserData(username, pass, new_user_data_obj, new_user_data_obj.user_series.L[current_list_index], adding, current_list_index);


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
    const episode_input = document.getElementsByClassName("ep_numbers options_select")[0].value;

    // console.log(userData)
    let temp_list_of_series = userData.user_series.L;
    let temp_user_data_obj = { ...userData };

    // console.log(temp_list_of_series);
    // console.log(current_list_index);
    temp_user_data_obj.user_series.L[current_list_index].M.current_episode = { "S": episode_input };
    // console.log(temp_user_data_obj);



    // console.log(temp_user_data_obj);
    setUserDataLocal(temp_user_data_obj);
    saveUserData(username, pass, temp_user_data_obj, temp_user_data_obj.user_series.L[current_list_index], false, current_list_index);


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
                  {show && <select className='ep_numbers options_select' onChange={saveCurrentEp} defaultValue={current_episode}>
                    {total_num_of_episodes.map((i) => {
                      return <option key={i + 1} value={i}>{i}</option>
                    })
                    }
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
