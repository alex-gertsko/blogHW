import {useNavigate  } from "react-router-dom"
import '../style/BackBtn.css'

const GoBackBtn = function(props){
    const navigate = useNavigate();

    return (
        <div className='goBackBtn' onClick={()=> navigate('/')}>
            GO BACK
        </div>
    )
}

export default GoBackBtn