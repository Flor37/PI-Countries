import React from 'react'
import style from './Card.module.css'

function Card({ name, flag, continent , borders}) {
  return (
    <div className={style.card}>
      <div>
        <img src={flag} alt='img not found' width='200px' height='125px' />
        <h3>{name}</h3>
        <h5>{continent}</h5>
        <h5>Borders: {borders}</h5>
      </div>
    </div>
  )
}

export default Card