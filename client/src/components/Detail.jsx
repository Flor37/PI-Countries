import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailCountries} from '../actions';
import {useEffect} from 'react';
import style from './Detail.module.css'

function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()

useEffect(() => {
    dispatch(getDetailCountries(props.match.params.id))
},[dispatch])

let theCountry = useSelector ((state) => state.detail)

  return (
    <div className={style.bkg}>
     
        {
            theCountry !== undefined ?
            <div className={style.card}>
                <h1>{theCountry.name}</h1>
                <img src={theCountry.flag} alt='img not found' width='300px' height='200px' />
                <h2>{theCountry.id}</h2>
                <h2>{theCountry.continent}</h2>
                <h3>Capital: {theCountry.capital}</h3>
                <h3>Subregion: {theCountry.subregion}</h3>
                <h3>Area: {theCountry.area} km</h3>
                <h3>Population: {theCountry.population}</h3>
                <h3>Tourist activities: {theCountry.activities != undefined ?  
                theCountry.activities.map(a => a.name + (' ')) :''}</h3> 
           
            </div> : <p>Loading...</p>
        }

        <Link to='/home'>
            <button className={style.button}>Back</button>
        </Link>

    </div>
  )
}

export default Detail