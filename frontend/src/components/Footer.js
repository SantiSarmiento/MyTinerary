import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footernav">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/Cities">Cities</Link>
            </div>
            <div className="socialFooter">
                <div className="socialImg" style={{ backgroundImage: `url('/assets/footer/facebook.png')` }}></div>
                <div className="socialImg" style={{ backgroundImage: `url('/assets/footer/instagram.png')` }}></div>
                <div className="socialImg" style={{ backgroundImage: `url('/assets/footer/wsp.png')` }}></div>
            </div>
            <div className="copy">
                <p className="copyR">&copy;MyTinerary</p>
            </div>
        </div>
    )
}
export default Footer