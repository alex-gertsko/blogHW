import React, { useState, useEffect } from "react";
import { getData } from "../../App";
import SearchBar from "../SearchBar";



const PostSelectionPage = (props) => {
  const [posts, setPosts] = useState(false)

  const getPosts = async () => {
    const posts = await getData('/personalpost')
    let init = []
    if (posts && Array.isArray(posts)){
      init = posts
    } else {
      alert("something went wrong")
    }
    setPosts(init)
  }

  useEffect(() => {
    getPosts()
  },[])

  return (
    <div>
      {posts === false ? <p>loading....</p> : <SearchBar posts={posts}></SearchBar>}
    </div>
  );
};

export default PostSelectionPage;



