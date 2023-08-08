const resultado = document.getElementById('resultado');

const form = document.getElementById('formRua');

form.addEventListener('submit', function(event){

  event.preventDefault();

  consultarCepPorRua();
});


//* Consultar cep por nome da rua
function consultarCepPorRua() {
   const rua = document.getElementById('rua').value;
   const cidade = document.getElementById('cidade').value;
   const uf = document.getElementById('estado').value.toUpperCase();


  const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;


  let xmlHttp = new XMLHttpRequest();

  xmlHttp.open('GET', url, true);

  xmlHttp.onreadystatechange = () => {

    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){

      let dadosText = xmlHttp.responseText;
      let dadosObj = JSON.parse(dadosText);  
      
      resultado.innerHTML = '';

      const divResultado = document.createElement('div');
      divResultado.id = 'resultadoCep';


      if(!dadosObj.erro){

        console.log(dadosObj);

        const cepsEncontrados = dadosObj.map(obj => obj.cep);
        const complementos = dadosObj.map(obj => obj.complemento);

        if(cepsEncontrados.length === complementos.length){
          divResultado.innerHTML += `<p><span>Cep(s) encontrados para a rua: <br> <h6> ${rua}</h6><br></span></p>`;
          
          document.getElementById('estado').value = '';
          document.getElementById('rua').value = '';
          document.getElementById('cidade').value = '';

          for(let i = 0; i < cepsEncontrados.length; i++){
            divResultado.innerHTML += `<p><span></span>${cepsEncontrados[i]} - ${complementos[i]}</p>`;
          }
        }
        
      }else{

        divResultado.innerHTML += '<p><span>Error: </span> Ocorreu um erro na consulta!</p>';
        console.error('Ocorreu um erro na consulta! <br> Status:', xmlHttp.status);

      }

      resultado.appendChild(divResultado); 
      

    }
  
  }

  xmlHttp.send();


  }


