import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Cafe from './pages/Cafe';
import Booking from './pages/Booking';
import About from './pages/About';
import Analytics from './pages/Analytics';
import RoomAvailability from './pages/RoomAvailability';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AccessHistory from './pages/AccessHistory';
import AdminDashboard from './pages/AdminDashboard';
import EditRoomSchedule from './pages/EditRoomSchedule';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';

const AppContent = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const showLayout = !['/login', '/signup'].includes(location.pathname);
  useEffect(() => {
    if (
      location.pathname === '/dashboard' ||
      location.pathname === '/analytics' ||
      location.pathname === '/room-availability' ||
      location.pathname === '/access-history' ||
      location.pathname === '/edit-room-schedule'
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location.pathname]);
  return (
    <>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* =================== admin sections =======================*/}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/access-history" element={<AccessHistory />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/room-availability" element={<RoomAvailability />} />
        <Route path="/edit-room-schedule" element={<EditRoomSchedule />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
