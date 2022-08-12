
import { useState } from 'react';
import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'
import {getTenant_id} from '../../utils/services/auth'
// material
import {
  Card,
  Grid,
  Container,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Button,
  Modal,
  Box,

} from '@mui/material';
// components
import Page from '../../components/Page';
import  UserListToolbar  from '../../sections/menuUser';
import { useEffect } from 'react';
import EmpresaAlterar from './EmpresaAlterar'
import UsuarioAlterar from './UsuarioAlterar'

export default function Profile() {
  const [fetchedData, setFetchedData] = useState([]);
  const [usuarios, setUsuario] = useState([]);
  const tenantId = getTenant_id();

  useEffect(() => {
    const getData = async () => {
      const data = await api.get(`http://localhost:8000/api/dashboard/${tenantId}/usuarios/pesquisar/${tenantId}`, {
       
        })
      
      setFetchedData(data.data);
    };
    getData();


    const getUsuario = async () => {
      const data = await api.get(`http://localhost:8000/${tenantId}/usuarios`, {
       
        })
      
        setUsuario(data.data[0]);
    };
    getUsuario()
  }, []);

 



  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };




  const [openUsuario, setOpenUsuario] = React.useState(false);

  const handleOpenUsuario = () => {
    setOpenUsuario(true);
  };


  const handleCloseUsuario = () => {
    setOpenUsuario(false);
  };

  const particlesInit = async (main) => {
    console.log(main);
 
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Page title="User">
         <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
        options={{
      background: {
        color: '#ffffff',
      },
      fpsLimit: 40,
      interactivity: {
        detectsOn: 'canvas',
        events: {
          resize: true
        },
      },
      particles: {
        color: {
          value: "#000000"
        },
        number: {
          density: {
            enable: true,
            area: 1080
          },
          limit: 0,
          value: 500,
        },
        opacity: {
          animation: {
            enable: true,
            minimumValue: 1,
            speed: 3,
            sync: false,
          },
          random: {
            enable: true,
            minimumValue: 0.1,
          },
          value: 1,
        },
        shape: {
          type: 'circle',
 
        },
        size: {
          random: {
            enable: true,
            minimumValue: 1.5
          },
          value: 1
        }
      }
    }}
/> 
      <Container maxWidth="xl">
        <Card>
          <UserListToolbar> </UserListToolbar>
          <Grid   container spacing={3}>
            <Grid item xs={12} md={6} lg={5} style={gridStyle}>
              <Paper style={style} elevation={4}>

                <ListItem button divider>
                  <Avatar alt="Empresa" src="/static/images/avatar/1.jpg" />
                  <ListItem>    
                    <ListItemText primary="Empresa" />                
                  </ListItem> 
                
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Nome da Empresa" />              
                  <ListItemText style={itemText}  primary={fetchedData.empresa} />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Nome Fantasia" />              
                  <ListItemText style={itemText}  primary={fetchedData.fantasia} />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="CNPJ" />              
                  <ListItemText style={itemText}  primary={fetchedData.cnpf_cnpj} />
                </ListItem>


                <ListItem button divider>
                  <ListItemText primary="Telefone" />              
                  <ListItemText style={itemText}  primary={fetchedData.telefone1} />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Telefone Adicional" />              
                  <ListItemText style={itemText}  primary={fetchedData.telefone2} />
                </ListItem>

              </Paper>
              <Paper style={stylePaper2} elevation={4}>
                <ListItem  divider>
                  <Avatar alt="Endereço" src="/static/images/avatar/1.jpg" />
                  <ListItem>
                    <ListItemText primary="Endereço" />    
                  </ListItem> 
                </ListItem>


                <ListItem button divider>
                  <ListItemText primary="Rua " />              
                  <ListItemText style={itemText} primary={fetchedData.logradouro}  />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Numero " />              
                  <ListItemText style={itemText} primary={fetchedData.numero}  />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Cep " />              
                  <ListItemText style={itemText} primary={fetchedData.cep}  />
                </ListItem>


                <ListItem button divider>
                  <ListItemText primary="Bairro" />               
                  <ListItemText style={itemText} primary={fetchedData.bairro}   />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Cidade" />               
                  <ListItemText style={itemText} primary={fetchedData.cidade}  />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Estado" />               
                  <ListItemText style={itemText} primary={fetchedData.uf}  />
                </ListItem>


                


                <ListItem style={ButtonItem}>
                  <Button variant="contained"  onClick={() => handleOpen()} >Alterar</Button>
                </ListItem>

                <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                  <Box >
                    <Card style={modalStyleAlert}>
                        <EmpresaAlterar empresa={fetchedData}></EmpresaAlterar>
                    </Card>
                  </Box>
                </Modal>

              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={7} style={gridStyle}>
            <Paper style={style} elevation={4}>
              <ListItem button divider>
                <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                <ListItem>    
                  <ListItemText primary="Usuario" />                
                </ListItem> 

              </ListItem>

              <ListItem button divider>
                <ListItemText primary="Nome do Usuario" />              
                <ListItemText style={itemText}  primary={usuarios.nome} />
              </ListItem>

              <ListItem button divider>
                <ListItemText primary="Email" />              
                <ListItemText style={itemText}  primary={usuarios.email} />
              </ListItem>

              <ListItem button divider>
                <ListItemText primary="password" />              
                <ListItemText style={itemText}  primary="*********" />
              </ListItem>

              <ListItem style={ButtonItem}>
                  <Button variant="contained"   onClick={() => handleOpenUsuario()}>Alterar</Button>
                </ListItem>

                <Modal open={openUsuario} onClose={handleCloseUsuario} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                  <Box >
                    <Card style={modalStyleAlert}>
                        <UsuarioAlterar usuarios={usuarios}></UsuarioAlterar>
                    </Card>
                  </Box>
                </Modal>
              </Paper>
            </Grid>

          </Grid>

        
        </Card>
      </Container>
    </Page>
  );
}


const style = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'

};
const style2 = {

  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'
}
const styleitem = {
  bgcolor: 'white',
  padding: '1em',

}
const stylePaper2 = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em',
  marginTop: '2em'

};

const gridStyle = {
  padding: '3em'
}

const itemText = {
  fontSize: 14,
  color: "gray",
  textAlign: "right",

}

const ButtonItem = {
  diplay: 'flex',
  justifyContent: 'space-between'
}
const paperGrid = {
  maxHeight: 300, 
  overflow: 'auto',


}


const modalStyleAlert = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #f2f2f2',
  boxShadow: 25,
  padding: '1em',
  display: 'flex',
  flexDirection: 'column',


}

