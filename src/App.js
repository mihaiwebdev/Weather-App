import { WeatherProvider } from './context/WeatherContext';
import Container from 'react-bootstrap/Container'
import SearchBox from './components/SearchBox';
import CurrentDayWeather from './components/CurrentDayWeather';
import WeeklyForecast from './components/WeeklyForecast';


function App() {

  return (
    <WeatherProvider>
      <Container className='pt-4'>

        <SearchBox/>

        <div className='d-flex flex-column justify-content-between'>
          <CurrentDayWeather/>
          <WeeklyForecast/>
        </div>

      </Container>
    </WeatherProvider>
  );
}

export default App;
