import { useState } from 'react';
import PayPalPaymentModal from './PayPalPaymentModal';

interface BookingCardProps {
  title: string;
  description: string;
  img: string;
  capacity: number;
  price: number;
  currency: string;
  isAvailable?: boolean;
  selectedDate?: string;
  selectedHour?: number;
}

function BookingCard({
  img,
  title,
  description,
  capacity,
  price,
  currency,
  isAvailable = true,
  selectedDate = '',
  selectedHour = 0,
}: BookingCardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBookNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAvailable) {
      setShowPaymentModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <>
      <div className="box col-12 col-md-6 col-lg-4">
        <div
          className={`card pt-3 h-100 shadow-sm ${
            !isAvailable ? 'opacity-50' : ''
          }`}
        >
          <div className="ps-3 pe-3 position-relative">
            <img src={img} className="card-img-top" alt={title} />
            {/* Availability Badge */}
            <div
              className={`position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill text-white fw-semibold ${
                isAvailable ? 'bg-success' : 'bg-danger'
              }`}
              style={{ fontSize: '0.85rem' }}
            >
              {isAvailable ? '✓ Available' : '✗ Booked'}
            </div>
          </div>
          <div className="card-body pb-1 d-flex flex-column">
            <h4 className="item-name fw-bold">{title}</h4>
            <p className="card-text text-black-50 fw-semibold">{description}</p>
            <div>
              <p className="btn main-btn rounded-pill mt-auto">
                Capacity: {capacity} people
              </p>
              <p className="btn main-btn rounded-pill mt-auto">
                Price: {price} {currency}
              </p>
            </div>
            {/* Display selected time if provided */}
            {selectedDate && selectedHour !== undefined && (
              <p className="text-muted small mb-2">
                {new Date(selectedDate).toLocaleDateString()} | {selectedHour}
                :00
              </p>
            )}
            <button
              onClick={handleBookNow}
              className={`btn mb-3 ${
                isAvailable ? 'sec-btn' : 'btn-secondary'
              }`}
              disabled={!isAvailable}
            >
              {isAvailable ? 'Book Now' : 'Not Available'}
            </button>
          </div>
        </div>
      </div>

      <PayPalPaymentModal
        isOpen={showPaymentModal}
        onClose={handleCloseModal}
        title={title}
        price={price}
        currency={currency}
        capacity={capacity}
      />
    </>
  );
}

export default BookingCard;
