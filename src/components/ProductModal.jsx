import { X, ShoppingCart } from "lucide-react";
import { finalPrice, formatCurrency } from "../utils";

export function ProductModal({ produto, onClose, onAdd }) {
  if (!produto) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={produto.nome} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar detalhes">
          <X size={20} />
        </button>
        <img src={produto.imagemUrl} alt={produto.nome} />
        <div className="modal-body">
          <p className="category">{produto.categoria}</p>
          <h2>{produto.nome}</h2>
          <p>{produto.descricao}</p>
          <div className="detail-grid">
            <span>Estoque</span>
            <strong>{produto.estoque} unidades</strong>
            <span>Preço</span>
            <strong>{formatCurrency(finalPrice(produto))}</strong>
          </div>
          <button className="primary-button" onClick={() => onAdd(produto)}>
            <ShoppingCart size={18} /> Adicionar ao carrinho
          </button>
        </div>
      </section>
    </div>
  );
}
