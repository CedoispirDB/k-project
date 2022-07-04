import React from 'react'
import { Link } from 'react-router-dom'

function Series({ name, imgUrl }) {

    if(imgUrl.includes("localhost")) {
        imgUrl = "http://192.168.0.120:4800/img";
    }

    return (
        <>
            <li className='cards__items' >
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
