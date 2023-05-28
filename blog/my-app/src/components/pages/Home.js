import { useState, useEffect } from 'react';
import PostWrapper from '../PostWrapper';
import LinksWrapper from '../LinksWrapper';

const Home = function(props){
    // const [links] = useState([])
    const [posts,setPosts] = useState([])

    useEffect(() => {
      async function fetchData() {
        const posts = await getData('/home')
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


async function getData(url = "") {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try{
        console.log(url)
        const response = await fetch(url, params);
        const data = await response.json()
        return data; 
    } catch (err){
        console.log(err)
        return false
    }
  }