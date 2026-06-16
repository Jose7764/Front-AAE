import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const storageKey = "aae-carrinho";

function precoFinal(produto) {
  return Number(produto.precoPromocional || produto.preco || 0);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + precoFinal(item.produto) * item.quantidade, 0);

    return {
      items,
      subtotal,
      total: subtotal,
      quantidadeTotal: items.reduce((sum, item) => sum + item.quantidade, 0),
      adicionar(produto) {
        setItems((current) => {
          const existing = current.find((item) => item.produto.id === produto.id);
          if (existing) {
            return current.map((item) =>
              item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
            );
          }
          return [...current, { produto, quantidade: 1 }];
        });
      },
      remover(id) {
        setItems((current) => current.filter((item) => item.produto.id !== id));
      },
      alterarQuantidade(id, quantidade) {
        const value = Math.max(1, Number(quantidade) || 1);
        setItems((current) =>
          current.map((item) => (item.produto.id === id ? { ...item, quantidade: value } : item))
        );
      },
      limpar() {
        setItems([]);
      },
      finalizar() {
        setItems([]);
        return "Compra finalizada com sucesso. Pedido simulado registrado.";
      },
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
