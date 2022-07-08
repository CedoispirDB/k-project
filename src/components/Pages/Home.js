import React, {}  from 'react'
import Pagination from '../Pagination'
import SeriesList from '../SeriesList'
import {  useLocation } from 'react-router-dom'


function Home({ series, prevPage, nextPage, pageNum }) {

 

  return (
    <>
      <div className='series'>
        <div className='series__container'>
          <div className='series__wrapper'>
            <ul className='grid_container' >
              <SeriesList series={series.slice(35 * pageNum, 35 * (pageNum + 1))} />
            </ul>
            <Pagination prevPage={prevPage} nextPage={nextPage} pageNum={pageNum} />

          </div>

        </div>

      </div>

    </>
  )
}

export default Home
