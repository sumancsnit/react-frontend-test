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

const KEY = '3ba48acf';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const HomePage = (props) => {
  const { classes } = props;
  const [tab, setTab] = useState(0);
  const [loader, setLoader] = useState();
  const [moviesList, setMoviesList] = useState([
    {
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZTRkNjdmNDktM2M3Yy00NTM1LTgyYTAtMzYwMWVhYjI4ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
      Title: 'Spelling the Dream',
      Type: 'movie',
      Year: '2020',
      imdbID: 'tt6193522',
    },
  ]);
  const [notify, setNotify] = useState(false);
  const [notifyTheme, setNotifyTheme] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const signal = axios.CancelToken.source();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    // fetchData('the', 2020);
    document.title = `Movie Details`;
    return () => signal.cancel('Request has been canceled');
  }, []);

  const handleDetailsPopup = (id) => {
    console.log('handleDetailsPopup -> id', id);
  };

  const handleSearch = (title, data) => {
    fetchData(title, data);
  };

  const handleCloseNotify = () => {
    setNotify(false);
  };

  const fetchData = async (title, year) => {
    try {
      setLoader(true);
      const movilesList = await fetchMoviesData(signal.token, title, year, KEY);
      if (movilesList.Response === 'True') {
        setMoviesList(movilesList.Search);
        setNotifyTheme('success');
        setApiResponse('Successfully fetched details');
        setNotify(true);
      } else {
        setNotifyTheme('warning');
        setApiResponse(movilesList['Error']);
        setNotify(true);
      }
    } catch (error) {
      setNotifyTheme('error');
      setApiResponse(error.message);
      setNotify(true);
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
  // moviesList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(HomePage);
