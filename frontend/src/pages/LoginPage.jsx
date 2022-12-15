import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import kemkes from '../images/logo_kemenkes baru.png';
import gizi from '../images/gizi.png';
import germas from '../images/germass.png';

import { Item, Grid, Paper, TableContainer, Table } from '@material-ui/core';
import { styled } from '@mui/material/styles';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';

const theme = createTheme();

export default function LoginPage(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 2,
    width: '480px',
    height: '675px',
};

  const hr = {
  display: 'block',
  height: '1px',
  border: '0',
  borderTop: '3px solid #9f3c58',
  margin: '1em 0',
  padding: '0'
};


  function login() {
    axios
      .post('http://192.168.90.31:3107/api/v1/user/login', {
        email,
        password,
      })
      .then(function (response) {
        // localStorage.token = `Token ${response.data.key}`
        localStorage.token = response.data.token;
        localStorage.email = response.data.email;
        localStorage.setItem('email', JSON.stringify(email));
        props.history.push('/');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You are loged in',
        });
        // window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message} !! Wrong email or password`,
        });
        console.log(err, '<<<<???');
      });
  }

  if (localStorage.token) {
    return <h1>You Already Logged In</h1>;
  }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>     
    <Grid item xs={6}>
      <Container component='main'>
         <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',  height: '100vh', paddingLeft: -10 }}>
            <Grid container spacing={2}>
              <Grid item xs style={{textAlignLast:'end'}}>
              <img src={kemkes} alt='logo' style={{ height: 90 }}/>
              </Grid>
              <Grid item xs>
              <img src={germas} alt='logo' style={{ height: 90 }}/>
              </Grid>
            </Grid>
                  <Box sx={{ ...commonStyles, borderColor: '#00ABA1', textAlignLast:'center' }}>
                  <img src={gizi} alt='logo' style={{ height: 90, marginTop:80, marginBottom:20 }}/>
                  <p style={{fontSize:25, color:'#00ABA1', marginBottom:0}}>Sistem Analisis Sentimen Gizi</p>
                  <p style={{fontSize:25, color:'#00ABA1'}}>(SIS-GI)</p>
                  <Box component='form' onSubmit={(e) => {
                      e.preventDefault();
                      login();
                    }} noValidate sx={{ padding:'40px', textAlignLast:'left' }}
                  >
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='email'
                      label='NIP'
                      name='email'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='current-password'
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2, padding: 1, backgroundColor:'#00ABA1' }}
                    >
                      Login
                    </Button>
                  </Box>
                  <p style={{fontSize:15}}>@2022 All Rights Reserved</p>
            </Box>
          <Box
            sx={{
              paddingTop: 20,
            }}
          >
          </Box>
        </Box>
      </Container>
    </Grid>
    <Grid item xs={6} style={{backgroundColor:'#00ABA1'}}>
    <Container component='main'>
         <Box sx={{display: 'grid', flexDirection: 'column', alignItems: 'center',  height: '100vh', marginTop:'0px', padding:'40px' }}>
            <h1 style={{color:'white', fontWeight:'bolder'}}>Selamat Datang
            <br/><br/>
            <h5>Dapatkan informasi sentimen masyarakat terkait program dan kebijakan Kementerian Kesehatan terkait gizi, dengan sumber data berasal dari media sosial twitter.</h5>
            <br/>
            <h5>Adapun program pemerintah:</h5>
            <h5>a. Isi Piringku</h5>
            <h5>b. Inisiasi Menyusu Dini (IMD) segera setelah lahir</h5>
            <h5>c. ASI Ekslusif selama enam bulan pertama</h5>
            <h5>d. Melanjutkan menyusui sampai usia dua tahun atau lebih, disertai MPASI adekuat</h5>
            <h5>e. Penggunaan garam beryodium</h5>
            <h5>f. Pemberian tablet tambah darah pada remaja putri</h5>
            <hr style={{opacity:'1'}}/>
            <h5 style={{fontWeight:'bold'}}>PUSAT DATA DAN TEKNOLOGI INFORMASI</h5>
            <h5 style={{fontWeight:'bold'}}>KEMENTERIAN KESEHATAN RI</h5>
            <h5>Jl. H.R. Rasuna Said Blok X.5 Kav. 4-9, Kota Jakarta Selatan, Daerah Khusus Ibu Kota Jakarta 12950</h5>
            <h5>Telp. 021-5201590 (hunting)</h5>
            <h5>Fax : (021) 52921669</h5>
            <h5>Contact Center : 1500567 (Halo Kemkes)</h5>
            <h5>E-mail: kontak [at] kemkes [dot] go [dot] id</h5>
            </h1>
          <Box
            sx={{
              paddingTop: 20,
            }}
          >
          </Box>
        </Box>
      </Container>
      </Grid>
</Grid>
        

    </ThemeProvider>
  );
}

