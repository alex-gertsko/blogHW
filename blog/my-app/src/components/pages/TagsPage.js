import { useLocation } from 'react-router-dom';
import Home from './Home.js';


const TagsPage = () => {
    const location = useLocation()
    const tagName = location.pathname.split('/').pop()

    return (
        <Home getPostsUrl={`/post/tag/${tagName}?limit=5`}/>
    )
}
export default TagsPage