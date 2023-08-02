import { useState, useEffect } from 'react';
import PostWrapper from '../PostWrapper';
import { getData } from '../../App';
import { loginsetter } from '../header/Header';

const Home = function(props){
    const [posts,setPosts] = useState([])
  
    const checklogin = async () => {
      const res = await getData('/checklogin')
      if (res.login === true && loginsetter.loggedin === false){
        await loginsetter.setLogin(true)
      }
      return res
    }
    checklogin()

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
        {posts.length > 0 ? <PostWrapper  posts={posts} postRef={props.postRef}/>
                        : <p className='postsWrapper'>LOADING.....</p>}
    </div>
    )
}

export default Home
