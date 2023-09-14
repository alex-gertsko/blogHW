import { useState, useEffect } from 'react';
import PostWrapper from '../PostWrapper';
import { getData } from '../../App';
import { loginsetter } from '../header/Header';
import { TablePagination } from '@mui/material';

const Home = function(props){
    const [posts,setPosts] = useState([])
    const {getPostsUrl} = props
    const checklogin = async () => {
      const res = await getData('/checklogin')
      if (res.login === true && loginsetter.loggedin === false){
        await loginsetter.setLogin(true)
      }
      return res
    }
    checklogin()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      async function fetchData() {
        const posts = await getData(getPostsUrl + `?limit=${rowsPerPage}&page=${page}`)
        if (posts === false){
            return
        }
        posts.data = Object.values(posts.data || {})
        setPosts(posts)
      }
      fetchData()
    }, [getPostsUrl, page, rowsPerPage]) 

    return (
    <div className="home">
        <TablePagination
          component="div"
          count={posts.totalNumber || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {posts.data && posts.data.length > 0 ? <PostWrapper  posts={posts} postRef={props.postRef}/>
                        : <p className='postsWrapper'>LOADING.....</p>}
    </div>
    )
}

export default Home
