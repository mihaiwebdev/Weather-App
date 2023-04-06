import { useState, useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from '../components/Spinner'

const SearchBox = () => {
    const { getCities, getWeather, isLoading } = useContext(WeatherContext)

    const [city, setCity] = useState('')
    const [cityResult, setCityResult] = useState([])
    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
        
        if (cityResult.length > 0) {
            setShowModal(true)
        }

    }, [cityResult])


    const handleSearch = async () => {
        setCityResult(await getCities(city))
    
    }

    const getCityWeather = async (coordonates) => {
        const [latitude, longitude] = coordonates.split(' ')
        await getWeather(latitude, longitude)
        setShowModal(false)
    }
    
    
    return (
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-between '>
            {isLoading && <Spinner />}
            <h1 className='fs-3 logo-name text-center text-md-start'>Weather forecast</h1>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="Search City"
                aria-label="Search City"
                aria-describedby="basic-addon2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
                <Button variant="secondary" id="button-addon2" onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </InputGroup>

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
        </div>
    )
}

export default SearchBox
