import Loading from '../components/Loading'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import { useEffect } from 'react'
import ErrorCard from '../components/ErrorCard'

const CitiesSection = (props) => {
    
    useEffect(() => {
        props.getCities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (props.success === false) {
        return (
            <ErrorCard />
        )
    }
    if (props.copyCities.length === 0) {
        return (
            <Loading />
        )
    }

    return (
        <div className="sectionCity">
            {
                props.citiesList.length !== 0
                    ?
                    props.citiesList.map(city =>
                        <NavLink key={city._id} className="cityCard" style={{ backgroundImage: `url('${city.photo}')` }} to={`/Cities/${city._id}`}>
                            <div className="cityText">
                                <p>{city.name}</p>
                            </div>
                        </NavLink>
                    )
                    :
                    <div className="nuleCard" key={0} style={{ backgroundImage: `url('./assets/otherimg/nule.png')` }}>
                        <div className="nuleText">
                            <p>The city that you're looking for is not heare</p>
                            <p>Try another one!</p>
                        </div>
                    </div>

            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        citiesList: state.cities.cities,
        copyCities: state.cities.copyCities,
        success: state.cities.success
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSection)
