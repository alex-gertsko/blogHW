import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, useLocation} from "react-router-dom"
import { useState } from 'react';

const cookieRegex = /(sessionId=[^;]*;|sessionId=[^;]*$)/
// let cookieInterval = null
const pages = {
    'Home': '/',
    'New Post': '/newPost',
    'About Me':'/aboutMe'
}
export const loginsetter = {
  setLogin: false
}
const get = async (url) => {
  return await fetch(url, {headers: {"Content-Type": "application/json",}})
}


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const location = useLocation()
  const [loggedin, setLoggedIn] = useState(false)
  loginsetter.setLogin = setLoggedIn
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (route) => {
    return () => {navigate(route)}
  }

  const handleLogout = async () => {
    const sessionId = document.cookie.match(cookieRegex)
    if (sessionId === null){
      alert('opss... something went wrong with logging out')
      return
    }
    setLoggedIn(false)
    if (location.pathname !== '/'){
      setTimeout(() => navigate('/'), 1000)
    }
    try{
      await get('/logout')
      console.log('logged out successfully')
    } catch (err){
      console.log(err)
    } finally {
      document.cookie = 'sessionId=; Max-Age=0'
    }
  }

  const handleLogin = async () => {
    navigate('/login')
    try{
      const isLoggedIn = await get('/checklogin') 
      if (isLoggedIn.ok){
        setLoggedIn(true)
        navigate('/')
      }
    } catch(err){
      console.log("checking login failed")
    }
    
  }
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.entries(pages).map(([page,route]) => (
                <MenuItem key={page} onClick={handleClick(route)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.entries(pages).map(([page,route]) => (
              <Button
                key={page}
                onClick={handleClick(route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
          {!loggedin ? <Button color="inherit" onClick={handleLogin}>Login</Button> :
          <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
