import React from "react"

import { loadFull } from "tsparticles";
 
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../utils/api';
import {getAcessToken , getTenant_id} from '../../utils/services/auth'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { Box, Button, IconButton } from "@mui/material";
import { UserListToolbar } from "../../sections/@dashboard/user";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'nome', label: 'Nome Completo', alignRight: false },
  { id: 'nome_artistico', label: 'Nome artístico', alignRight: false },
  { id: 'data_nascimento', label: 'Data Nascimento', alignRight: false },
  { id: 'cnpf_cnpj', label: 'CPf/CNPJ', alignRight: false },
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
  let pageSize = 10;
  const [page, setPage] = React.useState({
    skip: 0,
    take: pageSize
  });

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
        await api.post(`dashboard/${JSON.parse(getTenant_id())}/associados/deletar/${id}`,{
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



    const grid = <Grid data={filteredUsers.slice(page.skip, page.skip + page.take)} pageable={true} onPageChange={pageChange} pageSize={pageSize} total={total} {...page} >
  
         
     
        <Column field="nome" title="Nome" width="alto"  />
        <Column field="cnpf_cnpj" title="cnpf_cnpj" width="alto" height="50px" />
        <Column field="nome_artistico" title="nome_artistico" width="alto" />
        <Column field="data_nascimento" title="data_nascimento" width="alto" />
        <Column field="email" title="email" width="alto" />
        <Column field="telefone1" title="telefone1" width="alto" />

        <Column field="cep" title="cep" width="alto" />
        <Column field="rua" title="rua" width="alto" />
        <Column field="cidade" title="cidade" width="alto" />


        <Column field="data_cobranca" title="data_cobranca" width="alto" />
        <GridToolbar>
          <Box  sx={{display: "flex" , justifyContent: "right", width: "100%"}}> 
            <IconButton aria-label="delete"  color="primary"  title="Export PDF"  onClick={exportPDF}>
              <PictureAsPdfIcon />
            </IconButton>
          </Box>
        </GridToolbar>
      </Grid>;
return <div>
         <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        {grid}
        <GridPDFExport ref={pdfExport => gridPDFExport = pdfExport} margin="1cm">
          {grid}
        </GridPDFExport>
      </div>;
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

