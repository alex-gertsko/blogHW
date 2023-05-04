import { useNavigate  } from "react-router-dom"
const Post = function(props){
    const navigate = useNavigate();
    const {data} = props
    const url = '/post/'
    
    return(
        <div className="post" key={data?.title + data.index ?? Date.now()} onClick={()=>navigate(url+data.id)}>
            <div className="content">
                <h1>{data?.title}</h1>
                <p>{data?.data}</p>
            </div>
            <div className='imageDiv'>
                {data.imageUrl ? <img src={data.imageUrl} alt=''/> : <div className='defaultImage'/>}
            </div>
            <div className='lastPosted'>
                <p>{`Last posted ${data?.postTime ?? 'N/A'} days ago by ${data?.authorName ?? 'N/A'}`}</p>
            </div>
        </div>
    )
}

export default Post