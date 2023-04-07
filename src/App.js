import { WeatherProvider } from './context/WeatherContext';
import Container from 'react-bootstrap/Container'
import Navbar from './components/Navbar';
import CurrentDayWeather from './components/CurrentDayWeather';
import WeeklyForecast from './components/WeeklyForecast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <WeatherProvider>
      <Container className='pt-4'>
        <ToastContainer position='top-left'/>
        <Navbar/>

        <div className='d-flex flex-column justify-content-between'>
          <CurrentDayWeather/>
          <WeeklyForecast/>
        </div>

      </Container>
    </WeatherProvider>
  );
}

export default App;
