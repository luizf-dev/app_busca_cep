//* seleciona a div para mostrar o resultado na tela
const resultado = document.getElementById('resultado');


//* seleciona o formulario com os inputs de entrada
const form = document.getElementById('formRua');


//* função que captura o evento e impede que a aplicação recarregue a página automaticamente
form.addEventListener('submit', function(event){

  event.preventDefault();

});


//* Função para consultar o cep fornecendo o nome da rua, cidade e estado
function consultarCepPorRua() {
   const rua = document.getElementById('rua').value;
   const cidade = document.getElementById('cidade').value;
   const uf = document.getElementById('estado').value.toUpperCase();

   if(rua == '' || cidade == '' || uf == ''){
    alert('Digite todos os campos corretamente!')
  }


  //* URL para a API ViaCep dos correios
  const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;


  //* Cria um novo objeto XMLHttpRequest 
  let xmlHttp = new XMLHttpRequest();

  //* Abre uma conexão GET assíncrona com a URL da API
  xmlHttp.open('GET', url, true);

  //* Define uma função a ser chamada quando o estado da requisição mudar
  xmlHttp.onreadystatechange = () => {

    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){

      let dadosText = xmlHttp.responseText;
      let dadosObj = JSON.parse(dadosText);  
      

      //* Limpa o conteudo anterior da div resultado
      resultado.innerHTML = '';

      //* Cria um novo elemento de div para os resultados
      const divResultado = document.createElement('div');
      divResultado.id = 'resultadoCep';


      if(!dadosObj.erro){

        //* Mapeia os CEPs e complementos a partir dos dados da API
        const cepsEncontrados = dadosObj.map(obj => obj.cep);
        const complementos = dadosObj.map(obj => obj.complemento);

        if(cepsEncontrados.length === complementos.length){
          divResultado.innerHTML += `<p><span>Cep(s) encontrados para a rua: <br> <h6> ${rua}</h6><br></span></p>`;
          
          document.getElementById('estado').value = '';
          document.getElementById('rua').value = '';
          document.getElementById('cidade').value = '';

          //* Faz o loop para exibir cada CEP com seu complemento
          for(let i = 0; i < cepsEncontrados.length; i++){
            divResultado.innerHTML += `<p><span></span>${cepsEncontrados[i]} - ${complementos[i]}</p>`;
          }
        }
        
      }else{
        //* Exibe uma mensagem de erro caso ocorra um erro na consulta
        divResultado.innerHTML += '<p><span>Error: </span> Ocorreu um erro na consulta!</p>';
        console.error('Ocorreu um erro na consulta! <br> Status:', xmlHttp.status);

      }

      //* Adiciona a div de resultados á div de resultado principal
      resultado.appendChild(divResultado);    

    }
  
  }

  //* Envia a requisção
  xmlHttp.send();
}


