import { useState, useEffect } from 'react';
import axios from 'axios';
import CafeCard from '../components/CafeCard';
interface CafeItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  category: 'Drinks' | 'Food';
  in_stock: boolean;
}
function Cafe() {
  const [data, setData] = useState<CafeItem[]>([]);
  const [drinks, setDrinks] = useState<CafeItem[]>([]);
  const [food, setFood] = useState<CafeItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cafe items:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setDrinks(data.filter((item) => item.category === 'Drinks'));
    setFood(data.filter((item) => item.category === 'Food'));
  }, [data]);
  return (
    <div className="container pt-5">
      <h1 className="fw-bolder mb-4">Our Cafe Menu</h1>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '50vh' }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="fw-semibold pb-2 sub-title">Drinks</h2>
          <div className="row g-4">
            {drinks.map((drink, index) => (
              <CafeCard
                title={drink.name}
                description={drink.description}
                price={drink.price.toString()}
                image={drink.image}
                key={index}
                inStock={drink.in_stock}
              />
            ))}
          </div>
          <h2 className="fw-semibold pb-2 sub-title mt-5">Food</h2>
          <div className="row g-4">
            {food.map((foodItem, index) => (
              <CafeCard
                title={foodItem.name}
                description={foodItem.description}
                price={foodItem.price.toString()}
                image={foodItem.image}
                key={index}
                inStock={foodItem.in_stock}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Cafe;
