import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ShoppingBag } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { Status } from "../components/Status";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { produtosApi } from "../services/api";
import { discountPercent, finalPrice, formatCurrency } from "../utils";

export function Home({ onNavigate }) {
  const { produtos, loading, error } = useProducts(produtosApi.destaques);
  const cart = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!produtos.length) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % produtos.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [produtos.length]);

  const active = produtos[activeIndex];
  const destaqueGrid = useMemo(() => produtos.slice(0, 6), [produtos]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="pill"><span /> Associação dos Atacados Eletrônicos</span>
          <h1>
            O hub dos <strong>atacados eletrônicos</strong> do Brasil.
          </h1>
          <p>Produtos desejados, preços agressivos e compra direta em um só lugar.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onNavigate("produtos")}>
              Ver destaques
            </button>
            <button className="ghost-button" onClick={() => onNavigate("admin")}>
              Acessar portal
            </button>
          </div>
        </div>
        <div className="hero-showcase">
          <Status loading={loading} error={error} empty={!active} />
          {active && (
            <article className="feature-card">
              {discountPercent(active) > 0 && <span className="badge">-{discountPercent(active)}%</span>}
              <img src={active.imagemUrl} alt={active.nome} />
              <div className="feature-copy">
                <span>Em destaque</span>
                <h2>{active.nome}</h2>
                <div className="feature-price">
                  <strong>{formatCurrency(finalPrice(active))}</strong>
                  {active.precoPromocional && <small>{formatCurrency(active.preco)}</small>}
                </div>
                <button className="primary-button small" onClick={() => cart.adicionar(active)}>
                  <ShoppingBag size={16} /> Adicionar
                </button>
              </div>
            </article>
          )}
          <div className="dots" aria-label="Produtos em destaque">
            {produtos.map((produto, index) => (
              <button
                key={produto.id}
                aria-label={`Ver ${produto.nome}`}
                className={index === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="scroll-hint">
          <ArrowDown size={15} /> Role para explorar
        </div>
      </section>

      <section className="catalog-preview">
        <div className="section-title">
          <span>Catálogo</span>
          <h2>Produtos em destaque</h2>
          <button onClick={() => onNavigate("produtos")}>Ver tudo →</button>
        </div>
        <div className="product-grid">
          {destaqueGrid.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              onDetails={() => onNavigate("produtos")}
              onAdd={cart.adicionar}
            />
          ))}
        </div>
      </section>
    </>
  );
}
