import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { finalPrice, formatCurrency } from "../utils";

export function Carrinho({ onNavigate }) {
  const cart = useCart();
  const [message, setMessage] = useState("");

  function checkout() {
    setMessage(cart.finalizar());
  }

  return (
    <main className="page cart-page">
      <div className="page-title">
        <span>Pedido</span>
        <h1>Carrinho</h1>
      </div>
      {message && <div className="status success">{message}</div>}
      {!cart.items.length ? (
        <section className="empty-cart">
          <h2>Seu carrinho está vazio.</h2>
          <button className="primary-button" onClick={() => onNavigate("produtos")}>Ver produtos</button>
        </section>
      ) : (
        <section className="cart-layout">
          <div className="cart-list">
            {cart.items.map(({ produto, quantidade }) => (
              <article className="cart-item" key={produto.id}>
                <img src={produto.imagemUrl} alt={produto.nome} />
                <div>
                  <p className="category">{produto.categoria}</p>
                  <h3>{produto.nome}</h3>
                  <strong>{formatCurrency(finalPrice(produto))}</strong>
                </div>
                <div className="quantity">
                  <button onClick={() => cart.alterarQuantidade(produto.id, quantidade - 1)} aria-label="Diminuir quantidade">
                    <Minus size={16} />
                  </button>
                  <input value={quantidade} onChange={(e) => cart.alterarQuantidade(produto.id, e.target.value)} />
                  <button onClick={() => cart.alterarQuantidade(produto.id, quantidade + 1)} aria-label="Aumentar quantidade">
                    <Plus size={16} />
                  </button>
                </div>
                <button className="icon-button danger" onClick={() => cart.remover(produto.id)} aria-label="Remover produto">
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>Resumo</h2>
            <div><span>Subtotal</span><strong>{formatCurrency(cart.subtotal)}</strong></div>
            <div><span>Total</span><strong>{formatCurrency(cart.total)}</strong></div>
            <button className="primary-button" onClick={checkout}>Finalizar compra</button>
            <button className="ghost-button" onClick={cart.limpar}>Limpar carrinho</button>
          </aside>
        </section>
      )}
    </main>
  );
}
