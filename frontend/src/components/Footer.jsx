function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__content">
        <p className="app-footer__text">
          &copy; 2026 Grupo Crises. Todos os direitos reservados.
        </p>
        <a
          className="app-footer__github"
          href="https://github.com/mavelynleme/calculadora-estatistica"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir GitHub do projeto"
        >
          <svg
            className="app-footer__github-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.05 1.03-2.77-.11-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.37 1.91-1.34 2.75-1.06 2.75-1.06.55 1.42.21 2.47.1 2.73.64.72 1.03 1.64 1.03 2.77 0 3.98-2.34 4.86-4.57 5.11.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
            />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
