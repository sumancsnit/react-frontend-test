import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';
import DetailsPopup from './DetailsPopup';

import { IMDB_ID, TYPE, YEAR, TITLE } from '../Constants';

const MoviesList = (props) => {
  const { classes, moviesList = [] } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [popup, setPopup] = React.useState(false);
  const [imdbID, setImdbID] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openDetails = (id) => {
    setImdbID(id);
    setPopup(true);
    console.log(popup);
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <>
      <Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow hover>
                <TableCell>Title</TableCell>
                <TableCell align='right'>Type</TableCell>
                <TableCell align='right'>Year</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moviesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <TableRow
                    hover
                    key={movie[IMDB_ID]}
                    className={classes.tableRow}
                  >
                    <TableCell component='th' scope='row'>
                      {movie[TITLE]}
                    </TableCell>
                    <TableCell align='right'>{movie[TYPE]}</TableCell>
                    <TableCell align='right'>{movie[YEAR]}</TableCell>
                    <TableCell align='right'>
                      <Button
                        onClick={() => openDetails(movie[IMDB_ID])}
                        color='primary'
                      >
                        More Info
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[7, 14, 28]}
          component='div'
          count={moviesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {popup && <DetailsPopup open handleClose={closePopup} imdbID={imdbID} />}
    </>
  );
};

MoviesList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.any).isRequired,
  openDetails: PropTypes.func.isRequired,
};

export default withStyles(styles)(MoviesList);
