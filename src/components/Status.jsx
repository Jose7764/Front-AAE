export function Status({ loading, error, empty }) {
  if (loading) return <div className="status">Carregando produtos...</div>;
  if (error) return <div className="status error">{error}</div>;
  if (empty) return <div className="status">Nenhum produto encontrado.</div>;
  return null;
}
