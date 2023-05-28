import GoBackBtn from "../GoBackBtn.js";
import Post from "../Post.js";
// import { useParams } from "react-router-dom";

const SinglePostPage = (props) => {
    const {postRef} = props
    // const {id} = useParams()

    return (
        <div className="postsWrapper">
            <GoBackBtn/>
            <Post data={postRef.current.value} isSinglePage={true}/>
        </div>
    )
}

export default SinglePostPage
