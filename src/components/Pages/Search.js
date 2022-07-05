import React, { useState } from 'react'
import "../css/Search.css"
import SeriesList from "../SeriesList"
import { useNavigate } from 'react-router-dom';


function Search({ series }) {

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState();
    const [show, setShow] = useState(false);


    function handleChange(event) {
        setSearchInput(event.target.value);
    }

    function search(event) {
        if (event.keyCode === 13) {
            let found = series.filter(serie => serie.name === searchInput);
            if (found.length > 0) {
                navigate(`/info?name=${found[0].name}`, { replace: true })
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

            <div className='cards__container'>
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
        </div>
    )
}

export default Search
