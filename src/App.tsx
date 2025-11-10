import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/Footer';
import Cafe from './pages/Cafe';
import About from './pages/About';
import Analytics from './pages/Analytics';

function App() {
  const isAdmin = false;
  return (
    <Router>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
