import { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'


const WeeklyForecast = () => {

    const { forecastFiveDays } = useContext(WeatherContext)
    
    return (
        <div className='my-5'>
            {forecastFiveDays.length > 0 && (
                <>
                    <h3 className='text-center text-lg-start'>Weekly Forecast</h3>
                    <div className='mt-3 week-forecast-row'>
                        {forecastFiveDays.map((day,idx) => (
                            <div key={idx} className='forecast-day-card py-5 mx-4 d-flex flex-column justify-content-center align-items-center text-center'>
                                <small className='text-secondary fw-bold'>{day.weekDay} {day.day}.{day.month}</small>

                                <img width={90} height={90} className='my-3' src={require(`../icons/${day.icon}.png`)} alt="forecast-weather" />

                                <div className='d-flex justify-content-between'>
                                    <p className='fw-bold'>{Math.round(day.temp)} &#8451;</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </>
            )}
           
        </div>
    )
}

export default WeeklyForecast
