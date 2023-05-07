import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import GoBackBtn from '../GoBackBtn';
import { Link } from 'react-router-dom';

const LoginPage = (props) => {

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
                />
                <TextField
                    required
                    id="userPassword"
                    label="Password"
                    defaultValue=""
                    type="password"
                    autoComplete="current-password"
                />
                <Button variant="contained" endIcon={<SendIcon />}>Submit</Button>
                <Link to={'/login'}>Forgot Username / Password</Link>

            </Stack>
        </div>
    )
}

export default  LoginPage