import React from 'react'
import style from './Paging.module.css'

function Paging({ countriesPerPage, allCountries, paging }) {
    const pageNumbers = []
    
    //for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
    for (let i = 1; i <= Math.ceil( ((allCountries-9) / 10)+1); i++) {
        pageNumbers.push(i)
    }
    return(
        <div>
            <nav>
                <ul className='paging'>
                    {
                        pageNumbers &&
                        pageNumbers.map(num => (
                            <button className={style.button} onClick= {() => paging(num)}>{num}</button>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Paging