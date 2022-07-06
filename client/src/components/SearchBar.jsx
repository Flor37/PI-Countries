import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries } from '../actions';
import style from './SearchBar.module.css'

function SearchBar() {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleOnSearch(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        // setName('')
        document.getElementById('search').value=''
    }
    
    function handleKeyPress(e){        
        if(e.key === 'Enter')
        handleOnSearch(e)
    }

    return (
        <div>
            <input className={style.input} id='search' 
            type='text' 
            placeholder='Search...' 
            onChange={(e) => handleInputChange(e)}
            onKeyPress= {(e) => {handleKeyPress(e)}}
            />
            <button className={style.button} type='submit' onClick={(e) => handleOnSearch(e)}>Search</button>
        </div>
    )
}

export default SearchBar