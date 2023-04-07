import { useState, useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from './Spinner'

const Navbar = () => {
    const { getCities, getWeather, isLoading, favCities } = useContext(WeatherContext)

    const [city, setCity] = useState('')
    const [cityResult, setCityResult] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showFavorites, setShowFavorites] = useState(false)

    
    useEffect(() => {
        
        if (cityResult.length > 0) {
            setShowModal(true)
        }
        
    }, [cityResult])


    const handleSearch = async (e) => {
        e.preventDefault()
        setCityResult(await getCities(city))
    
    }

    const getCityWeather = async (coordonates) => {
        const [latitude, longitude] = coordonates.split(' ')
        await getWeather(latitude, longitude)
        setShowModal(false)
        setShowFavorites(false)
    }
    
    
    return (
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-between '>
            {isLoading && <Spinner />}

            <h1 className='logo-name text-center text-md-start'>Weather forecast</h1>

            <div className='d-flex align-items-center'>
                <Form onSubmit={handleSearch}>
                    <InputGroup className="my-3 my-lg-0">
                        <Form.Control
                        placeholder="Search City"
                        aria-label="Search City"
                        aria-describedby="basic-addon2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                        <Button type='submit' variant="secondary" id="button-addon2">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                </Form>


                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Search Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {cityResult && cityResult.map((city,idx) => city.detail ? (<p key={idx}>{city.detail}</p>)
                        : (<Button className='d-block my-2 w-100' 
                            key={idx} variant='light' onClick={() => getCityWeather(city.coordonates)}>
                                {city.city}
                            </Button>))}
                    </Modal.Body>
                </Modal>

                <div className='favorites ms-3 d-flex align-items-center' 
                 onClick={() => setShowFavorites(true)}>
                    <i className=" text-secondary fa-solid fa-star"></i> 
                    <p className='text-secondary fw-bold ms-2'>Favorites</p>
                </div>

                <Modal show={showFavorites} onHide={() => setShowFavorites(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Favorites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {favCities && favCities.map((city,idx) => (
                            <Button className='d-block my-2 w-100' 
                            key={idx} variant='light' onClick={() => getCityWeather(city.coordonates)}
                            >
                                {city.city}
                            </Button>))}
                    </Modal.Body>
                    
                </Modal>
            </div>
        </div>
    )
}

export default Navbar
