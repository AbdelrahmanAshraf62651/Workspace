import { useState } from 'react';
import PayPalPaymentModal from './PayPalPaymentModal';

interface BookingCardProps {
  name: string;
  description: string;
  img: string;
  capacity: number;
  price?: number;
  currency: string;
  isAvailable?: boolean;
  duration: number;
  onBook: () => void;
  status?: string;
}

function BookingCard({
  img,
  name,
  description,
  capacity,
  price,
  currency,
  isAvailable = true,
  duration,
  onBook,
  status,
}: BookingCardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBookNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAvailable) {
      onBook();
      setShowPaymentModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentSuccess = () => {
    console.log('Payment successful, booking was already made.');
    handleCloseModal();
  };

  const isPermanentlyUnavailable =
    status && status.toLowerCase() === 'unavailable';

  return (
    <>
      <div className="box col-12 col-md-6 col-lg-4">
        <div
          className={`card pt-3 h-100 shadow-sm ${
            !isAvailable ? 'opacity-50' : ''
          }`}
        >
          <div className="ps-3 pe-3 position-relative">
            <img src={img} className="card-img-top" alt={name} />
            {/* Availability Badge */}
            <div
              className={`position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill text-white fw-semibold ${
                isAvailable ? 'bg-success' : 'bg-danger'
              }`}
              style={{ fontSize: '0.85rem' }}
            >
              {isAvailable
                ? 'Available'
                : isPermanentlyUnavailable
                ? 'Unavailable'
                : 'Booked'}
            </div>
          </div>
          <div className="card-body pb-1 d-flex flex-column">
            <h4 className="item-name fw-bold">{name}</h4>
            <p className="card-text text-black-50 fw-semibold">{description}</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="btn main-btn rounded-pill mt-auto">
                Capacity: {capacity} people
              </p>
              <p className="btn main-btn rounded-pill mt-auto">
                {(price || 0) * duration} {currency} / {duration} hour
                {duration > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={handleBookNow}
              className={`btn mb-3 mt-auto ${
                isAvailable ? 'sec-btn' : 'btn-secondary'
              }`}
              disabled={!isAvailable}
            >
              {isAvailable
                ? 'Book Now'
                : isPermanentlyUnavailable
                ? 'Unavailable'
                : 'Not Available'}
            </button>
          </div>
        </div>
      </div>

      <PayPalPaymentModal
        isOpen={showPaymentModal}
        onClose={handleCloseModal}
        name={name}
        price={price || 0}
        currency={currency}
        capacity={capacity}
        duration={duration}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}

export default BookingCard;
