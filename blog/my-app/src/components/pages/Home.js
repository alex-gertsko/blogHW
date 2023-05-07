import PostWrapper from '../PostWrapper';
import LinksWrapper from '../LinksWrapper';

const Home = function(props){

    return (
    <div className="home">
        <PostWrapper title="My First Blog" posts={props.posts}/>
        <LinksWrapper sections ={props.links} />
    </div>
    )
}

export default Home