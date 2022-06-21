import React, { useState, useEffect } from 'react';


import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

export default function CreateUser() {

    const { id } = useParams();

    useEffect(() => {
        fetch("https://www.mecallapi.com/api/users/" + id)
        .then(res => res.json())
        .then(
            (result) => {
                setFname(result.user.fname)
                setLname(result.user.lname)
                setUsername(result.user.username)
                setEmail(result.user.email)
                setAvatar(result.user.avatar)
            }
        )
    },[id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'fname': fname,
            'lname': lname,
            'username': username,
            'email': email,
            'avatar': avatar,
        }
        fetch('https://www.mecallapi.com/api/users/update', {
            method: 'PUT',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(
            (result) => {
                alert(result['message'])
                if(result['status'] === 'ok'){
                    window.location.href = '/';
                }
            }
        )
     }
    

    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar,setAvatar] = useState('');


  return (
    <Container maxWidth="md">
      <div sx={{m: 2 ,p:2}}>
        <Typography alignItems="center" component="h1" variant="h5">
          Update User   
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                // label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                // label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                // label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                // label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                // label="Avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button sx={{mt: 2}} 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  
  );
}