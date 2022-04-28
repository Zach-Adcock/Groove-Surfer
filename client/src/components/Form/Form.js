import React from "react";
import { useState, useEffect } from "react";
import { Button, Typography, Paper, TextField} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";


import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId}) => {
  const classes = useStyles();
  //postData will track form inputs: creator/artist/album/imageFile/tags
  const [postData, setPostData] = useState({ creator: '', artist: '', album: '', tags: '', selectedFile: ''})
  const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', artist: '', album: '', tags: '', selectedFile: ''});
  }

  return ( 
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Edit' : 'Add'} an Album</Typography>
        <TextField 
          name="creator" 
          variant="outlined" 
          label="Creator" 
          fullWidth 
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value})}/>
        <TextField 
          name="artist" 
          variant="outlined" 
          label="Artist" 
          fullWidth 
          value={postData.artist}
          onChange={(e) => setPostData({ ...postData, artist: e.target.value})}/>
        <TextField 
          name="album" 
          variant="outlined" 
          label="Album" 
          fullWidth 
          value={postData.album}
          onChange={(e) => setPostData({ ...postData, album: e.target.value})}/>
        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags" 
          fullWidth 
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64}) } 
          />
        </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
      </form>
    </Paper>
    );
}
 
export default Form;