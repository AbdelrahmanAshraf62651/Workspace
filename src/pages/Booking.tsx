import BookingCard from '../components/BookingCard';

const data = [
  {
    title: 'Single Seat',
    description: 'Dedicated space for individual focus and productivity.',
    img: '/images/booking/img1.png',
    capacity: 1,
  },
  {
    title: 'Private Room',
    description: 'Fully equipped room for team meetings and private sessions.',
    img: '/images/booking/img2.png',
    capacity: 4,
  },
];

function Booking() {
  return (
    <div className="container pt-5">
      <h1 className="fw-bolder mb-4">Book Your Workspace</h1>
      <div className="row g-4">
        {data.map((item, index) => (
          <BookingCard {...item} key={index} />
        ))}
        <div className="box col-12 col-md-6 col-lg-4">
          <div
            className="card d-flex justify-content-center align-items-center h-100 coming-soon shadow-sm"
            style={{
              backgroundColor: '#F3F4F6FF',
              fontFamily: 'Source Sans 3", sans-serif',
            }}
          >
            <div
              className="loading-icon mb-3"
              style={{
                padding: '1.1rem',
                border: 'black dashed 5px',
                opacity: '0.5',
                borderRadius: '50%',
              }}
            ></div>
            More options coming soon!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
