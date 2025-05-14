import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    initial: '',
  });

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');

  if (!token || !name || !email) {
    navigate('/auth');
  } else {
    setUserData({
      name,
      email,
      initial: name.charAt(0).toUpperCase(),
    });
  }
}, [navigate]);


  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ borderRadius: 3, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#A1887F', width: 80, height: 80, fontSize: 36 }}>
            {userData.initial || <PersonIcon />}
          </Avatar>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#5D4037' }}>
            {userData.name}
          </Typography>
          <Typography variant="body1" sx={{ color: '#6D4C41' }}>
            {userData.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ color: '#8D6E63' }}>
              Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {userData.name}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ color: '#8D6E63' }}>
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {userData.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
