import React from 'react'
import './App.css'
import Home from './pages/Home'
import Cities from './pages/Cities'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import City from './pages/City'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AcountSettings from './pages/AcountSettings'
import { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import authorActions from './redux/actions/authorActions'

class App extends React.Component {

  state = {
    user: false
  }

  render() {
    
    if (!this.props.userLogged && localStorage.getItem('token')) {
      const userData = JSON.parse(localStorage.getItem('userLogged'))
      const userLoggedForzed = {
        token: localStorage.getItem('token'),
        ...userData
      }
      this.props.forzedLogin(userLoggedForzed)
    }
    
    return (
      <>
        <BrowserRouter>
          <Toaster />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Cities" component={Cities} />
            <Route exact path="/Cities/:_id" component={City} />
            {!this.props.userLogged && <Route exact path="/SignUp" component={SignUp} />}
            {!this.props.userLogged && <Route exact path="/SignIn" component={SignIn} />}
            {this.props.userLogged && <Route exact path="/acountsettings" component={AcountSettings} />}
            <Redirect to="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    userLogged: state.userLogged.userLogged
  }
}

const mapDispatchToProps = {
  forzedLogin: authorActions.forzedLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
