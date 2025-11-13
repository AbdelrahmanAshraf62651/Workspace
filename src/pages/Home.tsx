import '../styles.css';
import {
  faCalendarCheck,
  faImages,
  faMugSaucer,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';

const data = [
  {
    title: 'Seamless Booking',
    description: 'Find and reserve your perfect workspace with ease.',
    icon: faCalendarCheck,
    link: '/booking',
    btn: 'Book Now',
  },
  {
    title: 'Explore Our Spaces',
    description:
      'Discover stunning photos of our modern and versatile workspaces.',
    icon: faImages,
    link: '/gallery',
    btn: 'View Gallery',
  },
  {
    title: 'Delightful Cafe',
    description:
      'Order your favorite beverages and snacks from our in-house cafe.',
    icon: faMugSaucer,
    link: '/cafe',
    btn: 'Order Now',
  },
  {
    title: 'Your Profile',
    description: 'Manage your personal details, bookings, and preferences.',
    icon: faUser,
    link: '/profile',
    btn: 'View Profile',
  },
];
function Home() {
  return (
    <>
      <section className="landing position-relative text-center d-flex justify-content-center flex-column">
        <div className="container">
          <div className="filter position-absolute"></div>
          <h1 className="text-start position-relative mb-4">
            Step Into Your Ideal Workspace, Where Comfort Meets Productivity.
          </h1>
          <p className="text-start position-relative mb-4">
            Find flexible, inspiring environments created to elevate
            productivity, enhance creativity, and support meaningful
            collaboration.
          </p>
          <div className="buttons position-relative text-start">
            <Link to="/booking" className="btn btn-lg sec-btn me-2">
              Book Now
            </Link>
            <Link to="/gallery" className="btn btn-lg main-btn">
              Explore Spaces
            </Link>
          </div>
        </div>
      </section>
      <div className="container pt-5">
        <div className="heading">
          <h1 className="fw-bolder mb-4 text-center">Quick Access</h1>
        </div>
        <div className="row pt-3 g-4">
          {data.map((cardData, index) => (
            <HomeCard key={index} {...cardData} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
