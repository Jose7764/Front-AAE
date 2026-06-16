import { useState } from "react";
import { Header } from "./components/Header";
import { Admin } from "./pages/Admin";
import { Carrinho } from "./pages/Carrinho";
import { Home } from "./pages/Home";
import { Produtos } from "./pages/Produtos";

export default function App() {
  const [page, setPage] = useState("home");

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Header page={page} onNavigate={navigate} />
      {page === "home" && <Home onNavigate={navigate} />}
      {page === "produtos" && <Produtos />}
      {page === "carrinho" && <Carrinho onNavigate={navigate} />}
      {page === "admin" && <Admin />}
    </>
  );
}
