import { Link } from 'react-router-dom'

const CalltoAction = () => {
    return (
        <div className="ctaction">
            <div className="ctaText">
                <div className="ctaButton">
                    <p>Great adventures await for you.</p>
                    <p> What are you waiting for ?</p>
                    <Link to="/Cities" className="linkButtons">Search Cities !!</Link>
                </div>
            </div>
            <div className="ctaimg" style={{ backgroundImage: `url('./assets/otherImg/cataratas.png')` }}></div>
        </div>
    )
}

export default CalltoAction