import { useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import HomePage from "./pages/HomePage";

const HOME_URL = "https://estatistica-inferencial.vercel.app/";
const INFERENTIAL_URL = "https://estatistica-inferencial.vercel.app/";
const DESCRIPTIVE_URL = "https://calculadora-estatistica.vercel.app/";

function App() {
  const [view] = useState("descriptive");

  const openHome = () => {
    window.location.href = HOME_URL;
  };

  const openInferential = () => {
    window.location.href = INFERENTIAL_URL;
  };

  const openDescriptive = () => {
    window.location.href = DESCRIPTIVE_URL;
  };

  return (
    <>
      <Header
        activeView={view}
        onNavigateHome={openHome}
        onNavigateInferential={openInferential}
        onOpenDescriptive={openDescriptive}
      />

      <main className="page-shell app-main" id="inicio">
        {view === "inferential" ? (
          <section className="hero" id="inferencial">
            <div className="hero-content">
              <h1>Estatística Inferencial</h1>
            </div>
          </section>
        ) : (
          <HomePage />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
