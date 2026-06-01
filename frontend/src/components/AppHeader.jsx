function AppHeader() {
  const navItems = [
    { label: "Home", href: "#inicio" },
    { label: "Descritiva", href: "#descritiva", isActive: true },
    { label: "Inferencial", href: "#inferencial" },
  ];

  return (
    <header className="app-header">
      <a className="app-header__brand" href="#inicio" aria-label="Ir para o inicio">
        Calculadora Estatistica
      </a>

      <nav className="app-header__nav" aria-label="Navegacao principal">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={`app-header__link${item.isActive ? " is-active" : ""}`}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default AppHeader;
