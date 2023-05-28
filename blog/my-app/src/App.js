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


import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme(
  {
    'postBox': {'mx': '5vw'}
  }
)

// const thereIsDataBase = false
// const userInfo = {
//   name: 'dummy-user',
// }
const initDummy =  () => {
  // if (thereIsDataBase){ //return empty values - values will be picked from database
  //   const latestPosts =  getData('/')
  //   return [Dummylinks, latestPosts]
  // }
  return [Dummylinks, dummyPosts]
}
// let tempId = 3
// const makePost = (title, data) => {
//   return {
//     title: title,
//     data: data.text,
//     time: Date.now(),
//     authorName: userInfo.name,
//     imageUrl: data.imageUrl,
//     id: `${tempId++}`
//   }
// }

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
              <Route path="post/:id" element={<SinglePostPage postRef={postRef}/>} />
              <Route path="login" element={<LoginPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
