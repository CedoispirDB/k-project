import {React, useState, useEffect } from 'react'
import { useLocation  } from 'react-router-dom'
import "../css/Info.css"

function Info({ series, data, saveNewSeries, signedIn }) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');

  const [click, setClick] = useState();

  let show = false;

  let currentSerie = undefined;
  let userData = undefined;
  let mySeries = undefined;
  let stat_num = "0";
  let current_status = "0";
  let index = 0;
  let list = [];


  useEffect(() => {
    
  }, [click]);


  if (series.length > 0) {
    currentSerie = series.filter(serie => serie.name === name)[0];
    userData = data;



    if (userData !== undefined) {
      mySeries = userData["my_series"];

      if (mySeries !== undefined) {
        list = createList()
      


        for (var i = 0; i < mySeries.length; i++) {
          if (currentSerie.name === mySeries[i].name) {
            current_status = mySeries[i].status;

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
        if (parseInt(userData["number_of_watched"]) - 1 >= 0) {
          userData["number_of_watched"] = parseInt(userData["number_of_watched"]) - 1;
        }
        break;
      case "Watching":
        if (parseInt(userData["number_of_watching"]) - 1 >= 0) {
          userData["number_of_watching"] = parseInt(userData["number_of_watching"]) - 1;
        }
        break;
      case "Want to watch":
        if (parseInt(userData["number_of_want_to_watch"]) - 1 >= 0) {
          userData["number_of_want_to_watch"] = parseInt(userData["number_of_want_to_watch"]) - 1;
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
            userData["number_of_watched"] = parseInt(userData["number_of_watched"]) + 1;
            break;
          case "2":
            show = true;
            mySeries[index].status = "Watching";
            userData["number_of_watching"] = parseInt(userData["number_of_watching"]) + 1;
            break;
          case "3":
            userData["number_of_want_to_watch"] = parseInt(userData["number_of_want_to_watch"]) + 1
            mySeries[index].status = "Want to watch";
            break;
        }

      }

    } else {

      let s = "";
      switch (input_status) {
        case "1":
          s = "Watched";
          userData["number_of_watched"] = parseInt(userData["number_of_watched"]) + 1;
          break;
        case "2":
          s = "Watching";
          userData["number_of_watching"] = parseInt(userData["number_of_watching"]) + 1;
          break;
        case "3":
          s = "Want to watch";
          userData["number_of_want_to_watch"] = parseInt(userData["number_of_want_to_watch"]) + 1;
          break;

      }

      userData["my_series"].push(
        {
          "name": currentSerie.name,
          "status": s,
          "imgUrl": currentSerie.imgUrl,
          "rating": 0,
          "currentEp": 0,
          "id": currentSerie.id
        }
      );
    }


    userData["my_series"] = mySeries;

    saveNewSeries(userData);
  }


  function createList() {

    let arr = [];
    for (var i = 0; i < parseInt(currentSerie["No. of episodes"]); i++) {
      arr.push(i);
    }

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

    userData["my_series"] = mySeries;

    saveNewSeries(userData);

  }
 

  return (
    <>
      {currentSerie !== undefined ?
        <div className='container_info'>
          <h1 className='info_name'>{currentSerie.name}</h1>
          <div className='info_container'>
            <img src={currentSerie.imgUrl} alt='serie_img' className='info_img'></img>
            <div className='info_details'>
              <p>Genre: {currentSerie.Genre.replaceAll(" ", ",  ")}</p>
              <p className='hide_info'>Starring: {currentSerie.Starring} <br /></p>
              <p className='dif'>No. of episodes: {currentSerie["No. of episodes"]} </p>
              <p className='hide_info'>Original release: {currentSerie["Original release"]}</p>
              <p className='hide_info'>{currentSerie["Running time"] !== undefined ? "Running time: " + currentSerie["Running time"] : ""}</p>
            </div>
            <div className='info_status'>
              {!signedIn ?
                "Status: login to see it"
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
                    { list.map((i) => {
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
