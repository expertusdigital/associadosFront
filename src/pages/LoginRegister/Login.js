import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { LoginForm } from '../../sections/auth/login';
import AuthSocial from '../../sections/auth/AuthSocial';
import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: "0px",
  background: "#0088ff"
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const particlesInit = async (main) => {
   
 
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    
  };

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
        
        </HeaderStyle>
    
        {mdUp && (
          
          <SectionStyle>
           
              <Box
          component="img"
          sx={{
            width: "auto",
            maxWidth: "300px",
            marginLeft: "40px",
            marginRight: "40px",
            overflow: "hidden",
            p:2
          }}
          alt="Logo."
          src="https://i.imgur.com/vfQwOUK.png"
          
        />
           
            <Typography variant="h3" sx={{ px: 5, mt: 2 ,color: "white"}} style={styleComplmento} >
            Faça gestão dos seus associados de forma rápida e simples
            </Typography>
          </SectionStyle>
        
        )}

        <Container maxWidth="sm">
          <ContentStyle>
         

            <LoginForm />

         
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
const styleComplmento = {
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '1.5em'
}


const styleTitle = {
  fontWeight: 900,
  lineHeight: '1.5em'
}

const styleComplmentoFirst = {
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '1.5em',
  fontStyle: 'italic'
}