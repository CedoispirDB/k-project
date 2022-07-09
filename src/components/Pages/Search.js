import React, { useState } from 'react'
import "../css/Search.css"
import SeriesList from "../SeriesList"
import { useNavigate } from 'react-router-dom';


function Search({ series }) {


    const navigate = useNavigate();
    

    const [searchInput, setSearchInput] = useState();
    const [show, setShow] = useState(false);



    function handleChange(event) {
        setShow(false);
        
        setSearchInput(event.target.value);
    }

    function search(event) {
        if (event.keyCode === 13) {
            let input = searchInput.replace(/\ $/, "");
            let found = '';
            for(var i = 0; i < series.length; i++) {
                let serie = series[i].M.name.S;
                if(serie === input) {
                    found = serie;
                    break;
                } 

                if(serie.toLowerCase() === input.toLowerCase()) {
                    found = serie;
                    break;
                }

                if(serie.replace(/[^a-z0-9]/gi, ' ') === input) {
                    found = serie;
                    break;
                }

                if(serie.replace(/[^a-z0-9]/gi, ' ').toLowerCase() === input.toLowerCase()) {
                    found = serie;
                    break;
                }
            }
            if (found !== '') {
                navigate(`/info?name=${found}`, { replace: false })
            } else {
                setShow(true);
            }
        }
    }



    return (
        <div className='search_container'>

            <div className='search_bar_container'>

                <input className='search_bar' onKeyDown={search} onChange={handleChange}></input>
                {show && 
                    <>
                        <div className='error_msg msg'>Serie not found <br/>Check the serie's name and try again</div>
                        <div className='error_msg msg'>It is  also possible we don't have this serie in our database 🥲<br/>We will be working to fix this.<br/></div>
                    </>
                }

            </div>

            {/* <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='grid_container'>
                        <SeriesList series={
                            series.map(serie => {

                                if (serie.rating > 8) {
                                    return serie;
                                } else {
                                    return false;
                                }

                            })
                        } />
                    </ul>
                </div>
            </div>
            */}
        </div> 
    )
}

export default Search
