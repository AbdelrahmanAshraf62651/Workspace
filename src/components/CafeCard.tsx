import './CafeCard.css';

interface CafeCardProps {
  title: string;
  description: string;
  price: string;
  img: string;
}

function CafeCard({ img, title, description, price }: CafeCardProps) {
  return (
    <div className="box col-12 col-md-6 col-lg-3">
      <div className="card pt-3 h-100 shadow-sm">
        <div className="ps-3 pe-3 text-center">
          <img src={img} alt={title} className='w-100' />
        </div>
        <div className="card-body pb-1 d-flex flex-column">
          <h4 className="item-name fw-bold">{title}</h4>
          <p className="card-text text-black-50 fw-semibold">{description}</p>
          <div className="mt-auto">
            <p className="btn main-btn rounded-pill mt-auto">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeCard;
