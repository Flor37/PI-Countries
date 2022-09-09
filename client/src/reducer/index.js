const inicialState = {
    countries: [],
    copyCountries: [],
    detail: [],
    activities:[],
    copySelectCountry:'',
    copyActivities:'',
    copyOrder:''

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
            state.copySelectCountry = action.payload;
            const allCountries = state.copyCountries
            const selectActivities  = state.copyActivities
            let act = []
            let continentsFiltered; 
            if( selectActivities != '' && selectActivities != 'All' ) { 
                allCountries.forEach((f,index)=> {
                    f.actvities.forEach( i => {                 
                         if(i.name  === selectActivities)
                         act.push(allCountries[index]);                
                    })                     
               })
               
            continentsFiltered = action.payload === 'All' ?
            act :  act.filter(c => c.continent === action.payload)
               
            }else{
                continentsFiltered = action.payload === 'All' ?
              allCountries :  allCountries.filter(c => c.continent === action.payload)
            
            }   
               
                //state.countriesByConinent = continentsFiltered;
            return {
                ...state,
                countries: continentsFiltered
            }
        case 'ORDER_BY_NAME':
            state.copyOrder = action.payload;
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
           const activity = action.payload;   
           state.copyActivities = action.payload;
           let dataCountry = state.copyCountries;
           let countriesActivities = [];
           if(state.copySelectCountry != '' &&  state.copySelectCountry != 'All' ){
            dataCountry =  dataCountry.filter(c => c.continent === state.copySelectCountry);              
               
            dataCountry =  activity === 'All' ? dataCountry
             : dataCountry.forEach((f,index)=> {
                f.actvities.forEach( i => {                 
                     if(i.name  === activity)
                         countriesActivities.push(dataCountry[index]);                
                })                     
           })

           }else{
            dataCountry.forEach((f,index)=> {
                f.actvities.forEach( i => {                 
                     if(i.name  === activity)
                         countriesActivities.push(dataCountry[index]);                
                })                     
           })
         }
          state.copyOrder == 'asc' ? countriesActivities.sort((a,b)=> a.name.localeCompare(b.name)):countriesActivities.sort((a,b)=> b.name.localeCompare(a.name)) ;

       
        return{
           ...state,
           countries:countriesActivities
        }
        default:
            return state;
    }
}

export default rootReducer;