import { useState, useEffect } from 'react';
import PostWrapper from '../PostWrapper';
import LinksWrapper from '../LinksWrapper';
import { getData } from '../../App';

const Home = function(props){
    // const [links] = useState([])
    const [posts,setPosts] = useState([])

    useEffect(() => {
      async function fetchData() {
        const posts = await getData('/posts?limit=5')
        if (posts === false){
            return
        }
        setPosts(Object.values(posts))
      }
      fetchData()
    }, []) 

    return (
    <div className="home">
        {posts.length > 0 ? <PostWrapper title="My First Blog" posts={posts} postRef={props.postRef}/>
                        : <p className='postsWrapper'>LOADING.....</p>}
        <LinksWrapper sections ={props.links} />
    </div>
    )
}

export default Home
