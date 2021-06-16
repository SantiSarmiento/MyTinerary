import itinerariesActions from '../redux/actions/itinerariesActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import Itinerary from '../components/Itinerary'

const ItineraryContainer = (props) => {
    useEffect(() => {
        props.getItineraries(props.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                props.itinerariesList.length === 0
                    ?
                    <div className="nuleCard" key={0} style={{ backgroundImage: `url('../assets/otherimg/nule2.png')` }}>
                        <div className="nuleText">
                            <p>We don't have any itineraries yet, do you want to be the first?</p>
                        </div>
                    </div>
                    :
                    props.itinerariesList.map(itinerary => {
                        return (
                            <Itinerary key={itinerary._id} itinerary={itinerary} userLogged={props.userLogged} />
                        )
                    })
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        itinerariesList: state.itineraries.itineraries,
        copyItineraries: state.itineraries.copyItineraries,
        userLogged: state.userLogged
    }
}
const mapDispatchToProps = {
    getItineraries: itinerariesActions.getItineraries
}
export default connect(mapStateToProps, mapDispatchToProps)(ItineraryContainer)
