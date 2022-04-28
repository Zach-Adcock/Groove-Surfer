import React from 'react';
import { Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";


import {getPosts} from '../../actions/posts';
import useStyles from '../../styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);


  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])
  
  return (
    <div>
      <Grow in>
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
      </Grow>
    </div>
  )
}

export default Home
