//* Requisições com ajax

function requisitarPaginas(url){

    //? variavel que contém uma nova instancia do objeto XMLHttpRequest()
    let pagina = new XMLHttpRequest();

    //? método open responsavel por estabelecer uma conexao com o servidor e configurar
    //? a url que será requisitada, nesse caso com o verbo get! O segundo parametro é a variavel
    //? pagina que vamos utilizar para abrir uma conexao com algum servidor    
    pagina.open('GET', url);

    

    //? atributo onreadystatechange que é executado sempre que o estado da requisição é modificado
    pagina.onreadystatechange = () => {

        if(pagina.readyState == 4 && pagina.status == 404 ){

            document.getElementById('paginas').innerHTML = '<span>ERROR: Página não encontrada!</span>';
    
        }

        if(pagina.readyState == 4 && pagina.status == 200){

            document.getElementById('paginas').innerHTML = pagina.responseText;
            
        }
    }

    //? método send que dispara a requisição para o servidor para que o XMLHttpRequest gerencie a resposta
    pagina.send();

   // console.log(pagina);
}