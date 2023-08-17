import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("OnSearch Cambio");
  }, [onSearch]);

  useEffect(() => {
    console.log("Componente Montado");
  }, []);

  useEffect(() => {
    console.log("Search Cambio");
  }, [search]);

  useImperativeHandle(ref, () => {
    return { search, setSearch };
  });

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "14px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 700 }}>Mi Boletera </p>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <input
          placeholder="Busca tu evento favorito"
          onChange={handleInputChange}
          value={search}
          onKeyDown={handleInputKeyDown}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            outline: "1px solid black",
          }}
        />
        <Link to="/profile/my-info" style={{ marginLeft: 24 }}>
          Mi perfil
        </Link>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
