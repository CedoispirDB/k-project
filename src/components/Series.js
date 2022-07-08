import React from 'react'
import { Link } from 'react-router-dom'

function Series({ name, imgUrl}) {

  
    return (
        <>
            <li className='series__items' >
                <Link to={'/info?name=' + name} className='serie_link'>
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
