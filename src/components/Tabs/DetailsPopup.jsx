import React, { useState, useEffect } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../../Styles/styles';

import { fetchFullData } from '../HomePage/services';

const DetailsPopup = (props) => {
  const { classes, userName, open, onClose } = props;

  const [profileDetails, setprofileDetails] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const profileData = await fetchFullData(userName);
      setprofileDetails(profileData);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Dialog
        maxWidth='md'
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <div className={classes.dialogWrapper}>
          {loader ? (
            <CircularProgress className={classes.popupLoader} />
          ) : (
            <>
              <p className={classes.listHeader}>User Name : {userName}</p>

              <DialogContent>
                <Box className={classes.listWrapper} my={2}>
                  <div>Public Repos</div>
                  <div> {profileDetails.public_repos}</div>
                </Box>
                <Box className={classes.listWrapper} my={2}>
                  <div>Followers</div>
                  <div> {profileDetails.followers}</div>
                </Box>
                <Box className={classes.listWrapper} my={2}>
                  <div>Following</div>
                  <div> {profileDetails.following}</div>
                </Box>
                <Box className={classes.listWrapper} my={2}>
                  <div>Created At</div>
                  <div>
                    {' '}
                    {moment(profileDetails.created_at).format('MMM Do YYYY')}
                  </div>
                </Box>
                <Box className={classes.listWrapper} my={2}>
                  <div>Site Admin</div>
                  <div> {profileDetails.site_admin ? 'Yes' : 'No'}</div>
                </Box>
              </DialogContent>
            </>
          )}
        </div>
        <DialogActions>
          <Button variant='outlined' onClick={onClose} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DetailsPopup.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  userName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DetailsPopup);
