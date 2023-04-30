import Post from "./Post"

const PostWrapper = function(props){
    const {posts, title} = props
    const postsIsArray = Array.isArray(posts)
    const mapPosts = post => {
        return Post({data: post})
    }

    return (
        <div className='postsWrapper'>
            <h1>{title ?? "Here are my posts"}</h1>
            {postsIsArray ? posts.map((post, index) => {
                post.index = index
                return mapPosts(post)
                }) : <h3>No posts</h3>}
        </div>
    )
}

export default PostWrapper