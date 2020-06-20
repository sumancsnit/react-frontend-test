import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/styles';

import { IMDB_ID, TYPE, YEAR, TITLE, POSTER } from '../Constants';

const MoviesListProfile = (props) => {
  const { classes, moviesList } = props;
  return (
    <>
      <Grid container className={classes.TabsWrapper} spacing={4}>
        {moviesList.map((movie) => (
          <Grid
            key={movie[IMDB_ID]}
            className={classes.cardDetailsWrapper}
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Card>
              <CardHeader title={movie[TITLE]} />
              <CardMedia
                className={classes.mediaImage}
                image={movie[POSTER]}
                title='Paella dish'
                alt={movie[TITLE]}
              />
              <CardContent>
                <List>
                  <ListItem dense button>
                    <ListItemText className={classes.listItemHead}>
                      Type
                    </ListItemText>
                    <ListItemText className={classes.listItemValue}>
                      {movie[TYPE]}
                    </ListItemText>
                  </ListItem>
                  <ListItem dense button>
                    <ListItemText className={classes.listItemHead}>
                      Year
                    </ListItemText>
                    <ListItemText className={classes.listItemValue}>
                      {movie[YEAR]}
                    </ListItemText>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

MoviesListProfile.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(MoviesListProfile);
