const Post = function(props){
    const {data} = props

    return(
        <div className="post" key={data?.title ?? Date.now()}>
            <div className="content">
                <h1>{data?.title}</h1>
                <p>{data?.data}</p>
            </div>
            <div className='imageDiv'>
                {data.imageUrl ? <img src={data.imageUrl}/> : <div className='defaultImage'/>}
            </div>
            <div className='lastPosted'>
                <p>{`Last posted ${data?.postTime ?? 'N/A'} days ago by ${data?.authorName ?? 'N/A'}`}</p>
            </div>
        </div>
    )
}

export default Post