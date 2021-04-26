import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormDialog from '../components/dialog.form';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" style={{ 'backgroundColor': 'rgb(22, 22, 22)' }}>
        <Toolbar>
          <Typography variant="h6">
            <Button style={{ color: 'white' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Open Menu</Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <MenuItem
                component={Link}
                to='/cups'
                primarytext="Кружки"
              >Кружки</MenuItem>

              <MenuItem
                component={Link}
                to='/t-shirts'
                primarytext="Футболки"
              >Футболки</MenuItem>
            </Menu>
          </Typography>
          <Typography variant='h6' style={{ float: 'right', margin: '0 10% 0 65%' }}>
            <FormDialog />
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}