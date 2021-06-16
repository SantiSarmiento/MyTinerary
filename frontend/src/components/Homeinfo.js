const HomeInfo = () => {
    return (
        <div className="homeInfo">
            <div className="logoContainer">
                <div className="logoImg" style={{ backgroundImage: `url('./assets/otherImg/logo.png')` }}></div>
                <h1 className="h1Home">MyTinerary!</h1>
            </div>
            <h2 className="heroWelcome">Find your perfect trip, designed by insiders who know and love their cities!</h2>
        </div>
    )
}

export default HomeInfo