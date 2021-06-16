const Slides = ({ city }) => {
    return (
        <div className="imgDiv" style={{ backgroundImage: `url(${city.photo})` }}>
            <div className="cityName">
                <p>{city.name}</p>
            </div>
        </div>
    )
}

export default Slides