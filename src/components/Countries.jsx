import React from 'react'

const Countries = ({names,handleClick}) => {
  return (
    <li>
        {names} <button onClick={handleClick}>show</button>
    </li>
  )
}

export default Countries