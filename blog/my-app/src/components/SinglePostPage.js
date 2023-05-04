import GoBackBtn from "./GoBackBtn.js";
import Post from "./Post.js";
import { useParams } from "react-router-dom";

const SinglePostPage = (props) => {
    const {posts} = props
    const {id} = useParams()

    return (
        <div className="postsWrapper">
            <GoBackBtn/>
            <Post data={posts.find(post => post.id === id)}/>
        </div>
    )
}

export default SinglePostPage
