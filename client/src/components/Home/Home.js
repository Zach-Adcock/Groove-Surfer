import React from 'react';
import { Grow, Grid, Paper, AppBar, TextField, Button, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


import {getPosts} from '../../actions/posts';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const history = useHistory();



  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])
  
  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField  name="search" variant='outlined' label="Search Albums" value="TEST" fullWidth onChange={() => {}}/>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper className={classes.Pagination} elevation={6}>
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}

export default Home
