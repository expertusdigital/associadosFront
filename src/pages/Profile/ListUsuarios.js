import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import api from '../../utils/api'
import {getTenant_id} from '../../utils/services/auth'
import { useState } from 'react';

const columns = [
  { field: 'Nome', headerName: 'Nome', width: 130 },
  { field: 'Email', headerName: 'Email', width: 130 },
  { field: 'Senha', headerName: 'Senha', width: 130 },


];





export default function ListUsuarios() {
  const [usuarios, setUsuario] = useState([]);
  const tenantId = getTenant_id();

  useEffect(() => {
  
    const getUsuario = async () => {
      const data = await api.get(`http://localhost:8000/${tenantId}/usuarios`, {
       
        })
      
        setUsuario(data.data);
    };
    getUsuario()
  }, []);

  const rows = {}
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}