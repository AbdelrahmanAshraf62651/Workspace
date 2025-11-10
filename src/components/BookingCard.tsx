interface BookingCardProps {
  title: string;
  description: string;
  img: string;
  capacity: number;
}

function BookingCard({ img, title, description, capacity }: BookingCardProps) {
  return (
    <div className="box col-12 col-md-6 col-lg-4">
      <div className="card pt-3 h-100 shadow-sm">
        <div className="ps-3 pe-3">
          <img src={img} className="card-img-top" alt={title} />
        </div>
        <div className="card-body pb-1 d-flex flex-column">
          <h4 className="item-name fw-bold">{title}</h4>
          <p className="card-text text-black-50 fw-semibold">{description}</p>
          <div>
            <p className="btn main-btn rounded-pill mt-auto">
              Capacity: {capacity} people
            </p>
          </div>
          <a href="" className="btn mb-3 sec-btn">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
