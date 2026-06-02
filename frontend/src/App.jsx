import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import HomePage from "./pages/HomePage";

const HOME_URL = "https://estatistica-inferencial.vercel.app/";
const DESCRIPTIVE_URL = "https://calculadora-estatistica.vercel.app/";
const INFERENTIAL_URL = "https://estatistica-inferencial.vercel.app/#inferencial";

function App() {
  const openHome = () => {
    window.location.href = HOME_URL;
  };

  const openDescriptive = () => {
    window.location.href = DESCRIPTIVE_URL;
  };

  const openInferential = () => {
    window.location.href = INFERENTIAL_URL;
  };

  return (
    <>
      <Header
        activeView="descriptive"
        showNavigation={true}
        onNavigateHome={openHome}
        onOpenDescriptive={openDescriptive}
        onNavigateInferential={openInferential}
      />

      <main className="page-shell app-main" id="inicio">
        <HomePage />
      </main>

      <Footer />
    </>
  );
}

export default App;
