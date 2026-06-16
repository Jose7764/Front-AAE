import { useCallback, useEffect, useState } from "react";
import { produtosApi } from "../services/api";

export function useProducts(loader = produtosApi.listar) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const carregar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProdutos(await loader());
    } catch (err) {
      setError(err.message || "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { produtos, setProdutos, loading, error, carregar };
}
