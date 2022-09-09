import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getCountries } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './ActivityCreate.module.css'

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Please, write a name'
    } else if (!input.duration) {
        errors.duration = 'Please, indicate the duration'
    }
    return errors;
}

function ActivityCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        seasson: '',
        country: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelectDiff(e) {      
            setInput({
                ...input,
                difficulty: e.target.value
            })        
    }

    function handleSelectSeason(e) {       
            setInput({
                ...input,
                seasson: e.target.value
            })        
    }

    function handleSelectCountry(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(postActivity(input))
        dispatch(postActivity(input))
        alert('Activity created succesfully')
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            seasson: '',
            country: []
        })
        history.push('/home')
    }

    function handleDelete(c) {
        setInput({
            ...input,
            country: input.country.filter(e => e !== c)
        })
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    return (
        <div className={style.bkg}>
           
            <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                 <Link to='/home'><button className={style.button}>Back</button></Link>
                    <button className={style.button} type='submit'>Create activity</button>
                </div>
            <h1 className={style.tit}>Create a new tourist activity:</h1>
                <div>
                    <label className={style.tex}>Name: </label>
                    <input type='text' value={input.name} name='name' onChange={handleChange} />
                    {errors.name && (<p className={style.err}>{errors.name}</p>)}
                </div>
                <div>
                    <label className={style.tex}>Duration: </label>
                    <input type='text' value={input.duration} name='duration' onChange={handleChange} />
                    <label className={style.tex}>min</label>
                    {errors.duration && (<p className={style.err}>{errors.duration}</p>)}
                </div>
                <div>
                    <select className={style.select} id='difficulty' name='difficulty' onChange={(e) => handleSelectDiff(e)}>
                    <option value=''>Choose a difficulty</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    </select>
                </div>

                <div>
                    <select className={style.select} id='seasson' name='seasson' onChange={(e) => handleSelectSeason(e)}>
                        <option value=''>Select a season</option>
                        <option value='Spring'>Spring</option>
                        <option value='Summer'>Summer</option>
                        <option value='Fall'>Fall</option>
                        <option value='Winter'>Winter</option>
                    </select >
                </div >
                {
                input.country.map(c =>
                    <div>
                        <p className={style.card}>{c}</p>
                        <button className={style.lbutton} onClick={() => handleDelete(c)}>x</button>
                    </div>)
            }
                <div>
                    <select className={style.select} id='country' name='country' onChange={(e) => handleSelectCountry(e)}>
                        <option value=''>Select the countries</option>
                        {
                            countries.map((c) => (<option value={c.name}>{c.name}</option>))
                        }
                    </select>
                </div>
            </form >     
        </div >
    )
}

export default ActivityCreate