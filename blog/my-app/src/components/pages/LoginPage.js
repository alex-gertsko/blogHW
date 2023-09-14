import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import GoBackBtn from '../GoBackBtn';
import { Link } from 'react-router-dom';
import { useRef, forwardRef, useState, useContext } from 'react';
import { postData } from '../../App';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../auth/AuthProvider';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const severities = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}

const currentAlert = {
    _setOpen: () => {},
    _handleClose: () => {},
    _alert: <Alert  severity={severities.success} sx={{ width: '100%' }}>
            </Alert> ,
    alert: function(severity, text){ // error | warning | info | success
        this._alert = <Alert onClose={this._handleClose} severity={severity} sx={{ width: '100%' }}>
                            {text}
                        </Alert> 
        this._setOpen(true)
    }
}
currentAlert.alert = currentAlert.alert.bind(currentAlert)

const LoginPage = (props) => {
    const authProvider = useContext( AuthContext )
    const [open, setOpen] = useState(false);
    const userName = useRef('')
    const password = useRef('')
    const navigate = useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      }
    currentAlert._handleClose = handleClose
    currentAlert._setOpen = setOpen
      
    const checkInput = (func) => {
        return async () => {
            if (userName.current.value === ''){
                currentAlert.alert(severities.warning, 'Must enter username')
                return
            }
            if (password.current.value === ''){
                currentAlert.alert(severities.warning, 'must enter password')
                return
            }
            func()
        }
    }

    const handleLogin = async () => {
        try{
            const ans = await postData('/login', {username: userName.current.value, password: password.current.value})
            if (!alerter(ans.status)){return} //return if something went wrong
            if (ans.ok === false){
                currentAlert.alert(severities.error, 'something went wrong with the login :(')
                return false
            }
            authProvider.login()
            currentAlert.alert(severities.success, 'Logged in successful')
            setTimeout(() => currentAlert.alert(severities.success, 'redirect to home page'), 1000)
            setTimeout(() => navigate('/'), 2000)
        }catch (err){
            console.log(err)
        }
    }

    const handleRegister = async () => {
        const ans = await postData('/register', {username: userName.current.value, password: password.current.value})
        if (!alerter(ans.status)){return} //return if something went wrong
        if (ans.ok === false){
            currentAlert.alert(severities.error, 'something went wrong with the register :(')
            return false
        }
        currentAlert.alert(severities.success, 'registered successfully :)')
    }

    const alerter = (status) => {
        switch(status){
            case 401:
                currentAlert.alert(severities.error, 'Wrong username or password')
                return false
            case 409:
                currentAlert.alert(severities.error, 'username is already taken')
                return false
            case 422:
                currentAlert.alert(severities.error, 'wrong credentials used')
                return false
            default:
                return true
        }
    }


    return (
        <div>
            <GoBackBtn/>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <h1>
                    Login
                </h1>
                <TextField
                    required
                    id="usrNameBar"
                    label="User Name"
                    defaultValue=""
                    inputRef={userName}
                />
                <TextField
                    required
                    id="userPassword"
                    label="Password"
                    defaultValue=""
                    type="password"
                    autoComplete="current-password"
                    inputRef={password}
                />
                <Button variant="contained" onClick={checkInput(handleLogin)} endIcon={<LoginIcon />}>Login</Button>
                
                <Button variant="contained" onClick={checkInput(handleRegister)} endIcon={<SendIcon />}>register</Button>
                <Link to={'/login'}>Forgot Username / Password</Link>

            </Stack>


            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                {currentAlert._alert}
            </Snackbar>
        </div>
    )
}

export default  LoginPage