import Post from "./Post"

const PostWrapper = function(props){
    const {posts, title, postRef} = props
    const postsIsArray = Array.isArray(posts)
    const mapPosts = post => {
        return Post({data: post, postRef:postRef})
    }
    const postslist = postsIsArray ? posts.map((post, index) => {
        post.index = index
        return mapPosts(post)
        }) : <h3>No posts</h3>

    return (
        <div className='postsWrapper'>
            <h1>{title ?? "Here are my posts"}</h1>
            {postslist}
        </div>
    )
}

export default PostWrapper