import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';

// material
import {
  Box,
  Card,
  Modal,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar,UserMoreMenu } from '../../sections/@dashboard/user';
// mock
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import {users} from '../../_mock/clientes';
import api from '../../utils/api';
import {getAcessToken , getTenant_id} from '../../utils/services/auth'
import NewwAssociados from '../../sections/associados'
import AtuliazarAssociados from '../../sections/associados/AtuliazarAssociados'

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';



// ----------------------------------------------------------------------



// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'nome', label: 'Nome Completo', alignRight: false },
  { id: 'nome_artistico', label: 'Nome artístico', alignRight: false },
  { id: 'cnpf_cnpj', label: 'CPf', alignRight: false },
  { id: 'telefone1', label: 'Telefone', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'status', label: 'Status Pagamento', alignRight: false },
  { id: 'data_cobranca', label: 'Data de Registro', alignRight: false }


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
    _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1          ||
    _user.nome_artistico.toLowerCase().indexOf(query.toLowerCase()) !== -1  ||
    _user.telefone1.toLowerCase().indexOf(query.toLowerCase()) !== -1       ||
    _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1    
     );  
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Relatorios() {
  


  const [relatorio , setRelatorio] = useState([]);






  useEffect(() => {
    const getData = async () => {
      const data = await api.api.get(`dashboard/${JSON.parse(getTenant_id())}/relatorios`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(getAcessToken())}`
        }
        })
        console.log(data)
        setRelatorio(data.data);
    };
    getData();
  }, []);

  const relatorios = Array(relatorio)
  

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = relatorios.map((n) => n.name);
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
  console.log(relatorios)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - relatorios[0].length) : 0;

  const filteredAssociados = applySortFilter(relatorios[0], getComparator(order, orderBy), filterName);      
  
  const isUserNotFound = filteredAssociados.length === 0;

  



  let gridPDFExport;
  let total = filteredAssociados.length;

  const pageChange = event => {
    setPage(event.page);
  };
  const exportPDF = () => {
    // Simulate a response from a web request.
    setTimeout(() => {
      if (gridPDFExport) {
        gridPDFExport.save(filteredAssociados);
      }
    }, 250);
  };

  

 


  
   
   
  const grid = <Grid data={filteredAssociados}   onClick={(e) => console.log("test")}  
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

  return (
    <Page title="Clientes">   
   
   <GridPDFExport ref={pdfExport => gridPDFExport = pdfExport} margin="1cm">
          {grid}
        </GridPDFExport>
       

        <Card>

          <Box  sx={{display: "flex" , justifyContent: "space-between", alignItems: "center"}}> 
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Box sx={{display: "flex" , justifyContent: "center", alignItems: "center"}}>
              <IconButton aria-label="delete"   sx={{height: "40px"}}   >
                  <ReceiptIcon size="medium" sx={{mr:1,color:"blue"}} /> <Typography sx={{color: "black"}}>Exportar Excel</Typography>
                </IconButton>

                <IconButton aria-label="delete"  color="primary"  title=" Imprimir"  sx={{height: "40px"}}>
                  <PrintIcon size="medium" sx={{mr:1,color:"black"}} /> <Typography sx={{color: "black"}}> Imprimir</Typography>
                </IconButton>
                <IconButton aria-label="delete"    onClick={exportPDF} sx={{height: "40px"}}>
                  <PictureAsPdfIcon size="medium" sx={{mr:1,color:"red"}} /> <Typography sx={{color: "black"}}>Exportar Pdf</Typography>
                </IconButton>
              </Box>
          </Box>
        
          
          <TablePagination
            rowsPerPageOptions={[10,20,30]}
            component="div"
            count={relatorios[0].length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
                  {filteredAssociados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id , nome , data_cobranca,telefone1,cnpf_cnpj,nome_artistico,email,status } = row;
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
                          <TableCell align="left">{cnpf_cnpj}</TableCell>
                          <TableCell align="left">{telefone1}</TableCell>
                          <TableCell align="left">{email}</TableCell>
       
                          
                          <TableCell align="left">{status}</TableCell>
       
                          <TableCell align="left">{data_cobranca}</TableCell>

                          

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
            count={relatorios[0].length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
   
        
    </Page>
  );
}


const statusAbout = {
 
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
  width: '300px'

}

const boxAlert = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1em'
}

const colorStatus = (status) => {

if(status == "pendente"){
  const color= {
    background: "#f0dc82",
    borderRadius: 20,
    textAlign: "center",
    color: "black"
  }
  return color
}else if(status == "aprovado"){
  const color= {
    background: "#7ba05b",
    borderRadius: 20,
    textAlign: "center",
    color: "black"
  }
  return color
}else if(status == "bloqueado"){
  const color= {
    background: "#da6351",
    borderRadius: 20,
    textAlign: "center",
    color: "black"
  }
  return color
}


}

const tituloStatus = {
  marginBottom: 15,
  fontSize: 18,
  fontWeight: 600,
  
 }
 
 const stackSelect = {
   marginBottom: 15
 }

 const stackOptions = {
  marginTop: 15,
  marginBottom: 15,
  marginLeft: 0,
  marginRight: 20
 }
 
 const tituloHelpText = {
   fontSize: 15,
   fontWeight: 600,
 }
 
 const conteudoHelpText = {
   fontSize: 13,
   fontWeight: 500,
   color: "black"
 }
 