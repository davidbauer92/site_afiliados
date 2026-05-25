let produtosCarregados = [];
let categoriaAtual = "Todos";
let toastTimer;

const listaProdutos = document.getElementById("listaProdutos");
const botoesFiltro = document.querySelectorAll("[data-categoria]");
const toast = document.getElementById("toast");

async function carregarProdutos() {
  renderizarCarregando();

  try {
    const resposta = await fetch("/api/ofertas");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados dos produtos.");
    }

    produtosCarregados = await resposta.json();
    renderizarProdutos(produtosCarregados);
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    renderizarErro();
  }
}

function renderizarCarregando() {
  listaProdutos.innerHTML = Array.from({ length: 2 }, () => `
    <article class="produto-card skeleton">
      <div class="produto-imagem"></div>
      <div class="produto-info">
        <span></span>
        <strong></strong>
        <p></p>
        <p></p>
      </div>
    </article>
  `).join("");
}

function renderizarProdutos(produtos) {
  if (!produtos.length) {
    renderizarVazio();
    return;
  }

  listaProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    const card = document.createElement("article");
    card.className = "produto-card";

    card.innerHTML = `
      <a class="produto-imagem" href="${produto.link}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" />
      </a>

      <div class="produto-info">
        <div class="card-meta">
          <span class="tag">${produto.categoria}</span>
          <span class="loja">${produto.loja}</span>
        </div>

        <h3>${produto.nome}</h3>
        <p class="descricao">${produto.descricao}</p>

        <div class="preco-area">
          <p class="preco-antigo">${produto.precoMedio}</p>
          <p class="preco-atual">${produto.precoAtual}</p>
          <p class="status-preco">${produto.statusPreco}</p>
        </div>

        <div class="botoes">
          <a class="botao-principal" href="${produto.link}" target="_blank" rel="nofollow sponsored noopener">
            Ver oferta
          </a>
          <button class="botao-secundario" type="button" data-link="${produto.link}">
            Copiar link
          </button>
        </div>
      </div>
    `;

    listaProdutos.appendChild(card);
  });
}

function renderizarErro() {
  listaProdutos.innerHTML = `
    <article class="empty-state">
      <h3>Não foi possível carregar as ofertas</h3>
      <p>Tente novamente em alguns instantes. Se o problema continuar, confira a conexão ou o deploy da função.</p>
      <button class="botao-secundario" type="button" data-retry>Tentar novamente</button>
    </article>
  `;
}

function renderizarVazio() {
  listaProdutos.innerHTML = `
    <article class="empty-state">
      <h3>Nenhuma oferta nesta categoria</h3>
      <p>Escolha outra categoria ou volte mais tarde para conferir novos produtos cadastrados.</p>
    </article>
  `;
}

function filtrarProdutos(categoria) {
  categoriaAtual = categoria;
  atualizarFiltroAtivo();

  if (categoria === "Todos") {
    renderizarProdutos(produtosCarregados);
    return;
  }

  const produtosFiltrados = produtosCarregados.filter((produto) => produto.categoria === categoria);
  renderizarProdutos(produtosFiltrados);
}

function atualizarFiltroAtivo() {
  botoesFiltro.forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.categoria === categoriaAtual);
  });
}

function copiarLink(linkAfiliado) {
  navigator.clipboard.writeText(linkAfiliado)
    .then(() => mostrarToast("Link da oferta copiado."))
    .catch(() => mostrarToast("Não foi possível copiar o link automaticamente."));
}

function mostrarToast(mensagem) {
  clearTimeout(toastTimer);
  toast.textContent = mensagem;
  toast.classList.add("visivel");

  toastTimer = setTimeout(() => {
    toast.classList.remove("visivel");
  }, 2800);
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => filtrarProdutos(botao.dataset.categoria));
});

listaProdutos.addEventListener("click", (event) => {
  const botaoCopiar = event.target.closest("[data-link]");

  if (botaoCopiar) {
    copiarLink(botaoCopiar.dataset.link);
  }

  const botaoTentarNovamente = event.target.closest("[data-retry]");

  if (botaoTentarNovamente) {
    carregarProdutos();
  }
});

carregarProdutos();
