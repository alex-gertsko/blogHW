import './App.css';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import NewPostPage from './components/pages/NewPostPage';
import { useRef } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/pages/Layout';
import { Dummylinks, dummyPosts } from './misc/dummyTools'; //for DB simulation
import SinglePostPage from './components/pages/SinglePostPage';
import LoginPage from './components/pages/LoginPage';
import PostSelectionPage from './components/pages/PostSelectionPage';


import { createTheme, ThemeProvider } from '@mui/material/styles';


let theme = createTheme(
  {
    'postBox': {'mx': '5vw'}
  }
)

const initDummy =  () => {
  return [Dummylinks, dummyPosts]
}


function App(props) {
  const [initlink] = initDummy()
  const links = initlink
  const postRef = useRef([])
  const handleNewPost = (title, data) => {
    // setPosts(current => {return [makePost(title,data), ...current]} // set into new state the old state (current) plus new post
  // )
}

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home links={links} postRef={postRef} />} /> 
              <Route path="aboutMe" element={<AboutMe />} />
              <Route path="newPost" element={<NewPostPage addPost={handleNewPost}/>} />
              <Route path="post/update/:id" element={<NewPostPage/>} />
              <Route path="post/:id" element={<SinglePostPage postRef={postRef}/>} />
              <Route path="personalpost" element={<PostSelectionPage/>} />
              <Route path="login" element={<LoginPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;









export async function getData(url = "") {
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try{
      const response = await fetch(url, params);
      const data = await response.json()
      return data; 
  } catch (err){
      console.log(err)
      return false
  }
}

export async function postData(url = "", data = {}) {
  try{
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response; 
  } catch(err){
    console.log("error at posting post /n", err)
    return false
  }
}