import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import authorActions from '../redux/actions/authorActions'
import toast from 'react-hot-toast'
import GoogleLogin from 'react-google-login'

const SignIn = (props) => {
    const [userToLogin, setlogIn] = useState({ email: '', password: '', googleUser: false })

    useEffect(() => {
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setlogIn({
            ...userToLogin,
            [name]: value
        })
    }

    const signIn = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let user = e ? userToLogin : googleUser
        const response = await props.logInUser(user)
        if (response) {
            toast.error(response.error)
        }
    }

    const responseGoogle = (response) => {
        if (response.profileObj.email) {
            signIn(null, { email: response.profileObj.email, password: 'a' + response.profileObj.googleId, googleUser: true })
        }
    }

    const keyPress = (e) => {
        e.key === 'Enter' && signIn()
    }

    return (
        <>
            <Header />
            <div className="signUpContainer" style={{ backgroundImage: `url('./assets/user/background.png')` }}>
                <form className="form">
                    <h1>SIGN IN</h1>
                    <input type="text" placeholder="MY E-MAIL" className="input" name="email" value={userToLogin.email} onChange={readInput} />
                    <input type="password" placeholder="MY PASSWORD" className="input" name="password" value={userToLogin.password} onChange={readInput} />
                    <button onKeyPress={keyPress} className="signupButton" onClick={signIn}>SIGN IN</button>
                    <div className="formbottom">
                        <p>You do not have an account ? <Link to="/SignUp">Sign up here !</Link></p>
                        <p>Sign in with Google</p>
                    </div>
                    <GoogleLogin
                        className="google"
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        buttonText="Sign in with Google"
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
    logInUser: authorActions.logInUser
}

export default connect(null, mapDispatchToProps)(SignIn)