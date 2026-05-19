async function carregarOferta() {
  try {
    const resposta = await fetch("/.netlify/functions/oferta-switch-2");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados da oferta.");
    }

    const produto = await resposta.json();

    document.getElementById("nomeProduto").textContent = produto.nome;
    document.getElementById("lojaProduto").textContent = produto.loja;
    document.getElementById("precoAtual").textContent = produto.precoAtual;
    document.getElementById("precoMedio").textContent = produto.precoMedio;
    document.getElementById("statusPreco").textContent = produto.statusPreco;

    document.getElementById("imagemProduto").src = produto.imagem;
    document.getElementById("imagemProduto").alt = produto.nome;

    document.getElementById("botaoOferta").href = produto.link;
  } catch (erro) {
    console.error("Erro ao carregar oferta:", erro);

    document.getElementById("nomeProduto").textContent = "Não foi possível carregar a oferta";
    document.getElementById("statusPreco").textContent = "Tente novamente mais tarde.";
  }
}

function copiarLink() {
  const botaoOferta = document.getElementById("botaoOferta");
  const linkAfiliado = botaoOferta.href;

  if (!linkAfiliado || linkAfiliado.endsWith("#")) {
    alert("A oferta ainda não foi carregada.");
    return;
  }

  navigator.clipboard.writeText(linkAfiliado)
    .then(() => {
      alert("Link da oferta copiado!");
    })
    .catch(() => {
      alert("Não foi possível copiar o link automaticamente.");
    });
}

carregarOferta();