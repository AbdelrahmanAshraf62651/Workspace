import BookingTable from './BookingTable';

const data = {
  upcomingBookings: [
    {
      room: 'Meeting Room Alpha',
      date: '2024-08-15',
      time: '10:00 AM',
      status: 'Upcoming' as const,
      amount: '$50.00',
    },
    {
      room: 'Meeting Room Alpha',
      date: '2024-09-01',
      time: '11:00 AM',
      status: 'Upcoming' as const,
      amount: '$50.00',
    },
    {
      room: 'Training Room Epsilon',
      date: '2024-08-20',
      time: '04:00 PM',
      status: 'Upcoming' as const,
      amount: '$75.00',
    },
  ],
  completedBookings: [
    {
      room: 'Meeting Room Zeta',
      date: '2024-06-10',
      time: '09:00 AM',
      status: 'Completed' as const,
      amount: '$50.00',
    },
    {
      room: 'Conference Hall Delta',
      date: '2024-05-25',
      time: '01:00 PM',
      status: 'Completed' as const,
      amount: '$120.00',
    },
  ],
  canceledBookings: [
    {
      room: 'Focus Pod Gamma',
      date: '2024-07-29',
      time: '10:00 AM',
      status: 'Canceled' as const,
      amount: '$15.00',
    },
    {
      room: 'Hot Desk 7',
      date: '2024-07-15',
      time: '02:00 PM',
      status: 'Canceled' as const,
      amount: '$10.00',
    },
  ],
};

const states = ['Upcoming', 'Completed', 'Canceled'];

function BookingHistory() {
  return (
    <>
      <h2 className="mt-5 fw-bold">Booking History</h2>
      <div className="p-4 shadow-sm booking-history">
        <ul className="nav nav-tabs mb-3" id="booking-tabs" role="tablist">
          {states.map((state, index) => {
            const targetId = state.toLowerCase();
            return (
              <li className="nav-item" role="presentation" key={index}>
                <button
                  className={`nav-link text-black ${
                    index === 0 ? 'active' : ''
                  }`}
                  id={`${targetId}-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${targetId}`}
                  type="button"
                  role="tab"
                  aria-controls={targetId}
                  aria-selected={index === 0}
                >
                  {state}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="tab-content" id="booking-tabs-content">
          <div
            className="tab-pane fade show active"
            id="upcoming"
            role="tabpanel"
            aria-labelledby="upcoming-tab"
          >
            <BookingTable bookings={data.upcomingBookings} />
          </div>
          <div
            className="tab-pane fade"
            id="completed"
            role="tabpanel"
            aria-labelledby="completed-tab"
          >
            <BookingTable bookings={data.completedBookings} />
          </div>
          <div
            className="tab-pane fade"
            id="canceled"
            role="tabpanel"
            aria-labelledby="canceled-tab"
          >
            <BookingTable bookings={data.canceledBookings} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
