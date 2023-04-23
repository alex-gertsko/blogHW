function WeatherDiv(props){
    return (
        <div className="weatherDiv">
            <label>{props.name}</label>
            <div className="spaceDiv"/>
            <label>{props.temp ? `${props.temp}℃` : ''}</label>
            <label>{props.desc ? props.desc.toUpperCase() : ""}</label>
            <label>{props.feelsLike ? `feels like ${props.feelsLike}℃` : ''}</label>
        </div>
    )
}

export default WeatherDiv