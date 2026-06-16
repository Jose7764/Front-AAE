import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { Status } from "../components/Status";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { categorias } from "../services/api";

export function Produtos() {
  const { produtos, loading, error } = useProducts();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [detalhe, setDetalhe] = useState(null);
  const cart = useCart();

  const filtrados = useMemo(() => {
    return produtos.filter((produto) => {
      const nomeOk = produto.nome.toLowerCase().includes(busca.toLowerCase());
      const categoriaOk = categoria === "Todas" || produto.categoria === categoria;
      return nomeOk && categoriaOk;
    });
  }, [produtos, busca, categoria]);

  return (
    <main className="page">
      <div className="page-title">
        <span>Catálogo</span>
        <h1>Produtos eletrônicos</h1>
      </div>
      <section className="filters">
        <label className="search-field">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome" />
        </label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option>Todas</option>
          {categorias.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </section>
      <Status loading={loading} error={error} empty={!loading && !filtrados.length} />
      <section className="product-grid">
        {filtrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} onDetails={setDetalhe} onAdd={cart.adicionar} />
        ))}
      </section>
      <ProductModal produto={detalhe} onClose={() => setDetalhe(null)} onAdd={cart.adicionar} />
    </main>
  );
}
