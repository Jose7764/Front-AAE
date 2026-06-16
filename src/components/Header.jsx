import { ShoppingCart, ShieldCheck } from "lucide-react";
import { useCart } from "../hooks/useCart";

export function Header({ page, onNavigate }) {
  const cart = useCart();

  const links = [
    ["home", "Início"],
    ["produtos", "Produtos"],
    ["admin", "Admin"],
  ];

  return (
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate("home")} aria-label="Ir para início">
        <span className="brand-mark">A</span>
        <span>AAE · Atacados Eletrônicos</span>
      </button>
      <nav className="nav-links" aria-label="Navegação principal">
        {links.map(([key, label]) => (
          <button key={key} className={page === key ? "active" : ""} onClick={() => onNavigate(key)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => onNavigate("admin")} aria-label="Portal administrativo">
          <ShieldCheck size={18} />
        </button>
        <button className="cart-button" onClick={() => onNavigate("carrinho")} aria-label="Abrir carrinho">
          <ShoppingCart size={18} />
          <span>{cart.quantidadeTotal}</span>
        </button>
      </div>
    </header>
  );
}
