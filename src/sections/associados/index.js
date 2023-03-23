import * as Yup from 'yup';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getTenant_id,getAcessToken} from '../../utils/services/auth'
// material
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
import Page from '../../components/Page';
import {  TextField, FormControl,

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
  TablePagination,} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'
// ----------------------------------------------------------------------

import apiUrl from '../../utils/api'
import { ToastContainer, toast } from 'react-toastify';
export default function NewwAssociados() {


  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getFullYear()}`;
 
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
  const [data_cobranca,setdateCobranca] = useState(date);
  
  

  async function formAssociados(status) {

    var status = status
    await axios.post( `${apiUrl.apiUrl}/dashboard/${JSON.parse(getTenant_id())}/associados/add`,{
 

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
          status,
          data_cobranca

      
      },{
        headers: {
          'Authorization': `Bearer ${JSON.parse(getAcessToken())}`
        },
  
      } ).then((response) =>{
        console.log(response)
        if(response.status == 200){
          alert("Campo(s) Obrigatirio(s) esta(ão) vazio(s)!")
        }
        if(response.status == 201){
         toast( "Cadastrado com Sucesso")
        }
    })
 }

 async function formRelatorio(status) {

  var status = status
  await axios.post( `${apiUrl.apiUrl}/dashboard/${JSON.parse(getTenant_id())}/relatorios/add`,{


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
        status,
        data_cobranca

    
    },{
      headers: {
        'Authorization': `Bearer ${JSON.parse(getAcessToken())}`
      },

    } ).then((response) =>{
      
  })
}

   const handleSubmitSim = async e => {
    e.preventDefault();
   
    await formAssociados("aprovado");
    await formRelatorio("aprovado");
    window.location.reload();
  }



  const handleSubmitNão= async e => {
    e.preventDefault();
    await formAssociados("pendente");
    window.location.reload();
  }

 
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

  const [editStatus, setEditStatus] = useState(false);
    const OpenStatus = () =>{
      setEditStatus(true);
   }
   
   const EditCloseStatus = (event) =>{
       event.preventDefault();
       setEditStatus(false);
   }
   

   

  return (
    <Page title="Clientes">   
     <ToastContainer></ToastContainer>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button >
            <Typography variant="h4" color="black" gutterBottom>
              Novo Associado
            </Typography>
          </Button>
     

        
        </Stack>

        <Card style={cardForm}>
          <FormControl style={StachForm} >
            <form autoComplete="off" noValidate>
              <Stack spacing={3}  >
               
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >

                  <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2} >

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Nome Completo"
                          onChange={e => setNome(e.target.value)}
                          style={controlFormCep}
                        />
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Nome Artistico"
                          onChange={e => setFantasia(e.target.value)}
                          style={controlFormCep}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        

                          <Form.Control placeholder='CPF/CNPJ*' as={InputMask} fullWidth         onChange={e => setCpfCnpj(e.target.value)} style={controlFormCep}/>
                        
                          <Form.Control placeholder='Data de Nascimento *' as={InputMask} fullWidth     type="date" id="start" name="trip-start"     onChange={e => setData_nascimento(e.target.value)} style={controlFormCep}/>

                      

                      </Stack>
                      
                      <TextField fullWidth required autoComplete="username" type="email" label="Email address" onChange={e => setEmail(e.target.value)}  style={controlFormCep}/>

                      <TextField  fullWidth  autoComplete="username"  type="email"  label="Email address (opcional)"  onChange={e => setEmail2(e.target.value)}  style={controlFormCep} />

                     
                  </Stack>
                  
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >

                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="text"
                          label="Rua"
                          onChange={e => setLogradouro(e.target.value)}
                          style={controlFormCep}
                        />

                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="number"
                          label="Numero"
                          style={controlFormCep}
                          onChange={e => setNumero(e.target.value)}

                        />

                      
                        <Form.Control as={InputMask} placeholder="Cep" fullWidth mask="99999-999" onChange={e => setCep(e.target.value)} style={controlFormCep}/>
                      
                        <Form.Control placeholder='Telefone *' as={InputMask} fullWidth      mask="(99)-99999-9999"    onChange={e => setTelefone1(e.target.value)} style={controlFormCep}/>
                  
                      


                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Cidade (Opcional)"
                          onChange={e => setCidade(e.target.value)}
                          style={controlFormCep}
                        />
                    
                          <TextField
                            fullWidth
                            type="text"
                            label="Uf (Opcional)"
                            onChange={e => setUf(e.target.value)}
                            style={controlFormCep}
                            inputProps={{ maxLength: 2}}
                          />
                          
                    

                      
                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="text"
                          label="Pais (Opcional)"
                          onChange={e => setPais(e.target.value)}
                          style={controlFormCep}
                        />

                      <Form.Control placeholder='Telefone(opcional)' as={InputMask} fullWidth       mask="(99)-99999-9999"     onChange={e => setTelefone2(e.target.value)} style={controlFormCep}/>
                    </Stack>
                  </Stack>
                </Stack>

                <Button fullWidth size="large"  variant="contained" onClick={OpenStatus} >
                  Registrar
                </Button>
              </Stack>

            </form>
          </FormControl>

       
                           
                            <Modal open={editStatus} onClose={EditCloseStatus} >
                              <Box >
                                <Card style={modalStyle}>
                                
                                        <Stack spacing={3}>
                                        <Typography > Deseja Confirma pagamento ? </Typography>
                                          
                                        <TextField id="outlined-basic" label="Valor do pagamento..." variant="outlined" 
                                          
                                        />

                                          <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                                          <Button fullWidth size="large" type="submit" variant="contained" sx={{mr:1}} onClick={handleSubmitSim}>
                                          Sim
                                          </Button>
                                          <Button fullWidth size="large" type="submit" variant="contained" onClick={handleSubmitNão}  >
                                          Não
                                          </Button>

                                          </Box>


                                        </Stack>
                                     
                                </Card>
                              </Box>
                            </Modal>
                     


        </Card>
      </Container>   
    </Page>
  );
}


const modalStyle = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #f2f2f2',

  padding: '1em',

}


const cardForm ={
  padding: "2em"
}


const StachForm ={
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}


const controlFormCep= {
  height: "55px",
  borderRadius: 10
}




const textoAjudaDC = {
  fontSize: 11,
  margin: 3
}















































