import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';

const MoviesListProfile = (props) => {
  const { classes, userDetails } = props;
  return (
    <div>
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.TabsWrapper}
        spacing={4}
      >
        <Grid item xs={12}>
          <TextField
            id='first-name'
            label='First Name'
            value={userDetails.first_name || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='last-name'
            label='Last Name'
            value={userDetails.last_name || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='email'
            label='Email'
            fullWidth
            value={userDetails.email || ''}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

MoviesListProfile.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  userDetails: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(MoviesListProfile);
