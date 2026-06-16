import { Eye, ShoppingCart } from "lucide-react";
import { formatCurrency, discountPercent, finalPrice } from "../utils";

export function ProductCard({ produto, onDetails, onAdd }) {
  const discount = discountPercent(produto);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {discount > 0 && <span className="badge">-{discount}%</span>}
        {produto.emPromocao && discount === 0 && <span className="badge">Oferta</span>}
        <img src={produto.imagemUrl} alt={produto.nome} loading="lazy" />
      </div>
      <div className="product-info">
        <div>
          <p className="category">{produto.categoria}</p>
          <h3>{produto.nome}</h3>
        </div>
        <p className="description">{produto.descricao}</p>
        <div className="price-line">
          <strong>{formatCurrency(finalPrice(produto))}</strong>
          {produto.precoPromocional && <span>{formatCurrency(produto.preco)}</span>}
        </div>
        <div className="card-actions">
          <button className="ghost-button" onClick={() => onDetails(produto)}>
            <Eye size={16} /> Detalhes
          </button>
          <button className="primary-button small" onClick={() => onAdd(produto)}>
            <ShoppingCart size={16} /> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
