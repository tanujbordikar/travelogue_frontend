import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import Home from '@material-ui/icons/HomeOutlined';
import Logout from '@material-ui/icons/ExitToApp';
import travelogueLogo from '../../images/travelogue-logo.png';
import travelogueText from '../../images/travelogue-text.png';
import { getPostsByName } from '../../actions/posts';

const Navbar = () => {
    const classes = useStyles();
    // const user = null;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [name, setName] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            // search posts
            myPost();
        }
    };

    const myPost =()=>{
        if(user.result.name) {
            dispatch(getPostsByName({name}))
            history.push(`/posts/search?searchQuery=${ user.result.name || 'none'}`);
        } else {
            history.push('/');
        }  
    };
    
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={travelogueText} alt="icon" height="50px" />
                <img className={classes.image} src={travelogueLogo} alt="icon" height="50px" />
            </Link>
            <Toolbar>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.charAt}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <>
                        <Button variant="contained" className={classes.myposts} color="primary" onKeyPress={handleKeyPress} onClick={myPost} onChange={() => setName(user.result.name)}><Home fontSize='medium'/></Button>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}><Logout fontSize='medium' /></Button>
                        </>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;