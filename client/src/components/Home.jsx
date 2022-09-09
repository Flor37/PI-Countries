import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCountries,
    filterCountriesByContinent,
    filterByActivity,
    orderByName,
    orderByPopulation
} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paging from './Paging';
import SearchBar from './SearchBar';
import style from './Home.module.css'

function Home() {

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    //const [countriesPerPage, setCountriesPerPage] = useState(10)
    const countriesPerPage = currentPage === 1 ? 9 : 10
    let indexOfLastCountry = currentPage * countriesPerPage
    let indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    indexOfLastCountry = currentPage !== 1 ? indexOfLastCountry - 1 : indexOfLastCountry
    indexOfFirstCountry = currentPage !== 1 ? indexOfFirstCountry - 1 : indexOfFirstCountry
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
        document.getElementById('ftCont').selectedIndex = 0
        document.getElementById('ftActivity').selectedIndex = 0
        document.getElementById('selectByName').selectedIndex = 0
        document.getElementById('selectByPop').selectedIndex = 0
        setCurrentPage(1)
    }

    function handleFilterContinent(e) {
        dispatch(filterCountriesByContinent(e.target.value));
        setCurrentPage(1)
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setSort(`Sort ${e.target.value}`)
    }

    function handleOrderByPop(e) {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1)
        setSort(`Sort ${e.target.value}`)
    }

    function handleFilterByActivities(e){
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1)
    }

    return (
        <div className={style.bkg}>            
            <button className={style.btn} onClick={e => { handleClick(e) }}>
                A whole bunch of countries
            </button>
            <Link to='/activity'><button className={style.button}>Go Activities</button></Link>
            <div>
                <select className={style.select} id='ftCont' onChange={e => handleFilterContinent(e)}>
                    <option value='All'>Countries by continent</option>
                    <option value='Africa'>Africa</option>
                    <option value='Antarctica'>Antarctica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                </select>
                <select className={style.select} id='selectByName' onChange={e => handleOrderByName(e)}>
                    <option value=''>Order by name</option>
                    <option value='asc'>Ascendant</option>
                    <option value='desc'>Descendant</option>
                </select>
                <select className={style.select} id='selectByPop' onChange={e => handleOrderByPop(e)}>
                    <option value=''>Order by population</option>
                    <option value='asc'>Ascendant</option>
                    <option value='desc'>Descendant</option>
                </select>
                <select className={style.select} id='ftActivity' onChange={e => handleFilterByActivities(e)}>
                <option value='All'>By activities</option>   
                {
                    activities?.map((a)=>
                    {
                    return( <option value={a} >{a}</option>)
                    })
                }
                </select>
                <SearchBar />
                <Paging
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paging={paging}
                />
                {
                    currentCountries?.map((c) => {
                        return (
                            <fragment>
                                <Link to={'/countries/' + c.id}>
                                    <Card
                                        key={c.id}
                                        flag={c.flag}
                                        name={c.name}
                                        continent={c.continent}
                                        borders={c.borders}
                                        id={c.id}
                                    />
                                </Link>
                            </fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home