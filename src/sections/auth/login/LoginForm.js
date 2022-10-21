import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import api from '../../../utils/api'
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, FormControl, FormGroup, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {setAcessToken, setTenant_id } from '../../../utils/services/auth'
import axios from 'axios';
// ----------------------------------------------------------------------
async function tenantLogin(credentials) {
  return fetch('http://associados.api.expertusdigital.com/api/dashboard/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 async function adminLogin(credentials) {
  return fetch('http://associados.api.expertusdigital.com/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }



export default function LoginForm() {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const login = await tenantLogin({
      email,
      password
    });
    
    if(login != 'Unauthorized' && login != null   ){
      if(login.access_token){
       
        navigate("/dashboard/associados", { replace: true });

      }else if(login.error){
        try {
          const login = await adminLogin({
            email,
            password
          });
          if(login.access_token){
            setAcessToken(login)

            navigate("/dashboard", { replace: true });
          }else{
            alert(    "Login ou senha Invalidos")

          }
          
        } catch (error) {
        }
      }
    }
    
    setAcessToken(login.access_token)
    setTenant_id(login.tenant_id)
  }


  return (
    <FormControl >
      <form autoComplete="on" onSubmit={handleSubmit} >
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            onChange={e => setUserName(e.target.value)}
          
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            onChange={e => setPassword(e.target.value)}
        
            InputProps={{
              endAdornment: (
                <InputAdornment  position="end">
                  <IconButton edge="end" onClick={handleShowPassword}  >
                    <Iconify  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
         
         
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained"  >
          Login
        </LoadingButton>
      </form>
    </FormControl>
  );
}
