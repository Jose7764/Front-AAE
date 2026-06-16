const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Não foi possível concluir a requisição.";
    try {
      const data = await response.json();
      message = data.erro || data.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const produtosApi = {
  listar: () => request("/produtos"),
  buscarPorId: (id) => request(`/produtos/${id}`),
  criar: (produto) => request("/produtos", { method: "POST", body: JSON.stringify(produto) }),
  atualizar: (id, produto) => request(`/produtos/${id}`, { method: "PUT", body: JSON.stringify(produto) }),
  deletar: (id) => request(`/produtos/${id}`, { method: "DELETE" }),
  promocoes: () => request("/produtos/promocoes"),
  destaques: () => request("/produtos/destaques"),
  porCategoria: (categoria) => request(`/produtos/categoria/${encodeURIComponent(categoria)}`),
  buscarPorNome: (nome) => request(`/produtos/buscar?nome=${encodeURIComponent(nome)}`),
};

export const categorias = [
  "Smartphones",
  "Notebooks",
  "Headsets",
  "Smartwatches",
  "Teclados",
  "Mouses",
  "Monitores",
  "Caixas de som",
];
