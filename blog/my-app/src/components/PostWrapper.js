import Post from "./Post"
import { Grid } from '@mui/material';


const PostWrapper = function(props){
    const {posts, title, postRef} = props
    const postsIsArray = Array.isArray(posts)
    const mapPosts = post => {
        return Post({data: post, postRef:postRef})
    }
    const postslist = posts.map((post, index) => {
        post.index = index
        return mapPosts(post)
        })


    return (
        <div className='postsWrapper'>
            {/* <h1>{title ?? "Here are my posts"}</h1> */}
            {postslist}
        </div>
    )

    // return (

    //         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //         {
    //         postslist.length == 0 ?
    //                 <p className='postsWrapper'>LOADING.....</p> :
    //                 {postslist}
    //                 }
    //         </Grid>
    //     )
        
    
}

export default PostWrapper