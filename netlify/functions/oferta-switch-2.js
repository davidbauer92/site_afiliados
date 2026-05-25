export default async () => {
  const produtos = [
    {
      nome: "Nintendo Switch 2",
      loja: "Amazon",
      categoria: "Console",
      descricao: "Console Nintendo Switch 2 selecionado para quem quer acompanhar a nova geração com compra direta em loja conhecida.",
      precoAtual: "R$ 4.199,00",
      precoMedio: "Preço médio: R$ 4.499,00",
      statusPreco: "Preço conferido manualmente. Pode mudar a qualquer momento.",
      imagem: "https://m.media-amazon.com/images/I/714-Fh3ngmL._AC_SX679_.jpg",
      link: "https://www.amazon.com.br/dp/B0F3GWXLTS?tag=dcbauer0d-20"
    },
    {
      nome: "Nintendo Switch 2 Pro Controller Resident Evil Requiem Edition",
      loja: "Amazon",
      categoria: "Acessório",
      descricao: "Controle Pro Controller em edição especial para jogar com mais conforto e adicionar uma peça de coleção ao setup.",
      precoAtual: "R$ 661,85",
      precoMedio: "Preço médio: R$ 749,90",
      statusPreco: "Preço conferido manualmente. Pode mudar a qualquer momento.",
      imagem: "https://m.media-amazon.com/images/I/71eeLrGBskL._AC_SX679_.jpg",
      link: "https://www.amazon.com.br/dp/B0GGJB5FDJ?tag=dcbauer0d-20"
    }
  ];

  return Response.json(produtos);
};

export const config = {
  path: "/api/ofertas"
};
