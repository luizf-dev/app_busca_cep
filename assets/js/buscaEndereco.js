
const resultado = document.getElementById('resultado');
const cep = document.getElementById('cepInput').value.replace('-', '');

function getDadosCEP(cep){

    let url = 'https://viacep.com.br/ws/'+cep+'/json/';

    //console.log(url);

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.open('get', url)

    xmlHttp.onreadystatechange = () => {

        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){

            let dadosText =  xmlHttp.responseText;
            let dadosObj = JSON.parse(dadosText);

            resultado.innerHTML = '';

            const divResultadoCep = document.createElement('div');
            divResultadoCep.id = 'resultadoEnd';

            const titulo = document.createElement('span');
            titulo.textContent = 'RESULTADOS DA SUA BUSCA!';
            divResultadoCep.appendChild(titulo);

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
            
            resultado.appendChild(divResultadoCep);           
        }

    }

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
