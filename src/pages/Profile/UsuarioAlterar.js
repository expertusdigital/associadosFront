import * as Yup from 'yup';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getTenant_id,getAcessToken} from '../../utils/services/auth'
// material
import { Stack, TextField, FormControl} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'
// ----------------------------------------------------------------------

export default function NewwAssociados() {
  const navigate = useNavigate();

  const [nome, setNome] = useState();
  const [nome_artistico, setFantasia] = useState();
  const [cnpf_cnpj, setCpfCnpj] = useState();
  const [rua, setLogradouro] = useState();
  const [numero, setNumero] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [cep, setCep] = useState();
  const [telefone1, setTelefone1] = useState();
  const [telefone2, setTelefone2] = useState();
  const [email, setEmail] = useState();
  const [email2, setEmail2] = useState();
  const [data_nascimento,setData_nascimento] = useState();
  const [pais, setPais] = useState();
  const [data_cobranca,setdateCobranca] = useState();

  const tenantId = getTenant_id()
  var access_token = getAcessToken()


  async function formAssociados() {
    await axios.post(`http://localhost:8000/api/dashboard/${tenantId}/associados/add`,{
 

          nome,
          nome_artistico,
          cnpf_cnpj,
          data_nascimento,

          rua,
          numero,
          cep,
          cidade,
          uf,
          pais,

          email,
          email2,
          telefone1,
          telefone2,

          data_cobranca

      
      },{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
      } ).then((response) =>{
        console.log(response.data)
    })
 }

 

   

   const handleSubmit = async e => {
    e.preventDefault();
    formAssociados();
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
              onChange={e => setFantasia(e.target.value)}
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
                  type="data"
                  label="Data de Nascimento"
                  onChange={e => setData_nascimento(e.target.value)}


                 
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
                label="Numero"
                onChange={e => setNumero(e.target.value)}

              />

            <TextField
                fullWidth
                autoComplete="username"
                type="number"
                label="cep"
                onChange={e => setCep(e.target.value)}

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
                onChange={e => setPais(e.target.value)}
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
                label="Telefone"
                onChange={e => setTelefone2(e.target.value)}
              />
               
          </Stack>


       
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      

            <Form.Control
              as={InputMask}
              mask="99-99"
              placeholder="Digite se CPF"
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
