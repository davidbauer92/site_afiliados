exports.handler = async function () {
  const produtos = [
    {
      nome: "Nintendo Switch 2",
      loja: "Amazon",
      categoria: "Console",
      precoAtual: "R$ 4.199,00",
      precoMedio: "Preço médio: R$ 4.499,00",
      statusPreco: "Preço conferido manualmente. Pode mudar a qualquer momento.",
      imagem: "https://m.media-amazon.com/images/I/714-Fh3ngmL._AC_SX679_.jpg",
      link: "https://www.amazon.com.br/dp/B0F3GWXLTS?tag=dcbauer0d-20"
    }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produtos)
  };
};