import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';
import navConfigAdmin from './NavConfigAdmin';
import {getTenant_id,getAcessAdmin} from '../../utils/services/auth'



// ----------------------------------------------------------------------

const DRAWER_WIDTH = 250;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  
const [navConfigList,setnavConfigList]  =  useState(navConfig);

useEffect(() => {
  
  if(JSON.parse(getAcessAdmin()) == 1  ){
    console.log("admin ",getAcessAdmin())  
    setnavConfigList(navConfigAdmin)
  }
  else{
    setnavConfigList(navConfig)
    console.log("tenant ",getAcessAdmin())
  }

}, []);
 




  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' , overflowX: "hidden",},
      }}

    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>

      </Box>

      <Box
        component="img"
        sx={{
         
          width: "200px",
          margin: "auto",
          overflow: "hidden",
          p:2
        }}
        alt="Logo."
        src="https://i.imgur.com/vfQwOUK.png"
        
      />

      <NavSection navConfig={navConfigList} />

      <Box sx={{ flexGrow: 1 }} />

     
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH,backgroundColor: "#0088ff" },
          }}
    
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
              backgroundColor: "#0088ff"
            },
            
          }}
        
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
