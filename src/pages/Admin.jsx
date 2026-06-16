import { Edit3, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Status } from "../components/Status";
import { categorias, produtosApi } from "../services/api";
import { formatCurrency } from "../utils";

const emptyForm = {
  nome: "",
  descricao: "",
  categoria: "Smartphones",
  preco: "",
  precoPromocional: "",
  imagemUrl: "",
  estoque: 0,
  emPromocao: false,
  destaque: false,
};

export function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function carregar() {
    setLoading(true);
    setError("");
    try {
      setProdutos(await produtosApi.listar());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function editar(produto) {
    setEditingId(produto.id);
    setForm({
      nome: produto.nome || "",
      descricao: produto.descricao || "",
      categoria: produto.categoria || "Smartphones",
      preco: produto.preco || "",
      precoPromocional: produto.precoPromocional || "",
      imagemUrl: produto.imagemUrl || "",
      estoque: produto.estoque || 0,
      emPromocao: Boolean(produto.emPromocao),
      destaque: Boolean(produto.destaque),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelar() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function salvar(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const payload = {
      ...form,
      preco: Number(form.preco),
      precoPromocional: form.precoPromocional ? Number(form.precoPromocional) : null,
      estoque: Number(form.estoque),
      ativo: true,
    };

    try {
      if (editingId) {
        await produtosApi.atualizar(editingId, payload);
        setMessage("Produto atualizado com sucesso.");
      } else {
        await produtosApi.criar(payload);
        setMessage("Produto cadastrado com sucesso.");
      }
      cancelar();
      await carregar();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function excluir(id) {
    setError("");
    setMessage("");
    try {
      await produtosApi.deletar(id);
      setMessage("Produto excluído com sucesso.");
      await carregar();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page admin-page">
      <div className="page-title">
        <span>Portal</span>
        <h1>Gerenciar produtos</h1>
      </div>
      {message && <div className="status success">{message}</div>}
      {error && <div className="status error">{error}</div>}

      <section className="admin-layout">
        <form className="admin-form" onSubmit={salvar}>
          <h2>{editingId ? "Editar produto" : "Cadastrar produto"}</h2>
          <div className="form-grid">
            <label>Nome<input required value={form.nome} onChange={(e) => update("nome", e.target.value)} /></label>
            <label>Categoria<select value={form.categoria} onChange={(e) => update("categoria", e.target.value)}>{categorias.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Preço<input required type="number" min="0" step="0.01" value={form.preco} onChange={(e) => update("preco", e.target.value)} /></label>
            <label>Preço promocional<input type="number" min="0" step="0.01" value={form.precoPromocional} onChange={(e) => update("precoPromocional", e.target.value)} /></label>
            <label>URL da imagem<input required value={form.imagemUrl} onChange={(e) => update("imagemUrl", e.target.value)} /></label>
            <label>Estoque<input required type="number" min="0" value={form.estoque} onChange={(e) => update("estoque", e.target.value)} /></label>
          </div>
          <label>Descrição<textarea required value={form.descricao} onChange={(e) => update("descricao", e.target.value)} /></label>
          <div className="checks">
            <label><input type="checkbox" checked={form.emPromocao} onChange={(e) => update("emPromocao", e.target.checked)} /> Produto em promoção</label>
            <label><input type="checkbox" checked={form.destaque} onChange={(e) => update("destaque", e.target.checked)} /> Produto em destaque</label>
          </div>
          <div className="form-actions">
            <button className="primary-button" disabled={saving}><Save size={17} /> {saving ? "Salvando..." : "Salvar"}</button>
            {editingId && <button type="button" className="ghost-button" onClick={cancelar}><X size={17} /> Cancelar</button>}
          </div>
        </form>

        <section className="admin-list">
          <h2>Produtos cadastrados</h2>
          <Status loading={loading} error="" empty={!loading && !produtos.length} />
          {produtos.map((produto) => (
            <article className="admin-row" key={produto.id}>
              <img src={produto.imagemUrl} alt={produto.nome} />
              <div>
                <p className="category">{produto.categoria}</p>
                <h3>{produto.nome}</h3>
                <span>{formatCurrency(produto.precoPromocional || produto.preco)} · estoque {produto.estoque}</span>
              </div>
              <button className="icon-button" onClick={() => editar(produto)} aria-label="Editar produto"><Edit3 size={17} /></button>
              <button className="icon-button danger" onClick={() => excluir(produto.id)} aria-label="Excluir produto"><Trash2 size={17} /></button>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
