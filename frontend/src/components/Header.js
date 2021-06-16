import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import authorActions from '../redux/actions/authorActions'

const Header = (props) => {
    const photo = props.userLogged.userLogged ? props.userLogged.userLogged.photoUrl : "https://i.postimg.cc/902BsHM2/login.png"
    const userName = props.userLogged.userLogged && props.userLogged.userLogged.firstName

    return (
        <div className="headerNav">
            <Navbar collapseOnSelect expand="lg" className="navbar-dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <NavLink className="navlink" to="/">Home</NavLink>
                        <NavLink className="navlink" to="/Cities">Cities</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="userName">
                {userName && <p className="welcome">Welcome {userName} </p>}
                <NavDropdown
                    title={
                        <div className={props.userLogged.userLogged ? "loginImgUser" : "loginImg"} style={{
                             backgroundImage: `url('${photo}')` 
                        }}></div>
                    }
                    id="basic-nav-dropdown">
                    <div className="headerDropdown">
                        {
                            !props.userLogged.userLogged &&
                            (
                                <>
                                    <NavLink className="userLink" to="/SignIn">Sign In</NavLink>
                                    <NavLink className="userLink" to="/SignUp">Sign Up</NavLink>
                                </>
                            )
                        }
                        {
                            props.userLogged.userLogged &&
                            <>
                                <p className="signout" onClick={props.signout}>Sing Out</p>
                                <NavLink className="userLink" to="/acountsettings">Acount Settings</NavLink>
                            </>
                        }
                    </div>
                </NavDropdown>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.userLogged
    }
}

const mapDispatchToProps = {
    signout: authorActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)