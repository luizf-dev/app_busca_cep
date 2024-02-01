//* seleciona a div para mostrar o resultado na tela
const resultado = document.getElementById('resultado');

//* Seleciona o input para capturar o valor digitado
const cep = document.getElementById('cepInput').value.replace('-', '');


//* Função para consultar o endereço fornecendo o numero do CEP
function getDadosCEP(cep){

    if(cep == ''){
        alert('Digite o campo corretamente!')
    }

    //* URL para a API ViaCep dos correios
    let url = 'https://viacep.com.br/ws/'+cep+'/json/';


    //* Cria um novo objeto XMLHttpRequest 
    let xmlHttp = new XMLHttpRequest()

    //* Abre uma conexão GET assíncrona com a URL da API
    xmlHttp.open('get', url)

    //* Define uma função a ser chamada quando o estado da requisição mudar
    xmlHttp.onreadystatechange = () => {

        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){

            let dadosText =  xmlHttp.responseText;
            let dadosObj = JSON.parse(dadosText);

            //* Limpa o conteudo anterior da div resultado
            resultado.innerHTML = '';

            //* Cria um novo elemento de div para os resultados
            const divResultadoCep = document.createElement('div');
            divResultadoCep.id = 'resultadoEnd';

            //* Cria um novo elemento de div para o titulo
            const titulo = document.createElement('span');
            titulo.textContent = 'RESULTADOS DA SUA BUSCA!';
            divResultadoCep.appendChild(titulo);


            //* Verifica se os dados são válidos e imprime na tela
            if(dadosObj.cep){
                divResultadoCep.innerHTML += '<p><span>Cep: </span>' +dadosObj.cep+'</p>';
            }else{
               divResultadoCep.innerHTML += '<p><span>Cep: </span> Sem resultados!</p>'
            }

            if(dadosObj.localidade){
                divResultadoCep.innerHTML += '<p><span>Cidade: </span>'+dadosObj.localidade+'</p>'
            }else{
                divResultadoCep.innerHTML += '<p><span>Cidade: </span> Sem resultados! </p>'
            }

            if (dadosObj.logradouro) {
                divResultadoCep.innerHTML += '<p><span>Logradouro: </span>'+dadosObj.logradouro+'</p>'                
            }else{
                divResultadoCep.innerHTML += '<p><span>Logradouro: </span> Sem resultados! </p>'
            }

            if(dadosObj.bairro){
                divResultadoCep.innerHTML += '<p><span>Bairro: </span>'+dadosObj.bairro+'</p>'
            }else{
                divResultadoCep.innerHTML += '<p><span>Bairro: </span>Sem resultados!</p>'
            }

            if(dadosObj.uf){
                divResultadoCep.innerHTML += '<p><span>Estado: </span>'+dadosObj.uf+'</p>'
            }else{
                divResultadoCep.innerHTML += '<p><span>Estado: </span>Sem resultados!</p>'
            }

            if(dadosObj.ddd){
                divResultadoCep.innerHTML += '<p><span>DDD: </span>'+dadosObj.ddd+'</p>'
            }else{
                divResultadoCep.innerHTML += '<p><span>DDD: </span>Sem resultados!</p>'
            }
            
            //* Adiciona a div de resultados á div de resultado principal
            resultado.appendChild(divResultadoCep);           
        }

    }

     //* Envia a requisção
     xmlHttp.send();
}



//*Função para aplicar uma máscara ao input do CEP
function mascararCep(input){
    const cepValue = input.value.replace(/\D/g, '');
    if(cepValue.length > 5){
        input.value = `${cepValue.substr(0,5)}-${cepValue.substr(5,3)}`;
    }else{
        input.value = cepValue;
    }
}
