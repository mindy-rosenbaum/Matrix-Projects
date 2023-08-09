import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useActiveUserAuth } from '../auth-context';
import { Translation } from '../../translation';

import '../../index.css';

const Header = () => {
    const navigate = useNavigate();
    const { logout, user } = useActiveUserAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    {Translation.massages.WELLCOME_MASSAGE(user?.name)}
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Button color="inherit" onClick={handleLogout} >
                    {Translation.titles.LOGOUT}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

