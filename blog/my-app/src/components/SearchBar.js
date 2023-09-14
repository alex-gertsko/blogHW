import Post from "./Post.js";
import { useEffect, useState } from "react";

import {
  Box,
  Stack,
  Container,
  TextField,
} from "@mui/material";

const SearchBar = (props) => {
    const {posts} = props
    const init = Array.isArray(posts) ? posts : []
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(init);
    const mapPosts = (post, index) => {
      post.index = index
      return <Post data={post} isPersonalPage={true} key={index}/>
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
          {results.map((post, index) => mapPosts(post, index))}
          {results.length ===0 && <p>no results...</p>}
        </Stack>
      </Container>
    )
  }

  export default SearchBar