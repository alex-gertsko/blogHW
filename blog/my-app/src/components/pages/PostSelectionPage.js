import React, { useState, useEffect } from "react";
import { getData } from "../../App";
import Post from "../Post";


import {
  Box,
  Stack,
  Container,
  // Card,
  // CardContent,
  // Grid,
  TextField,
  // Typography,
  // Pagination,
} from "@mui/material";


const PostSelectionPage = (props) => {
  const [posts, setPosts] = useState(false)

  const getPosts = async () => {
    const posts = await getData('/personalpost')
    let init = []
    if (Array.isArray(posts)){
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

const SearchBar = (props) => {
  const {posts} = props
  const init = Array.isArray(posts) ? posts : []
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(init);
  const mapPosts = post => {
    return <Post data={post} isPersonalPage={true} />
}

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let res = posts
      if (search) {
        const re = new RegExp(search, 'i');
        res = posts.filter(post => re.test(post.title) || re.test(post.data))
      } 
      setResults(res);
      
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search, posts]);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 2, marginTop: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Stack spacing={2} alignItems="center">
        {results.map(post => mapPosts(post))}
        {results.length ===0 && <p>no results...</p>}
      </Stack>
    </Container>
  );
};

