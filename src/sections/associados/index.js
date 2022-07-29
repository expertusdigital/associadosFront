import * as Yup from 'yup';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, FormControl} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'
// ----------------------------------------------------------------------

export default function NewwAssociados() {
  const navigate = useNavigate();

  const [nome, setNome] = useState();
  const [empresa, setEmpresa] = useState();
  const [tenant_id, setTenant_id] = useState(empresa);
  const [cnpf_cnpj, setCpfCnpj] = useState();
  const [logradouro, setLogradouro] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [cep, setCep] = useState();
  const [telefone1, setTelefone1] = useState();
  const [telefone2, setTelefone2] = useState();
  const [email, setEmail] = useState();
const [dateCobranca,setdateCobranca] = useState();




  async function adminLogin() {
    await axios.post("http://localhost:8000/api/dashboard/registrar",{
          email,
          email2,
          tenant_id,

          nome,
          empresa,
          cnpf_cnpj,
          fantasia,

          logradouro,
          numero,
          bairro,
          cidade,
          uf,
          cep,

          telefone1,
          telefone2,
          dateCobranca

      
      }).then((response) =>{
        console.log(response.data)
    })
 }

 

   

   const handleSubmit = async e => {
    e.preventDefault();
    adminLogin();
  }
 



  return (
    <FormControl >
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              required
              autoComplete="username"
              type="text"
              label="Nome Completo"
              onChange={e => setNome(e.target.value)}
            />
            <TextField
              fullWidth
              required
              autoComplete="username"
              type="text"
              label="Nome Artistico"
              onChange={e => setEmpresa(e.target.value)}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
                  fullWidth
                  required
                  autoComplete="username"
                  type="text"
                  label="CPF/CNPJ"
                  onChange={e => setCpfCnpj(e.target.value)}
            />
             <TextField
                  fullWidth
                  required
                  autoComplete="username"
                  type="text"
                  label="Data de Nascimento"
                 
            />

          </Stack>
      
          <TextField
                fullWidth
                required
                autoComplete="username"
                type="email"
                label="Email address"
                onChange={e => setEmail(e.target.value)}

            
              
          />
            <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address (opcional)"
                onChange={e => setEmail2(e.target.value)}

            
              
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Rua"
                onChange={e => setLogradouro(e.target.value)}

              />

              <TextField
                fullWidth
                autoComplete="username"
                type="number"
                label="Numero "
                onChange={e => setNumero(e.target.value)}

              />

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Cep "
                onChange={e => setBairro(e.target.value)}

              />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Cidade (Opcional)"
                onChange={e => setCidade(e.target.value)}
              />

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Uf (Opcional)"
                onChange={e => setUf(e.target.value)}
              />

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Pais (Opcional)"
                onChange={e => setCep(e.target.value)}
              />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                required
                autoComplete="username"
                type="text"
                label="Telefone"
                onChange={e => setTelefone1(e.target.value)}
              />
                 <TextField
                fullWidth
                required
                autoComplete="username"
                type="text"
                label="Telefone (Opcional)"
                onChange={e => setTelefone1(e.target.value)}
              />

          </Stack>


       
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                required
                autoComplete="username"
                type="text"
                label="Data de cobrança"
                onChange={e => setdateCobranca(e.target.value)}
              />
          </Stack>

   

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Registrar
          </LoadingButton>
        </Stack>
      </form>
    </FormControl>
  );
}
