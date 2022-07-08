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
            let found = '';
            for(var i = 0; i < series.length; i++) {
                let serie = series[i].M.name.S;
                if(serie === searchInput) {
                    found = serie;
                    break;
                } 

                if(serie.toLowerCase() === searchInput.toLowerCase()) {
                    found = serie;
                    break;
                }

                if(serie.replace(/[^a-z0-9]/gi, ' ') === searchInput) {
                    found = serie;
                    break;
                }

                if(serie.replace(/[^a-z0-9]/gi, ' ').toLowerCase() === searchInput.toLowerCase()) {
                    found = serie;
                    break;
                }
            }
            if (found !== '') {
                navigate(`/info?name=${found}`, { replace: true })
            } else {
                setShow(true);
            }
        }
    }



    return (
        <div className='search_container'>

            <div className='search_bar_container'>

                <input className='search_bar' onKeyDown={search} onChange={handleChange}></input>
                {show && <div className='error_msg msg'>Serie not found</div>}

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
