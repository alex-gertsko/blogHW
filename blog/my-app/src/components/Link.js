const Link = function(props){
    const {title, links} = props
    const isLinkArray = Array.isArray(links)
    
    return (
        <div className='linkDiv' key={title}>
            <h1>{title}</h1>
            {isLinkArray ? links.map(link => mapLinks(link)) : 'no links'}
            <div className="separatorDiv" />
        </div>
    )
}



const mapLinks = link => {
    const {title, url, urlDesc} = link
    if (!title){
        return
    }
    return (
        <div className='link' key={title}>
            <span>{title}</span>
            <a href={url}>{urlDesc ?? 'click here'}</a>  
        </div>
    )
}

export default Link