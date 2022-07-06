import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'


function LandingPage() {
  return (
    <div className={style.bkg}>
      <div className={style.container}>
        <h1>World's continents</h1>
        <Link to='/home'>
          <button className={style.button}>Go!</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage