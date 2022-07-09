import React from 'react'
import { Link } from 'react-router-dom'

function Series({ name, imgUrl}) {

    function handleClick() {
        window.scrollTo(0, 0)
    }

  
    return (
        <>
            <li className='series__items' >
                <Link to={'/info?name=' + name} className='serie_link' onClick={handleClick}>
                    <figure>
                        <img src={imgUrl} alt={name + "_img"} className='serie_img'></img>
                        <h3 className='serie_name'>{name}</h3>
                    </figure>
                </Link>
            </li>
        </>
    )
}

export default Series
