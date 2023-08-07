//* Consultar cep por nome da rua
function consultarCepPorRua() {
   // const rua = document.getElementById('rua').value;
   // const cidade = document.getElementById('cidade').value;
   // const uf = document.getElementById('estado').value;
   const rua = 'eduardo neidert';
   const cidade = 'rio negrinho';
   const uf = 'sc';

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;

    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = ''; // Limpar o conteúdo anterior (se houver)

       
        if (!data.erro) {

            const ceps = data.map(obj => obj.cep);
            
          // *Criar os parágrafos com os resultados do CEP
          resultadoDiv.innerHTML += `<p>CEP(s) encontrado(s): ${ceps.join(', ')} </p>`;
        } else {
          resultadoDiv.innerHTML += '<p>Nenhum CEP encontrado para esse logradouro.</p>';
        }
      })
      .catch(error => {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<p>Ocorreu um erro na consulta.</p>';
        console.error('Ocorreu um erro na consulta:', error);
      });
      
  }