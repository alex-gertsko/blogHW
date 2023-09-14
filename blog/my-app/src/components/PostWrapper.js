import Post from "./Post"

const PostWrapper = function(props){
    const {posts} = props
    const mapPosts = post => {
        return <Post data={post} key={post.index }/>
    }

    return (
        <div className='postsWrapper'>
            {Array.isArray(posts.data) && posts.data.map((post, index) => {
        post.index = index
        return mapPosts(post)
        })}
        </div>
    )  
}

export default PostWrapper