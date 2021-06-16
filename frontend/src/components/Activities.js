const Activities = (activity) => {
    return(
        <div className="activity" style={{backgroundImage:`url('${activity.activity.photo}')`}}>
            <h3>{activity.activity.tittle}</h3>
        </div>
    )
}

export default Activities