import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import CitiesSection from '../components/CitiesSection'

const Cities = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="cityContainer">
                <div className="cityImg" style={{ backgroundImage: `url('https://i.postimg.cc/kgsVNVLq/portadacities.png')` }}>
                </div>
                <h1>Cities</h1>
                <input
                    placeholder="Search cities !!"
                    onChange={props.filterCities}
                ></input>
                <CitiesSection />
            </div>
            <Footer />
        </>
    )
}

const mapDispatchToProps = {
    filterCities: citiesActions.filterCities
}

export default connect(null, mapDispatchToProps)(Cities)