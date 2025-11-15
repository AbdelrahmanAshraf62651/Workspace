import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='d-flex align-items-center justify-content-center container' style={{height: "77vh"}}>
      <div>
        <h1>404 - Page Not Found</h1>
        <p className='text-secondary'>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ color: 'black', textDecoration: 'underline' }}>Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;