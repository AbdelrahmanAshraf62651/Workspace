import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Cafe from "./pages/Cafe";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import RoomAvailability from "./pages/RoomAvailability";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccessHistory from "./pages/AccessHistory";
import AdminDashboard from "./pages/AdminDashboard";
import EditRoomSchedule from "./pages/EditRoomSchedule";
import AdminGalleryManagement from "./pages/AdminGalleryManagement";
import AdminAbout from "./pages/AdminAbout";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import AdminLogin from "./pages/AdminLogin";
import CafeManagement from "./pages/CafeManagement";
import BookingManagement from "./pages/BookingManagement";
import ContactMessagesManagement from "./pages/ContactMessagesManagement";
import { UserImageContext } from "./contexts/Context";
const AppContent = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const showLayout = !["/login", "/signup"].includes(location.pathname);
  useEffect(() => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/analytics" ||
      location.pathname === "/room-availability" ||
      location.pathname === "/access-history" ||
      location.pathname === "/edit-room-schedule" ||
      location.pathname === "/admin-gallery-management" ||
      location.pathname === "/admin-about-settings" ||
      location.pathname === "/edit-room-schedule" ||
      location.pathname === "/gallery-management" ||
      location.pathname === "/cafe-management" ||
      location.pathname === "/booking-management" ||
      location.pathname === "/about-management" ||
      location.pathname === "/contact-messages"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location.pathname]);
  return (
    <>
      {isAdmin && localStorage.getItem("role") === "admin" ? (
        <AdminNavbar />
      ) : (
        <Navbar />
      )}
      {localStorage.getItem("role") === "admin" ? (
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
          <Route path="/admin-login" element={localStorage.getItem("role") === "admin" ? <AdminDashboard />: <AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/access-history" element={<AccessHistory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/room-availability" element={<RoomAvailability />} />
          <Route path="/edit-room-schedule" element={<EditRoomSchedule />} />
          <Route
            path="/admin-gallery-management"
            element={<AdminGalleryManagement />}
          />
          <Route path="/admin-about-settings" element={<AdminAbout />} />
          <Route path="/cafe-management" element={<CafeManagement />} />
          <Route path="/booking-management" element={<BookingManagement />} />
          <Route
            path="/contact-messages"
            element={<ContactMessagesManagement />}
          />
        </Routes>
      ) : (
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
          <Route path="/admin-login" element={localStorage.getItem("role") === "admin" ? <AdminDashboard />: <AdminLogin />} />
        </Routes>
      )}
      {showLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router> 
      <UserImageContext.Provider value={null}>
      <AppContent />
      </UserImageContext.Provider>
    </Router>
  );
}

export default App;
