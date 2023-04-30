import { Link } from "react-router-dom"

const Header = function(props){
    return (
    <div className="header">
            <Link to={'/'}>Home</Link>
            <span>|</span>
            <Link to={'/aboutMe'}>About me</Link>
            <span>|</span>
            <Link to={'/newPost'}>New post</Link>
            <span>|</span>
            <Link to={'/'}>Contact Me</Link>
            <Link id="Login" to={'/'}>Login</Link>
    </div>
    )
}

export default Header