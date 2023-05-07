import GoBackBtn from "../GoBackBtn"
import '../../style/AboutMe.css'

const AboutMe = function(props){
    return (
<div className="responsive-container-block bigContainer">
<GoBackBtn/>
  <div className="responsive-container-block Container">
    <p className="text-blk heading">
      About Me
    </p>
    <p className="text-blk subHeading">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
    </p>
    <div className="social-icons-container">
      <span className="social-icon">
        <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png" alt=""/>
      </span>
      <span className="social-icon">
        <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png" alt=""/>
      </span>
      <span className="social-icon">
        <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png" alt=""/>
      </span>
      <span className="social-icon">
        <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png" alt=""/>
      </span>
    </div>
  </div>
</div>
    )
}

export default AboutMe