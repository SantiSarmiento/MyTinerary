import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import itinerariesActions from '../redux/actions/itinerariesActions'
import swal from 'sweetalert'
import toast from 'react-hot-toast'


const Comment = (props) => {
    const [user, setUser] = useState(false)
    const data = { commentId: props.comment._id, itineraryId: props.itinerary, token: localStorage.getItem('token') }
    const [input, setInput] = useState(false)
    const [commentEdit, setCommentEdit] = useState(props.comment.comment)

    useEffect(() => {
        if (props.userLogged.userLogged !== null) {
            if (props.userLogged.userLogged._id === props.comment.user._id) {
                setUser(true)
            }
        } else {
            setUser(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userLogged.userLogged])

    const readInput = e => {
        const text = e.target.value
        setCommentEdit(text)
    }

    const sendComment = () => {
        if (commentEdit.trim() !== props.comment.comment) {
            const token = localStorage.getItem('token')
            const editData = { ...data, commentEdit, token }
            props.editMessage(editData)
        }
        setInput(!input)
    }

    const keyPress = (e) => {
        e.key === 'Enter' && sendComment()
    }

    const confirmDeleteMessage = () => {
        swal("Are you sure you want to delete the comment?", {
            buttons: {
                goback: {
                    text: "go back",
                    value: "goback",

                },
                confirm: {
                    text: "Delete",
                    value: "confirm"
                }
            },
        })
            .then((value) => {
                switch (value) {
                    case "confirm":
                        props.deleteComment(data);
                        toast.success("Comment was deleted");
                        break;

                    default:
                        break;
                }
            });
    }

    const cancel = () =>{
        setCommentEdit(props.comment.comment)
        setInput(!input)
    }

    return (
        <>
            <div className="comment">
                <div className="commentText">
                    <div className="iconsContainer">
                        {
                            user &&
                            <>
                                {input ? <div className="commentsIcons" onClick={() => setInput(sendComment)} style={{ backgroundImage: `url('../assets/itinerary/lapiz.png')` }}></div> : <div className="commentsIcons" onClick={() => setInput(!input)} style={{ backgroundImage: `url('../assets/itinerary/lapiz.png')` }}></div>}
                                {input ? <div className="commentsIcons" onClick={cancel} style={{ backgroundImage: `url('../assets/itinerary/cruz.png')` }}></div> : <div className="commentsIcons" onClick={confirmDeleteMessage} style={{ backgroundImage: `url('../assets/itinerary/cruz.png')` }}></div>}
                            </>
                        }

                    </div>
                    <div className="userPhotoContainer">
                        <div className="userPhoto" style={{ backgroundImage: `url('${props.comment.user.photoUrl}')` }}></div>
                        <p className="user">{props.comment.user.firstName} {props.comment.user.lastName}:</p>
                    </div>
                    {input ? <input onKeyPress={keyPress} onChange={readInput} className="editInput" name="editInput" value={commentEdit} autoFocus /> : <p className="userComment">{props.comment.comment}</p>}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.userLogged
    }
}

const mapDispatchToProps = {
    editMessage: itinerariesActions.editMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)