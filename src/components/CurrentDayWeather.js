import { useContext, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import WeatherContext from '../context/WeatherContext'

const CurrentDayWeather = () => {
    
    const { currentDayWeather, currentDayForecast, getWeather } = useContext(WeatherContext)
    
    useEffect(() => {

        if (!currentDayWeather) {
            
            const curSuccess = async (pos) => {
               await getWeather(pos.coords.latitude, pos.coords.longitude)
            }
            
            const curError = (err) => {
                console.log(err)
            }
    
            navigator.geolocation.getCurrentPosition(curSuccess, curError, { })
        }
       
    }, [currentDayWeather, getWeather])

    return (
        
        <div className='mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between mt-5'>
            {currentDayWeather && (
             <div className='d-flex flex-column flex-lg-row position-relative'>
                <div className='text-center text-md-start'>
                    <div>
                        <h2>{currentDayWeather.name}, <span className='text-secondary'>{currentDayWeather.sys.country}</span></h2>
                        <p>{currentDayWeather.weather[0].description.charAt(0).toUpperCase()
                            + currentDayWeather.weather[0].description.slice(1)}</p>
                    </div>

                    <div className='mt-5'>
                        <h1>{Math.round(currentDayWeather.main.temp)} &#8451;</h1>
                        <p className='my-1'>Feels like<span className='text-secondary ms-2 fw-bold '> {Math.round(currentDayWeather.main.feels_like)}&#8451;</span></p>
                        <p className='my-1'>Wind <span className='text-secondary fw-bold ms-2 '>{Math.round(currentDayWeather.wind.speed)} km/h</span></p>
                        <p className='my-1'>Humidity <span className='text-secondary  fw-bold ms-2'>{Math.round(currentDayWeather.main.humidity)}%</span></p>
                    </div>
                </div>

                <div className='d-flex justify-content-center align-items-center ms-0 ms-xl-5'>
                    <img className='current-weather-img my-5 my-md-4' width={240} height={240} src={require(`../icons/${currentDayWeather.weather[0].icon}.png`)} alt="weather" />
                </div>
             </div>
            )}

            {currentDayForecast && (
                <div className='daily-forecast-box ms-md-5'>
                    <div className='forecast-background'></div>
                    <Row className='d-flex align-items-center text-center'>
                        {currentDayForecast.map((weather,idx) => (
                            <Col className='my-3 d-flex flex-column text-center justify-content-center align-items-center'
                             key={idx} xs={6} lg={3}>
                                <small className='text-secondary fw-bold'>
                                    {weather.dt_txt.split(' ')[1].slice(0,5)} <span className='ms-2'>{Math.round(weather.main.temp)} &#8451;</span>
                                </small>
                                <img height={60} width={60} className='mt-2' src={require(`../icons/${weather.weather[0].icon}.png`)} alt="forecast-weather" />
                            </Col>
                        ))}
                    </Row> 
                </div>
            )}
        </div>
    )
}

export default CurrentDayWeather
