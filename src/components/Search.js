/* eslint-disable no-undef */

import React from 'react'

const Search = ({actions,str}) => {
  

  
  return (
    <div className='searchWorker'>
      <input 
             ref={(input) => this.input = input}
             onChange = {() => actions.SearchName( this.input.value.toUpperCase())}
             placeholder='Поиск'
             defaultValue = {str}
              />

    </div>
  )
  
}
export default Search