import React from 'react'
import './css/Series.css'
import Series from './Series'


function SeriesList({ series }) {



  
    
    
    if (series !== undefined && series.length > 0) {
        if(series.includes(false)) {
            series = series.filter(serie => serie !== false);
            series = series.slice(0, 35);
        }
        return (
        
            series.map(serie => {
                return <Series key={serie.id} name={serie.name} imgUrl={serie.imgUrl}></Series>
            })

        )
    }


}

export default SeriesList
