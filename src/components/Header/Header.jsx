import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';

const Header = (props) => {
  const { classes } = props;

  return (
    <div className={classes.header}>
      <AppBar>
        <Toolbar>
          <Avatar variant='square' className={classes.logo}>
            S K
          </Avatar>
          <Typography variant='h6' className={classes.title}>
            Assignment
          </Typography>
          <Button color='inherit'>Suman K</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Header);
