
const resultado = document.getElementById('resultado');


function getDadosCEP(cep){

    let url = 'https://viacep.com.br/ws/'+89296000+'/json/';

    console.log(url);

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.open('get', url)

    xmlHttp.onreadystatechange = () => {

        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){

            let dadosText =  xmlHttp.responseText;
            let dadosObj = JSON.parse(dadosText);

            resultado.innerHTML = '';

            const divResultadoCep = document.createElement('div');
            divResultadoCep.id = 'resultadoCEP';

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