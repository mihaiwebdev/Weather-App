import { createContext, useState, useCallback } from 'react'
import axios from 'axios'
import { GEO_LOCATION_OPTIONS, GEO_API_URL,
     WEATHER_API_KEY, WEATHER_API_URL } from '../api'


const WeatherContext = createContext()

export const WeatherProvider =  ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [currentDayWeather, setCurrentDayWeather] = useState()
    const [currentDayForecast, setCurrentDayForecast] = useState()
    const [forecastFiveDays, setForecastFiveDays] = useState([])

    const setWeekDay = (day) => {
        switch(day){
            case 1:
                return 'Monday'
            case 2:
                return 'Tuesday'
            case 3:
                return 'Wednesday'
            case 4:
                return 'Thursday'
            case 5:
                return 'Friday'
            case 6:
                return 'Saturday'
            case 0:
                return 'Sunday'
            default:
                return ''
        }
    }


    const getCities = async (city) => {
        setIsLoading(true)

        const cities = []
        const { data } = await axios.get(`${GEO_API_URL}/cities?namePrefix=${city}&limit=5`, GEO_LOCATION_OPTIONS)

        if (data.data && data.data.length > 0 ) {
            data.data.map(city => cities.push({
                coordonates: `${city.latitude} ${city.longitude}`,
                city: `${city.city}, ${city.countryCode}`
            }))

            setIsLoading(false)

        } else {
            cities.push({detail: 'No city found with the given input, try another!'})
            setIsLoading(false)
        }

        return cities

    }

    
    const getWeather = useCallback(async (latitude, longitude) => {
        setIsLoading(true)
        setForecastFiveDays([])

        const currentDate = new Date('2023-04-06 00:00:00')
        const currentWeather = await axios.get(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
        const forecastWeather = await axios.get(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)

        if (currentWeather && forecastWeather) {
            setCurrentDayWeather(currentWeather.data)
            setCurrentDayForecast(forecastWeather.data.list.slice(1, 9))

            forecastWeather.data.list.map(day => {
                const date = new Date(day.dt_txt)

                if ((date.getDate() !== currentDate.getDate())) {
                    if (date.getHours() === 9) {

                            setForecastFiveDays(state => [...state, {
                            'date': date.getDate(),
                            'weekDay': setWeekDay(date.getDay()),
                            'day': date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
                            'month':  (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
                            'temp': day.main.temp_max,
                            'icon': day.weather[0].icon
                        }])
                    } 
                }

                return null
            })

            setIsLoading(false)
        }
    }, [])
    

    return <WeatherContext.Provider value={{
        isLoading,
        currentDayWeather,
        currentDayForecast,
        forecastFiveDays,
        getCities,
        getWeather,
    }}>
        {children}
    </WeatherContext.Provider>
}


export default WeatherContext