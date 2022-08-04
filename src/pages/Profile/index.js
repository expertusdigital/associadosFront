
import { useState } from 'react';
import * as React from 'react';
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

} from '@mui/material';
// components
import Page from '../../components/Page';
import  UserListToolbar  from '../../sections/menuUser';
import { useEffect } from 'react';
import ListUsuarios from './ListUsuarios'

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

 
  console.log(usuarios)



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page title="User">
      <Container>
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


                <ListItem button divider>
                  <ListItemText primary="Complemento" />               
                  <ListItemText style={itemText} primary={fetchedData.complemento}   />
                </ListItem>


                <ListItem style={ButtonItem}>
                  <Button variant="contained">Alterar</Button>
                </ListItem>
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
                  <Button variant="contained">Alterar</Button>
                </ListItem>

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