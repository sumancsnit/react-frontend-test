import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  Button,
  List,
  ListItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  CircularProgress,
  Card,
  CardMedia,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';

import {
  TITLE,
  YEAR,
  POSTER,
  RATING,
  RATED,
  RELEASED,
  RUNTIME,
  COUNTRY,
  DIRECTOR,
  LANGUAGE,
} from '../Constants';

import { fetchFullData } from '../HomePage/services';

const DetailsPopup = ({ open, handleClose, imdbID, classes }) => {
  const signal = axios.CancelToken.source();
  const [loader, setLoader] = useState();
  const [details, setDetails] = useState({});

  const fetchData = async () => {
    try {
      setLoader(true);
      const movieDetails = await fetchFullData(signal.token, imdbID);
      setDetails(movieDetails);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log(error.message);
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => signal.cancel('Request has been canceled');
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='scroll-dialog-title'>Movie Full Details</DialogTitle>
        {loader ? (
          <CircularProgress className={classes.Loader} />
        ) : (
          <DialogContent>
            <div>
              <Card className={classes.mediaWrapper} id='97'>
                <CardMedia
                  className={classes.media}
                  image={details[POSTER]}
                  title={details[TITLE]}
                />
              </Card>
            </div>

            <List>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Boxoffice
                </ListItemText>
                <ListItemText>
                  {details[RATING] > 7 ? 'Hit' : 'Flop'}
                </ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Title
                </ListItemText>
                <ListItemText>{details[TITLE]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Year
                </ListItemText>
                <ListItemText>{details[YEAR]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Rated
                </ListItemText>
                <ListItemText>{details[RATED]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Released
                </ListItemText>
                <ListItemText>{details[RELEASED]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Runtime
                </ListItemText>
                <ListItemText>{details[RUNTIME]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Country
                </ListItemText>
                <ListItemText>{details[COUNTRY]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Director
                </ListItemText>
                <ListItemText>{details[DIRECTOR]}</ListItemText>
              </ListItem>
              <ListItem dense button>
                <ListItemText className={classes.listItemOption}>
                  Language
                </ListItemText>
                <ListItemText>{details[LANGUAGE]}</ListItemText>
              </ListItem>
            </List>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DetailsPopup.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  imdbID: PropTypes.string.isRequired,
};

export default withStyles(styles)(DetailsPopup);
