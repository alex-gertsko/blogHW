import './App.css';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import NewPostPage from './components/NewPostPage';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import { Dummylinks, dummyPosts } from './misc/dummyTools'; //for DB simulation

const thereIsDataBase = false
const userInfo = {
  name: 'dummy-user',
}
const initDummy =  () => {
  if (thereIsDataBase){ //return empty values - values will be picked from database
    return [[], []]
  }
  return [Dummylinks, dummyPosts]
}

const makePost = (title, data) => {
  return {
    title: title,
    data: data,
    time: Date.now(),
    authorName: userInfo.name
  }
}

function App(props) {
  const [initlink, initPosts] = initDummy()
  const [links] = useState(initlink)
  const [posts,setPosts] = useState(initPosts)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home posts={posts} links={links} />} />
            <Route path="aboutMe" element={<AboutMe />} />
            <Route path="newPost" element={<NewPostPage addPost={(title, data) => setPosts(current => {
                                                        return [makePost(title,data), ...current]})}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
