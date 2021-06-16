import { useState } from 'react'
import Activities from './Activities'
import axios from 'axios'
import Loading from '../components/Loading'
import Comment from '../components/Comment'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import toast from 'react-hot-toast'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick"

const Itinerary = (props) => {
    const [display, setDisplay] = useState(false)
    const [activities, setActivities] = useState([])
    const [loader, setLoader] = useState(true)
    const [message, setMessage] = useState('')
    const itineraryId = props.itinerary._id
    const userId = props.userLogged.userLogged && props.userLogged.userLogged._id
    const data = { itineraryId, userId }
    const [flag, setFlag] = useState(false)

    const readInput = (e) => {
        const text = e.target.value
        setMessage(text)
    }

    const sendMessage = async () => {
        if (message.trim() !== '') {
            const data = { message: message, id: props.itinerary._id, token: localStorage.getItem('token') }
            await props.sendComment(data)
            setMessage('')
        } else {
            toast.error("You cant send and empyt comment")
        }
    }

    function changeView() {
        setDisplay(!display)
        if (!display && activities.length === 0) {
            axios.get('https://mytinerarysarmiento.herokuapp.com/api/activities/' + props.itinerary._id)
                .then(response => setActivities(response.data.response.activities), setLoader(false))
        }
    }

    const deleteComment = async (data) => {
        props.deleteComment(data)
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        rows: 1,
        arrows: false,
    }

    const setLike = async () => {
        if (props.userLogged.userLogged) {
            if (!flag) {
                setFlag(true)
                if (props.itinerary.likes.find(like => like.user === props.userLogged.userLogged._id)) {
                    const response = await props.deleteLike(data)
                    if (response) {
                        setFlag(false)
                    }
                } else {
                    const response = await props.putLike(data)
                    if (response) {
                        setFlag(false)
                    }
                }
            }
        } else {
            toast.error("You must be logged to like a itinerary")
        }
    }

    const keyPress = (e) => {
        e.key === 'Enter' && sendMessage()
    }

    const hearth = props.userLogged.userLogged && props.itinerary.likes.find(like => like.user === props.userLogged.userLogged._id) ? '/assets/itinerary/corazonLleno.png' : '/assets/itinerary/corazon.png'

    return (
        <div className="itinerary">
            <h2 className="itineraryTittle">{props.itinerary.tittle}</h2>
            <div className="itineraryPhoto" style={{ backgroundImage: `url('${props.itinerary.authorPhoto}')` }}></div>
            <h3 className="itineraryName">{props.itinerary.authorName}</h3>
            <div className="itineraryIconsContainer">
                <div className="iconsText">
                    <h4>{props.itinerary.likes.length}</h4>
                    <div className="itineraryIcons likes" style={{
                        backgroundImage: `url('${hearth}')`
                    }} onClick={setLike}></div>
                </div>
                <div className="iconsText">
                    <h4>Price: </h4>
                    <div className="icons">
                        {
                            [...Array(props.itinerary.price)].map((money, index) => <div key={index} className="itineraryIcons" style={{ backgroundImage: `url('/assets/itinerary/billete.png')` }}></div>)
                        }
                    </div>
                </div>
                <div className="iconsText">
                    <h4>Durattion: {props.itinerary.duration} hs </h4>
                </div>
            </div>
            <div className="hashtagcontainer">
                {
                    props.itinerary.hashTags.map((hashTag, index) => <p key={index}>#{hashTag}</p>)
                }
            </div>
            <div className={display ? "initial" : "none"}>
                <div className="activitiesContainer">
                    <h2>Activities</h2>
                    <div className="underConstruction">
                        {
                            loader
                                ?
                                <Loading />
                                :
                                <Slider {...settings}>
                                    {
                                        activities.map(activity => <Activities key={activity._id} activity={activity} />)
                                    }
                                </Slider>
                        }
                    </div>
                </div>
                <div className="commentsContainer">
                    <div className="prueba">
                        <h2>Comments</h2>
                        <div className="comments">
                            {
                                props.itinerary.comments.map(comment => <Comment key={comment._id} comment={comment} itinerary={props.itinerary._id} deleteComment={deleteComment} />)
                            }
                        </div>
                        <div className="sendComment">
                            <input type="text" name="send" value={message} onKeyPress={keyPress} onChange={readInput} placeholder={props.userLogged.userLogged ? "Leave a comment.." : "You must be logged to comment"} className="commentInput" autoComplete="off" disabled={!props.userLogged.userLogged && true} />
                            <button className="send" onClick={sendMessage} style={{ backgroundImage: `url('../assets/itinerary/send.png')` }} disabled={props.userLogged.userLogged ? false : true} ></button>
                        </div>

                    </div>
                </div>
            </div>
            <button className="itineraryButton" onClick={changeView}>{display ? "View less" : "View more"}</button>
        </div>
    )
}

const mapDispatchToProps = {
    sendComment: itinerariesActions.sendComment,
    deleteComment: itinerariesActions.deleteComment,
    putLike: itinerariesActions.putLike,
    deleteLike: itinerariesActions.deleteLike
}

export default connect(null, mapDispatchToProps)(Itinerary)