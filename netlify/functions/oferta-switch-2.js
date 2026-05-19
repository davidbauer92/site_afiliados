exports.handler = async function () {
  const oferta = {
    nome: "Nintendo Switch 2",
    loja: "Amazon",
    precoAtual: "R$ 4.199,00",
    precoMedio: "Preço médio: R$ 4.499,00",
    statusPreco: "Preço conferido manualmente. Pode mudar a qualquer momento.",
    imagem: "https://via.placeholder.com/500x350?text=Nintendo+Switch+2",
    link: "https://www.amazon.com.br/dp/CODIGO-DO-PRODUTO?tag=dcbauer0d-20"
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(oferta)
  };
};