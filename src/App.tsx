import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Cafe from './pages/Cafe';
import Booking from './pages/Booking';
import About from './pages/About';
import Analytics from './pages/Analytics';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';

function App() {
  const isAdmin = false;
  return (
    <Router>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
