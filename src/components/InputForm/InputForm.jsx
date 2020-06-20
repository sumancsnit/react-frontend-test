import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Grid, Paper, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';

const InputForm = ({ handleSearch, classes }) => {
  const [selectedDate, setDate] = React.useState(new Date());
  const [title, setTitle] = React.useState('Dream');
  const [error, setError] = React.useState(false);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value) setError(false);
    setTitle(value);
  };

  const handleSubmit = () => {
    if (title) {
      moment(selectedDate).year();
      setError(false);
      handleSearch(title, moment(selectedDate).year());
    } else {
      setError(true);
    }
  };

  return (
    <Grid container justify='center' alignItems='center'>
      <Paper className={classes.formWrapper}>
        <Grid container justify='center' alignItems='center'>
          <Grid className={classes.formInputWrapper} item md={5} xs={12}>
            <TextField
              error={error}
              id='standard-error-helper-text'
              fullWidth
              placeholder='Title...'
              label='Movie Title'
              value={title}
              helperText=''
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid
            className={classes.formInputDatePickerWrapper}
            item
            md={5}
            xs={12}
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                label='Movie Release Year'
                fullWidth
                value={selectedDate}
                onChange={handleDateChange}
                margin='dense'
                disableFuture={true}
                views={['year']}
                animateYearScrolling
                variant='inline'
                className={classes.formInputDatePicker}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2} xs={12} className={classes.buttonWrapper}>
            <Button onClick={handleSubmit} variant='outlined' color='primary'>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

InputForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(InputForm);
