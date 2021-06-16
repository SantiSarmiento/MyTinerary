import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import ItineraryContainer from "../components/ItineraryContainer"
import Loading from "../components/Loading"

const City = (props) => {
    const [city, setCity] = useState({})
    const [loader, setLoader] = useState(true)
    const id = props.match.params._id

    useEffect(() => {
        window.scrollTo(0, 0)
        if (props.citiesList.length === 0) {
            props.getCities()
        }
        if (props.citiesList.length !== 0) {
            const cityToSearch = props.citiesList.filter(city => city._id === id)
            setCity(cityToSearch[0])
            setLoader(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.citiesList])

    return (
        <>
            <Header />
            {
                loader
                    ?
                    (
                        <div className="itineraryloading">
                            <Loading />
                        </div>
                    )
                    : (
                        <div key={city._id} className="itineraryContainer">
                            <div className="itineraryImg" style={{ backgroundImage: `url('${city.photo}')` }}>
                            </div>
                            <h1>Available Itineraries for {city.name}</h1>
                            <ItineraryContainer id={id} />
                            <div className="buttonsContainer">
                                <Link className="linkButtons" to="/Cities">Back to Cities</Link>
                                <Link className="linkButtons" to="/">Back to Home</Link>
                            </div>
                        </div>
                    )
            }
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        citiesList: state.cities.cities
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities
}

export default connect(mapStateToProps, mapDispatchToProps)(City)