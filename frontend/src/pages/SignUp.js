import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { connect } from 'react-redux'
import authorActions from '../redux/actions/authorActions'
import GoogleLogin from 'react-google-login'

const SignUp = (props) => {
    const [options, setOptions] = useState([])
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', photoUrl: '', country: '' })
    const [error, setError] = useState({})

    const errorsImput = { firstName: null, lastName: null, email: null, password: null, photoUrl: null, country: null }

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setOptions(response.data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const sendNewUser = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let user = e ? newUser : googleUser
        const response = await props.createUser(user)
        if (response) {
            if (response.error.details) {
                response.error.details.map(error => {
                    errorsImput[error.context.label] = error.message
                    return null
                })
            } else {
                toast.error(response.error)
            }
            setError(errorsImput)
        }
    }

    const responseGoogle = (response) => {
        const { givenName, familyName, email, googleId, imageUrl } = response.profileObj
        sendNewUser(null, { firstName: givenName, lastName: familyName, email: email, photoUrl: imageUrl, password: 'a' + googleId, googleUser: true })
    }

    const keyPress = (e) => {
        e.key === 'Enter' && sendNewUser()
    }

    return (
        <>
            <Header />
            <div className="signUpContainer" style={{ backgroundImage: `url('./assets/user/background.png')` }}>
                <form className="form">
                    <h1>SIGN UP</h1>
                    <input type="text" className={error.firstName ? "errorInput" : "input"} placeholder="MY FIRST NAME" name="firstName" value={newUser.firstName} onChange={readInput} />
                    {error.firstName && <small>{error.firstName}</small>}
                    <input type="text" className={error.lastName ? "errorInput" : "input"} placeholder="MY FIRST LAST NAME" name="lastName" value={newUser.lastName} onChange={readInput} />
                    {error.lastName && <small>{error.lastName}</small>}
                    <input type="text" className={error.email ? "errorInput" : "input"} placeholder="MY E-MAIL" name="email" value={newUser.email} onChange={readInput} />
                    {error.email && <small>{error.email}</small>}
                    <input type="password" className={error.password ? "errorInput" : "input"} placeholder="MY PASSWORD" name="password" value={newUser.password} onChange={readInput} />
                    {error.password && <small>{error.password}</small>}
                    <input type="text" className={error.photoUrl ? "errorInput" : "input"} placeholder="PHOTO URL" name="photoUrl" value={newUser.photoUrl} onChange={readInput} />
                    {error.photoUrl && <small>{error.photoUrl}</small>}
                    <select name="country" value={newUser.country} onChange={readInput} className={error.country ? "errorInput" : "select"}>
                        <option>CHOOSE YOUR COUNTRY</option>
                        {
                            options.map(option => <option key={option.name} value={option.name}>{option.name}</option>)
                        }
                    </select>
                    {error.country && <small>{error.country}</small>}
                    <button className="signupButton" onKeyPress={keyPress} onClick={sendNewUser}>SIGN UP</button>
                    <div className="formbottom">
                        <p>Already have an account? <Link to="/signin">Sign in here !</Link></p>
                        <p>Or you can sign up with Google</p>
                    </div>
                    <GoogleLogin
                        className="google"
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        buttonText="Sign Up with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    
                </form>
            </div>
            <Footer />
        </>
    )
}

const mapDispatchToProps = {
    createUser: authorActions.createUser
}

export default connect(null, mapDispatchToProps)(SignUp)