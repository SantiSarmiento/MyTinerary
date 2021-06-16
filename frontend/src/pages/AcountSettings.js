import { connect } from "react-redux"
import Header from "../components/Header"
import Footer from '../components/Footer'
import authorActions from "../redux/actions/authorActions"
import { useState } from "react"
import toast from 'react-hot-toast'

const AcountSettings = (props) => {

    let [data, setData] = useState({})
    const [oldPassword, setOldPassowrd] = useState("")

    const userData = e => {
        const text = e.target.value
        const name = e.target.name
        if (name === "oldPassword") {
            setOldPassowrd({
                [name]: text
            })
        } else {

            setData({
                [name]: text
            })
        }
    }

    const sendData = async () => {

        const response = await props.userData({
            data,
            email: props.userLogged.email,
            token: localStorage.getItem('token'),
            oldPassword
        })
        if (response) {
            props.dataUpdate(response)
            toast.success("The changes were saved")
            setData({})
        }
    }

    return (
        <>
            <Header />
            <div className="settingsContainer">
                <div className="datacontainer">
                    <h1>My data</h1>


                    <div className="settingsPhoto">
                        <div className="dataType">
                            <p>First name:</p>
                        </div>
                        <div className="dataValue">
                            <p>{props.userLogged.firstName}</p>
                        </div>
                        <div className="flecha" style={{ backgroundImage: `url('./assets/otherimg/flecha.png')` }}>
                        </div>
                    </div>
                    <div>
                        <input className="inputChange" type="text" placeholder="New first name" name="firstName" onChange={userData}></input>
                        <button onClick={sendData}>Change</button>
                    </div>

                    <div className="settingsPhoto">
                        <div className="dataType">
                            <p>Last name:</p>
                        </div>
                        <div className="dataValue">
                            <p>{props.userLogged.lastName}</p>
                        </div>
                        <div className="flecha" style={{ backgroundImage: `url('./assets/otherimg/flecha.png')` }}>
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder="New last name" name="lastName" onChange={userData}></input>
                        <button onClick={sendData}>Change</button>
                    </div>


                    <div className="settingsPhoto">
                        <div className="dataType">
                            <p>Photo:</p>
                        </div>
                        <div className="loginImg" style={{ backgroundImage: `url('${props.userLogged.photoUrl}')` }}></div>
                        <div className="flecha" style={{ backgroundImage: `url('./assets/otherimg/flecha.png')` }}>
                        </div>
                    </div>
                    <div className="inputsChange">
                        <input type="text" placeholder="New photo URL" name="photoUrl" onChange={userData}></input>
                        <button onClick={sendData}>Change</button>
                    </div>


                    <div className="settingsPhoto">
                        <div className="dataType">
                            <p>Email: </p>
                        </div>
                        <div className="dataValue">
                            <p>{props.userLogged.email}</p>
                        </div>
                        <div className="flecha" style={{ backgroundImage: `url('./assets/otherimg/flecha.png')` }}>
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder="New email" name="email" onChange={userData}></input>
                        <button onClick={sendData}>Change</button>
                    </div>

                    <div>
                        <div className="settingsPhoto">
                            <div className="dataType">
                                <p>Password: </p>
                            </div>
                            <div className="dataValue">
                                <p>*************</p>
                            </div>
                            <div className="flecha" style={{ backgroundImage: `url('./assets/otherimg/flecha.png')` }}>
                            </div>
                        </div>
                    <div>
                        <input type="password" placeholder="old password" name="oldPassword" onChange={userData} />
                        <input type="password" placeholder="New password" name="password" onChange={userData}></input>
                        <button onClick={sendData}>Change</button>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.userLogged.userLogged
    }
}

const mapDispatchToProps = {
    userData: authorActions.userData,
    dataUpdate: authorActions.dataUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(AcountSettings)