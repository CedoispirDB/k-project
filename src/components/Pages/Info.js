import { React, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "../css/Info.css"
import axios from "axios"


function Info({ series, userData, signedIn, setUserDataLocal}) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');


  const [click, setClick] = useState();

  let show = false;

  let currentSerie = undefined;
  let user_series = undefined;
  let mySeries = undefined;
  let stat_num = "0";
  let current_status = "0";
  let index = 0;
  let list = [];


  async function saveUserData() {
      const res = await axios.put('https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/updateUserSeries', {
          username: "leo",
          password: "123",
          watched: "1",
          watching: "1",
          want_to_watch: "1",
          user_serie:
          {
              "name": { "S": "A Beautiful Mind" },
              "status": { "S": "Watched" },
              "imgUrl": { "S": "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Park-so-dam_1465617666_jj.jpg/250px-Park-so-dam_1465617666_jj.jpg" },
              "rating": { "N": "0" },
              "currentEp": { "N": "0" },
              "id": { "N": "1" },
              "total_episodes": { "N": "14" }
          }


      })

      console.log(res.data);
  }

  


  useEffect(() => {

  }, [click]);


  if (series.length > 0) {
    currentSerie = series.filter(serie => serie.M.name.S === name)[0].M;
    user_series = userData;



    if (user_series !== undefined) {
      mySeries = user_series["user_series"].L;

      if (mySeries !== undefined) {
        list = createList();
        


        for (var i = 0; i < mySeries.length; i++) {
          
          if (currentSerie.name.S === mySeries[i].M.name.S) {
            current_status = mySeries[i].M.status.S;

            break;
          }
        }



        switch (current_status) {
          case "Watched":
            stat_num = "1";
            break;
          case "Watching":
            show = true;
            stat_num = "2";
            break;
          case "Want to watch":
            stat_num = "3";
            break;
        }


      }


    }
  }

  function removeFromList(type) {
    switch (type) {
      case "Watched":
        if (parseInt(user_series["watched"].N) - 1 >= 0) {
          user_series["watched"] = {"N":  parseInt(user_series["watched"].N) - 1 + ""};
        }
        break;
      case "Watching":
        if (parseInt(user_series["watching"].N) - 1 >= 0) {
          user_series["watching"] = {"N": parseInt(user_series["watching"].N) - 1 + ""};
        }
        break;
      case "Want to watch":
        if (parseInt(user_series["want_to_watch"].N) - 1 >= 0) {
          user_series["want_to_watch"] = {"N": parseInt(user_series["want_to_watch"].N) - 1 + ""};
        }
        break;
    }
  }

  function handleSelection() {
    if (!signedIn) {
      return;
    }

    setClick(!click);
    var input_status = document.getElementsByClassName("options_select")[0].value;
    var stats = "0"


    for (var i = 0; i < mySeries.length; i++) {
      if (currentSerie.id == mySeries[i].id) {
        index = i;
        stats = "1";
        break;
      }
    }

    if (stats !== "0") {
      // Serie already on list
      let removed_status = "";

      if (input_status === "0") {
        // Need to remove it from list 

        removed_status = mySeries.splice(index, 1)[0].status;

        removeFromList(removed_status);
      } else {
        removeFromList(mySeries[index].status);
        switch (input_status) {
          case "1":
            mySeries[index].status = "Watched";
            user_series["watched"] = {"N":  parseInt(user_series["watched"].N) + 1 + ""};
            break;
          case "2":
            show = true;
            mySeries[index].status = "Watching";
            user_series["watching"] = {"N": parseInt(user_series["watching"].N) + 1 + ""};
            break;
          case "3":
            user_series["want_to_watch"] = {"N": parseInt(user_series["want_to_watch"].N) + 1 + ""};
            mySeries[index].status = "Want to watch";
            break;
        }

      }

    } else {

      let s = "";
      switch (input_status) {
        case "1":
          s = "Watched";
          user_series["watched"] = {"N":  parseInt(user_series["watched"].N) + 1 + ""};
          break;
        case "2":
          s = "Watching";
          user_series["watching"] = {"N": parseInt(user_series["watching"].N) + 1 + ""};
          break;
        case "3":
          s = "Want to watch";
          user_series["want_to_watch"] = {"N": parseInt(user_series["want_to_watch"].N) + 1 + ""};
          break;

      }

      user_series["user_series"].L.push(
        {"M": {
          "name": currentSerie.name,
          "status": {"S": s},
          "imgUrl": currentSerie.imgUrl,
          "rating": {"S": "0"},
          "currentEp": {"S": "0"},
          "id": currentSerie.id,
          "total_episodes": currentSerie["No. of episodes"]
        }}
      );
    }

    setUserDataLocal(user_series);
    // user_series["my_series"] = mySeries;

  }


  function createList() {

    let arr = [];
    for (var i = 0; i < parseInt(currentSerie["No. of episodes"]); i++) {
      arr.push(i);
    }

    arr.push(i);

    return arr;
  }

  function saveCurrentEp() {
    let newCurrentEp = document.getElementsByClassName("ep_numbers options_select")[0].value


    for (var i = 0; i < mySeries.length; i++) {
      if (currentSerie.id == mySeries[i].id) {
        index = i;
        break;
      }
    }

    mySeries[i].currentEp = newCurrentEp;


    user_series["user_series"] = mySeries;

    setUserDataLocal(user_series);


  }


  return (
    <>
      {currentSerie !== undefined ?
        <div className='container_info'>
          <h1 className='info_name'>{currentSerie.name.S}</h1>
          <div className='info_container'>
            <img src={currentSerie.imgUrl.S} alt={currentSerie.name.S + "_img"} className='info_img'></img>
            <div className='info_details'>
              <p>Genre: {currentSerie.Genre.S.replaceAll(" ", ",  ")}</p>
              <p className='hide_info'>Starring: {currentSerie.Starring.S} <br /></p>
              <p className='dif'>No. of episodes: {currentSerie["No. of episodes"].S} </p>
              <p className='hide_info'>Original release: {currentSerie["Original release"].S}</p>
              <p className='hide_info'>{currentSerie["Running time"] !== undefined ? "Running time: " + currentSerie["Running time"] : ""}</p>
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
                  <select className='options_select' onChange={handleSelection} defaultValue={stat_num}>
                    <option value='0'>Unwatched</option>
                    <option value='1'>Watched</option>
                    <option value='2'>Watching</option>
                    <option value='3'>Want to watch</option>
                  </select>
                  {show && <select className='ep_numbers options_select' onChange={saveCurrentEp}>
                    {list.map((i) => {
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
