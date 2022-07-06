const inicialState = {
    countries: [],
    copyCountries: [],
    detail: [],
    activities:[],
    countriesByConinent:[],
    copyActivities:[]

}

function rootReducer(state = inicialState, action) {
    switch (action.type) {
        case 'GET_COUNTRIES':
          let  activites = []
           action.payload.forEach(c=> {
            c.actvities.forEach(a=>  {
                if(a.name !== null && activites.length === 0) activites.push(a.name);
               
                if(a.name !== null && !(activites.some(s=> s === a.name ))) activites.push(a.name);

            }) 
        });   
        state.activities = activites;           
          return {
                ...state,
                countries: action.payload,
                copyCountries: action.payload
            }
        case 'FILTER_BY_CONTINENT':
           const selectActivities =  state.copyActivities
            const allCountries = state.copyCountries

            const continentsFiltered = action.payload === 'All' ?
                allCountries : selectActivities.length > 0 ?  selectActivities.filter(c => c.continent === action.payload)
                : allCountries.filter(c => c.continent === action.payload)
               
                  
                
               
                state.countriesByConinent = continentsFiltered;
            return {
                ...state,
                countries: continentsFiltered
            }
        case 'ORDER_BY_NAME':
            let countriesOrdered = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0
                })
            return {
                ...state,
                countries: countriesOrdered
            }
        case 'ORDER_BY_POPULATION':
            let countries_Ordered = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return 1;
                    if (a.population < b.population) return -1;
                    return 0
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return -1;
                    if (a.population < b.population) return 1;
                    return 0
                })
            return {
                ...state,
                countries: countries_Ordered
            }
        case 'GET_NAME_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }
        case 'POST_ACTIVITY':
            return {
                ...state
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'FILTER_BY_ACTIVITY':
           const activity = action.payload          
           let countriesActivities;
           switch(activity){
               case 'All':
                countriesActivities = state.copyCountries; 
                break;
                default:
                    countriesActivities = [];
                    const countries = state.countriesByConinent.length > 0 ? 
                    state.countriesByConinent : 
                    state.copyCountries;   
                    countries.forEach((f,index)=> {
                        f.actvities.forEach( i => {                 
                             if(i.name  === activity)
                                 countriesActivities.push(countries[index]);                
                        })                     
                   })
                    break;
                
           }      
          state.copyActivities = countriesActivities;
       
        return{
           ...state,
           countries:countriesActivities
        }
        default:
            return state;
    }
}

export default rootReducer;