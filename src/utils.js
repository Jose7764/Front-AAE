export function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function finalPrice(produto) {
  return Number(produto.precoPromocional || produto.preco || 0);
}

export function discountPercent(produto) {
  if (!produto.precoPromocional || !produto.preco) return 0;
  return Math.round((1 - Number(produto.precoPromocional) / Number(produto.preco)) * 100);
}
