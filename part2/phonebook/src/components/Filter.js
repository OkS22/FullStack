import React from 'react'

const Filter = ({newFilter,handleFilterChange}) => {
    return(
        <div>
            <ul>
            Filter (names contain the filter ) <input value={newFilter} onChange={handleFilterChange}/>
            </ul>
        </div>
        )
    }

export default Filter