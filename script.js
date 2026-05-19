async function carregarProdutos() {
  const listaProdutos = document.getElementById("listaProdutos");

  try {
    const resposta = await fetch("/.netlify/functions/oferta-switch-2");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados dos produtos.");
    }

    const produtos = await resposta.json();

    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const card = document.createElement("section");
      card.className = "produto-card";

      card.innerHTML = `
        <div class="produto-imagem">
          <img
            src="${produto.imagem}"
            alt="${produto.nome}"
          />
        </div>

        <div class="produto-info">
          <span class="tag">${produto.categoria}</span>

          <h2>${produto.nome}</h2>

          <p class="descricao">
            Produto selecionado para quem está procurando uma boa oportunidade de compra em loja confiável.
          </p>

          <p class="loja">
            Loja: <strong>${produto.loja}</strong>
          </p>

          <div class="preco-area">
            <p class="preco-antigo">${produto.precoMedio}</p>
            <p class="preco-atual">${produto.precoAtual}</p>
            <p class="status-preco">${produto.statusPreco}</p>
          </div>

          <div class="botoes">
            <a
              class="botao-principal"
              href="${produto.link}"
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              Ver oferta
            </a>

            <button class="botao-secundario" onclick="copiarLink('${produto.link}')">
              Copiar link
            </button>
          </div>
        </div>
      `;

      listaProdutos.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);

    listaProdutos.innerHTML = `
      <section class="produto-card">
        <div class="produto-info">
          <h2>Não foi possível carregar as ofertas</h2>
          <p class="status-preco">Tente novamente mais tarde.</p>
        </div>
      </section>
    `;
  }
}

function copiarLink(linkAfiliado) {
  navigator.clipboard.writeText(linkAfiliado)
    .then(() => {
      alert("Link da oferta copiado!");
    })
    .catch(() => {
      alert("Não foi possível copiar o link automaticamente.");
    });
}

carregarProdutos();