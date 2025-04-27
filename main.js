// Importa funções de buscar cantores e utilidades
import { buscarCantores } from './api.js';
import { debounce, criarCartaoCantor } from './utils.js';

// Pega os elementos do HTML
const entradaBusca = document.getElementById('entradaBusca');
const botaoBuscar = document.getElementById('botaoBuscar');
const resultadoDiv = document.getElementById('resultado');
const paginacaoDiv = document.getElementById('paginacao');

// Variáveis para guardar dados e controlar a página
let dadosAtuais = [];
let paginaAtual = 1;

// Quando clicar no botão, chama a função de buscar (com atraso de 300ms)
botaoBuscar.addEventListener('click', debounce(buscar, 300));

// Função que busca cantores
function buscar() {
  const termo = entradaBusca.value.trim(); // Pega o que foi digitado
  if (!termo) return; // Se não digitou nada, não faz nada

  // Verifica se já tem no cache
  const cache = localStorage.getItem(termo);
  if (cache) {
    const { dados, expiracao } = JSON.parse(cache);
    if (Date.now() < expiracao) {
      // Usa o cache se ainda for válido
      dadosAtuais = dados;
      paginaAtual = 1;
      renderizarPagina(paginaAtual);
      return;
    } else {
      // Remove cache vencido
      localStorage.removeItem(termo);
    }
  }

  // Se não tiver cache, busca na API
  buscarCantores(termo).then(dados => {
    dadosAtuais = dados;
    paginaAtual = 1;
    // Salva no localStorage por 5 minutos
    localStorage.setItem(termo, JSON.stringify({
      dados: dadosAtuais,
      expiracao: Date.now() + 5 * 60 * 1000
    }));
    renderizarPagina(paginaAtual);
  }).catch(err => {
    resultadoDiv.innerHTML = `<p>Erro ao buscar artistas.</p>`;
    console.error(err);
  });
}

// Mostra os cantores na tela (5 por página)
function renderizarPagina(pagina) {
  const inicio = (pagina - 1) * 5;
  const fim = inicio + 5;
  const cantores = dadosAtuais.slice(inicio, fim);

  resultadoDiv.innerHTML = ''; // Limpa a tela
  cantores.forEach(cantor => {
    const cartao = criarCartaoCantor(cantor);
    resultadoDiv.appendChild(cartao);
  });

  renderizarPaginacao(); // Atualiza os botões de página
}

// Cria os botões de página
function renderizarPaginacao() {
  const totalPaginas = Math.ceil(dadosAtuais.length / 5);
  paginacaoDiv.innerHTML = '';

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement('button');
    botao.textContent = i;
    botao.onclick = () => {
      paginaAtual = i;
      renderizarPagina(i);
    };
    paginacaoDiv.appendChild(botao);
  }
}