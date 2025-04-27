// Função para não deixar a busca ser feita toda hora (espera um tempinho)
export function debounce(funcao, espera) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcao.apply(this, args), espera);
  };
}

// Função que cria o "cartão" do cantor para mostrar na tela
export function criarCartaoCantor(cantor) {
  const cartao = document.createElement('div');
  cartao.style.border = '1px solid #ccc';
  cartao.style.padding = '10px';
  cartao.style.margin = '5px';

  // Monta o HTML do cartão com a imagem, nome e música do cantor
  cartao.innerHTML = `
    <img src="${cantor.artist.picture_small}" alt="${cantor.artist.name}" />
    <p><strong>${cantor.artist.name}</strong></p>
    <p>Música: ${cantor.title}</p>
  `;
  
  return cartao;
}