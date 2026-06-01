export function Header({
  activeView,
  showNavigation = true,
  onNavigateHome,
  onNavigateInferential,
  onOpenDescriptive,
}) {
  return (
    <header className="site-header app-header">
      <div className="header-inner">
        <button
          className="brand-button app-header__brand"
          type="button"
          onClick={onNavigateHome}
        >
          <span className="brand-title">Calculadora Estatística</span>
        </button>

        {showNavigation ? (
          <nav
            className="header-nav app-header__nav"
            aria-label="Navegação principal"
          >
            <button
              className={`nav-button app-header__link${
                activeView === "home" ? " active is-active" : ""
              }`}
              type="button"
              onClick={onNavigateHome}
            >
              Home
            </button>

            <button
              className={`nav-button app-header__link${
                activeView === "descriptive" ? " active is-active" : ""
              }`}
              type="button"
              onClick={onOpenDescriptive}
            >
              Descritiva
            </button>

            <button
              className={`nav-button app-header__link${
                activeView === "inferential" ? " active is-active" : ""
              }`}
              type="button"
              onClick={onNavigateInferential}
            >
              Inferencial
            </button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
