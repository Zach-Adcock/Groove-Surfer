import React from 'react';
import { Grow, Grid, Paper, AppBar, TextField, Button, Container, OutlinedInput } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


import {getPosts, getPostsBySearch} from '../../actions/posts';
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

  //search function state
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  //Handle delete or add for tags
  const handleAdd = (tag) => setTags([ ...tags, tag]);
  const handleDelete = (deletedTag) => setTags(tags.filter((tag) => tag !== deletedTag));

  //search all posts
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history.push('/')
    }
  }
  //Search on enter press
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  
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
                <TextField  name="search" variant='outlined' 
                label="Search Albums"
                fullWidth
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                />
                <ChipInput 
                  className={classes.chipInput}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button 
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained">
                    Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.Pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}

export default Home
