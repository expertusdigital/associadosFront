import { Typography } from "@mui/material";

export const maskCpfCnpj = (v) => {
    v = v.replace(/\D/g, "");
  
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      v = v.substring(0, 14); // limita em 14 números
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
  
    return v;
  };
  

  export const formatData = (data) => {

    var ano = data.split("-")[0]
    var mes = data.split("-")[1]
  
    if(mes == 1){
      return <Typography>Janeiro  de {ano}</Typography>
    }
    if(mes == 2){
      return <Typography>Feveiro  de {ano}</Typography>

    }

    if(mes == 3){
      return <Typography>Março  de {ano}</Typography>
    }

    if(mes == 4){
      return <Typography>Junho  de {ano}</Typography>
    }

    if(mes == 5){
      return <Typography>Maio  de {ano}</Typography>
    }

    if(mes == 6){
      return <Typography>Julho  de {ano}</Typography>
    }

    if(mes == 7){
      return <Typography>Agosto  de {ano}</Typography>
    }

    if(mes == 8){
      return <Typography>Setembro  de {ano}</Typography>
    }
    if(mes == 9){
      return <Typography>Outubro  de {ano}</Typography>
    }

    if(mes == 10){
      return <Typography>Novembro  de {ano}</Typography>
    }
    if(mes == 11){
      return <Typography>Dezembro de {ano}</Typography>
    }

    if(mes == 12){
      
    }




  }