import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import googleLogo from '../../images/googleLogoSVG.svg'


import useStyles from './styles'
import FormInput from './FormInput';

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {

  };

  const handleChange = () => {
    
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    setShowPassword(false)
  };
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token}});
      history.push('/');
    } catch (err) {
      console.log(err)
    }

  };

  const googleFailure = (err) => {
    console.log(err)
    console.log("Google sign in was unsuccesful.")
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <FormInput name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                <FormInput name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <FormInput name="email" label="Email" handleChange={handleChange} type="email" />
            <FormInput name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}  />
            { isSignUp && <FormInput  name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit"  className={classes.submit} fullWidth variant="contained" color="primary">
              {isSignUp ? 'Sign Up' : 'Sign in'}
          </Button>
          <GoogleLogin 
            clientId="323751828081-08h4n9b3tpj48854q7ifacghvd29c1aq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} 
              color="primary" 
              fullWidth 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              // startIcon={<svg>{googleLogo}</svg> />} 
              variant="contained"
              >
              Google Sign In  
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  { isSignUp ? 'Sign In' : 'Sign Up'}  
                </Button>
              </Grid>

          </Grid>
        </form>
      </Paper>
    </Container>
    )
}

export default Auth