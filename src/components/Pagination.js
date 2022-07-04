import React from 'react'
import "./css/Pagination.css"

function Pagination({ prevPage, nextPage, pageNum }) {
    let hidePrev = "";
    let hideNext = "";

    if (prevPage === null) {
        hidePrev = " hide";
    }

    if(nextPage === null) {
        hideNext = " hide";
    }

    return (
        <div className='btn_container'>
            <button onClick={prevPage} className={'btn left' + hidePrev}></button>
            <div className='page_number'>{pageNum + 1}</div>
            <button onClick={nextPage} className={'btn right' + hideNext}></button>
        </div>
    )
}

export default Pagination
