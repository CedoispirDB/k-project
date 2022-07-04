import React, { useState, useEffect } from 'react'
import "../css/Search.css"
import SeriesList from "../SeriesList"
import { useNavigate } from 'react-router-dom';


function Search({ series }) {

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState();
    const [randomSeries, setRandomSeries] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        setRandomSeries(createRandomSeries());
    }, [run]);

    function handleChange(event) {
        setSearchInput(event.target.value);
    }

    function search(event) {
        if (event.keyCode === 13) {
            let found = series.filter(serie => serie.name === searchInput);
            if (found.length > 0) {
                navigate(`/info?name=${found[0].name}`, { replace: true })
            }
        }
    }


    function createRandomSeries() {
        let newSeries = [];

        if (series.length > 0) {
            for (var i = 0; i < 35; i++) {
                let random = series[Math.floor(Math.random() * series.length)];
                if (!newSeries.includes(random)) {
                    newSeries.push(random);
                }
            }

            return newSeries;
        } else {
            setRun(!run);
        }

    }



    return (
        <div className='search_container'>
            <div className='search_bar_container'>
                <input className='search_bar' onKeyDown={search} onChange={handleChange}></input>
            </div>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='grid_container'>
                        <SeriesList series={randomSeries} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Search
