import dotenv from 'dotenv'
import {Country, State, City} from 'country-state-city'

dotenv.config()

const api_key = process.env.WEATHER_API_KEY

const countries = City.getCitiesOfState('IN', 'MH')
let contriesName = []

for(let i=0; i < countries.length; i++){
    contriesName.push(countries[i].name)
}

console.log(contriesName);
