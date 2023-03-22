import React from "react"

import { loadFull } from "tsparticles";
 
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../utils/api';
import {getAcessToken , getTenant_id} from '../../utils/services/auth'
// material
import {
  Box,
  Card,
  Modal,
  Table,
  Stack,
  Avatar,
  Button,
IconButton, 
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Link
} from '@mui/material';
import Iconify from '../../components/Iconify';
import { Link as RouterLink } from 'react-router-dom';

import SearchNotFound from '../../components/SearchNotFound';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import { Edit } from '@mui/icons-material';
import { width } from '@mui/system';
import NewwAssociados from '../../sections/associados'
import AtuliazarAssociados from '../../sections/associados/AtuliazarAssociados'
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// ----------------------------------------------------------------------
import Page from '../../components/Page';
const TABLE_HEAD = [
  { id: 'nome', label: 'Nome Completo', alignRight: false },
  { id: 'nome_artistico', label: 'Nome artístico', alignRight: false },
  { id: 'data_nascimento', label: 'Data Nascimento', alignRight: false },
  { id: 'cnpf_cnpj', label: 'CPF/CNPJ', alignRight: false },
  { id: 'telefone1', label: 'Telefone', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'rua', label: 'Endereço', alignRight: false },
  { id: 'cep', label: 'Cep', alignRight: false },
  { id: 'uf', label: 'Localidade', alignRight: false },
  { id: 'data_cobranca', label: 'Data de Registro', alignRight: false },
  { id: 'opcoes', label: 'Opções', alignRight: false },

];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    
    return filter(array, (_user) => 
    _user.data_cobranca.toLowerCase().indexOf(query.toLowerCase()) !== -1   || 
    _user.nome.toLowerCase().indexOf(query.toLowerCase()) !== -1            || 
    _user.cnpf_cnpj.toLowerCase().indexOf(query.toLowerCase()) !== -1       ||
    _user.nome_artistico.toLowerCase().indexOf(query.toLowerCase()) !== -1  ||
    _user.telefone1.toLowerCase().indexOf(query.toLowerCase()) !== -1       ||
    _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1                
   
      
 
     );  
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Associados() {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await api.api.get(`/dashboard/${JSON.parse(getTenant_id())}/associados`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(getAcessToken())}`
        }
        })
      
      setFetchedData(data.data);
    };
    getData();
  }, []);

  const teste = Array(fetchedData)
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = teste.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teste.length) : 0;

  const filteredUsers = applySortFilter(teste[0], getComparator(order, orderBy), filterName);      
  
  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = useState(false);

  const [editAssociado, setEditAssociado] = useState(false);

  const [associado , setAssociado] = useState();


  async function formGetAssociado(id) {
    await api.get(`dashboard/${JSON.parse(getTenant_id())}/associados/buscar/${id}`,{
       headers: {
         'Authorization': `Bearer ${JSON.parse(getAcessToken())}`
       },
 
     } ).then((response) =>{

   
      setAssociado(response.data)
   })


 }
 
    const EditClose = (event) =>{
        event.preventDefault();
        setEditAssociado(false);
    }


    
    const [idAssociados, setIdAssociado] = useState(null);

    const [getDelte, setDelete] = useState(false);
    
    const DeletOpen = (id) =>{
        setIdAssociado(id)
        
        setDelete(true);
    }


    const DeleteClose = () =>{
        setDelete(false);

    }


    const deleteAssociado = async (id) =>  {
    

    
      if(id != null & id != '' ){
        await api.api.post(`dashboard/${JSON.parse(getTenant_id())}/associados/deletar/${id}`,{
        },{
          headers: {
            'Authorization': `Bearer ${JSON.parse(getAcessToken())}`
          },
    
        } ).then((response) =>{
    
      })
      window.location.reload();
      }
    }
    const particlesInit = async (main) => {

   
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };
  
  


    let gridPDFExport;
    let total = filteredUsers.length;

    const pageChange = event => {
      setPage(event.page);
    };
    const exportPDF = () => {
      // Simulate a response from a web request.
      setTimeout(() => {
        if (gridPDFExport) {
          gridPDFExport.save(filteredUsers);
        }
      }, 250);
    };

    
    const grid = <Grid data={filteredUsers}   onClick={(e) => console.log("test")}  
    >

               
     
        <Column field="nome" title="Nome" width="alto"  />
        <Column field="cnpf_cnpj" title="Cpf/Cpnj" width="alto"  />
        <Column field="nome_artistico" title="Nome Artistico" width="alto" />
        <Column field="data_nascimento" title="Data de Nascimento" width="alto" />
        <Column field="email" title="E-mail" width="alto" />
        <Column field="telefone1" title="Telefone" width="alto" />

        <Column field="cep" title="Cep" width="alto" />
        <Column field="rua" title="Rua" width="alto" />
        <Column field="cidade" title="Cidade" width="alto" />



        <Column field="data_cobranca" title="Data de Cobrança" width="alto" />
        <GridToolbar>
          
        </GridToolbar>
      </Grid>;
return <>
        <GridPDFExport ref={pdfExport => gridPDFExport = pdfExport} margin="1cm">
          {grid}
        </GridPDFExport>
        <Page title="Clientes">   
          <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Button >
                <Typography variant="h4" color="black" gutterBottom>
                  Associados
                </Typography>
              </Button>
              <Box  sx={{display: "flex" , justifyContent: "center"}}> 
            
                  <IconButton aria-label="delete"      >
                    <ReceiptIcon size="medium" sx={{mr:1,color:"blue"}} /> <Typography sx={{color: "black"}}>Exportar Excel</Typography>
                  </IconButton>

                  <IconButton aria-label="delete"  color="primary"  title=" Imprimir"  >
                    <PrintIcon size="medium" sx={{mr:1,color:"black"}} /> <Typography sx={{color: "black"}}> Imprimir</Typography>
                  </IconButton>
                  <IconButton aria-label="delete"    onClick={exportPDF}>
                    <PictureAsPdfIcon size="medium" sx={{mr:1,color:"red"}} /> <Typography sx={{color: "black"}}>Exportar Pdf</Typography>
                  </IconButton>
                </Box>
              <Link href="/dashboard/novoassociado" variant="body2">
                <Button    variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />} >
                  Novo Associado
                </Button>
              </Link>
            </Stack>

            <Card>
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id , nome , data_cobranca,telefone1,telefone2,cnpf_cnpj,nome_artistico,data_nascimento,email,rua,numero,
                          pais,uf,cep,email2 } = row;
                        const isItemSelected = selected.indexOf(nome) !== -1;

                        return (  
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          
                          >
                          
                              <TableCell align="left">{nome}</TableCell>
                              <TableCell align="left">{nome_artistico}</TableCell>
                              <TableCell align="left">{data_nascimento}</TableCell>
                              <TableCell align="left">{cnpf_cnpj}</TableCell>
                              <TableCell align="left">{telefone1}</TableCell>
                              <TableCell align="left">{email}</TableCell>
                              <TableCell align="left">{rua} - {numero}</TableCell>
                              <TableCell align="left">{cep} </TableCell>
                              <TableCell align="left">{uf} - {pais}</TableCell>
                              <TableCell align="left" type="month">{data_cobranca}</TableCell>
                              <TableCell align="left">

                                <MenuItem sx={{ color: 'text.secondary' }} onClick={() => DeletOpen(id)}>
                                  <ListItemIcon>
                                    <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                  </ListItemIcon>
                                  <ListItemText primary="Deletar" primaryTypographyProps={{ variant: 'body2' }} />
                                </MenuItem>
                                
                                <RouterLink   to={"/dashboard/atualizarassociado/" + id}>
                                <MenuItem  to={"/dashboard/atualizarassociado" + id} sx={{ color: 'text.secondary' }}>
                                  <ListItemIcon>
                                    <Iconify icon="eva:edit-fill" width={24} height={24} />
                                  </ListItemIcon>
                                  <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
                                </MenuItem>

                                </RouterLink>
                              
                                <Modal open={editAssociado} onClose={EditClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                                  <Box >
                                    <Card style={modalStyle}>
                                      <AtuliazarAssociados associado={associado}></AtuliazarAssociados>
                                    </Card>
                                  </Box>
                                </Modal>


                                <Modal open={getDelte} onClose={DeleteClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                                  <Box >
                                    <Card style={modalStyleAlert}>
                                        <Typography> Deseja Realmente excluir?  </Typography>

                                        <Box style={boxAlert}>
                                          <Button  onClick={() => deleteAssociado(idAssociados)} color="inherit" size="small" >
                                            Excluir
                                          </Button> 
                                          
                                          <Button  onClick={DeleteClose}  color="inherit" size="small">
                                          Carcelar
                                          </Button>
                                        </Box>
                                    </Card>
                                  </Box>
                                </Modal>
                              </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isUserNotFound && (
                      <TableBody >
                        <TableRow    >
                          <TableCell align="center" colSpan={12} sx={{ py: 3 }} > 
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
              
            
              <TablePagination
                rowsPerPageOptions={[10,20,30]}
                component="div"
                count={teste.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
       </Page>
      </>;
}


const modalStyle = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #f2f2f2',
  boxShadow: 25,
  padding: '1em',

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
  width: '200px'

}

const boxAlert = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1em'
}

