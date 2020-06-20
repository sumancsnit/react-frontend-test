import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  Paper,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  Snackbar,
  Collapse,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';

import MoviesList from '../Tabs/MoviesList';
import MoviesListDetails from '../Tabs/MoviesListDetails';
import InputFrom from '../InputForm/InputForm.jsx';

import { fetchMoviesData } from './services';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const HomePage = (props) => {
  const { classes } = props;
  const [tab, setTab] = useState(0);
  const [loader, setLoader] = useState();
  const [moviesList, setMoviesList] = useState([]);
  const [notify, setNotify] = useState(false);
  const [notifyTheme, setNotifyTheme] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const signal = axios.CancelToken.source();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    fetchData('Dream', 2020);
    document.title = `Movie Details`;
    return () => signal.cancel('Request has been canceled');
  }, []);

  const handleSearch = (title, data) => {
    fetchData(title, data);
  };

  const handleCloseNotify = () => {
    setNotify(false);
  };

  const fetchData = async (title, year) => {
    try {
      setLoader(true);
      const movilesList = await fetchMoviesData(signal.token, title, year);
      if (movilesList.Response === 'True') {
        setMoviesList(movilesList.Search);
        setNotifyTheme('success');
        setApiResponse('Successfully fetched details');
        setNotify(true);
      } else {
        setNotifyTheme('warning');
        setApiResponse(movilesList['Error']);
        setNotify(true);
        setMoviesList([]);
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        setNotifyTheme('error');
        setApiResponse(error.message);
        setNotify(true);
        setMoviesList([]);
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div>
        <Paper className={classes.Tabs}>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Tab 1' />
            <Tab label='Tab 2' />
          </Tabs>
        </Paper>

        <InputFrom handleSearch={handleSearch} />

        <Grid
          container
          justify='center'
          alignItems='center'
          className={classes.TabsWrapper}
        >
          {loader ? (
            <CircularProgress className={classes.Loader} />
          ) : (
            <Grid className={classes.TabsItem} item xs={12}>
              {tab === 0 ? (
                <MoviesList moviesList={moviesList} />
              ) : (
                <MoviesListDetails moviesList={moviesList} />
              )}
            </Grid>
          )}
        </Grid>
      </div>
      {notify && (
        <Snackbar
          open
          autoHideDuration={2000}
          onClose={handleCloseNotify}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          TransitionComponent={Collapse}
        >
          <Alert onClose={handleCloseNotify} severity={notifyTheme}>
            {apiResponse}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(HomePage);
