import React from 'react'


const FilterForm = props => {

    return(
      <form id="filterForm" onSubmit={e => e.preventDefault()}>
        Filter By Tag:
        <input type="text" name="filter" onChange={props.handleChange}/>
      </form>
    )
}

export default FilterForm