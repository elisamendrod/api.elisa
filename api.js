// Guarda a chave da API e o host
const CHAVE_API = 'a1a3daf0a9mshbe0b8bba288d42cp12ae03jsn2affe7be27c8';
const HOST_API = 'deezerdevs-deezer.p.rapidapi.com';

// Função que busca cantores na API usando o nome que a pessoa digitou
export async function buscarCantores(termo) {
  const url = `https://${HOST_API}/search?q=${encodeURIComponent(termo)}`;

  // Faz a requisição para a API
  const resposta = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': CHAVE_API,
      'X-RapidAPI-Host': HOST_API
    }
  });

  // Se a resposta não for ok, dá erro
  if (!resposta.ok) {
    throw new Error('Erro ao buscar dados da API');
  }

  // Pega os dados da resposta e retorna
  const dados = await resposta.json();
  return dados.data;
}