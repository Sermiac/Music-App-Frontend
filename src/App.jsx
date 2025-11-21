// App.jsx
import "./css/App.css";
import { PrimerComponente } from "./components/PrimerComponente.jsx"; /* Otra forma de importar (solo prueba) */
import MovieCard from "./components/MovieCard.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
