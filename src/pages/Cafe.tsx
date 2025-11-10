import CafeCard from '../components/CafeCard';
import img from '../assets/images/cafe/drinks/img1.png';

const data = {
  drinks: [
    {
      title: 'Classic Latte',
      description: 'Rich espresso, steamed milk, and a thin layer of foam.',
      price: '$4.50',
    },
    {
      title: 'Americano',
      description:
        'Espresso shots topped with hot water, creating a light layer of crema.',
      price: '$3.50',
    },
    {
      title: 'Cappuccino',
      description:
        'Espresso with a perfect balance of steamed milk and foamed milk.',
      price: '$4.75',
    },
    {
      title: 'Matcha Latte',
      description:
        'Premium ceremonial grade matcha with steamed milk, served hot or iced.',
      price: '$5.25',
    },
    {
      title: 'Iced Coffee',
      description:
        'Brewed coffee served over ice, customizable with milk and syrup.',
      price: '$3.75',
    },
    {
      title: 'Herbal Tea Selection',
      description: 'A soothing selection of herbal teas, caffeine-free.',
      price: '$3.00',
    },
  ],
  food: [
    {
      title: 'Butter Croissant',
      description: 'Classic flaky pastry, perfect for breakfast.',
      price: '$4.50',
    },
    {
      title: 'Blueberry Muffin',
      description: 'Soft and moist muffin loaded with fresh blueberries.',
      price: '$3.50',
    },
    {
      title: 'Avocado Toast',
      description:
        'Toasted sourdough with mashed avocado, chili flakes, and sprouts..',
      price: '$4.75',
    },
    {
      title: 'Greek Yogurt Parfait',
      description:
        'Creamy Greek yogurt with granola, mixed berries, and a drizzle of honey.',
      price: '$5.25',
    },
    {
      title: 'Chicken Caesar Wrap',
      description:
        'Grilled chicken, romaine lettuce, parmesan, and Caesar dressing in a soft tortilla.',
      price: '$3.75',
    },
    {
      title: 'Veggie Delight Sandwich',
      description:
        'A medley of fresh vegetables, hummus, and provolone cheese on whole wheat bread.',
      price: '$3.00',
    },
  ],
};

function Cafe() {
  return (
    <div className="container pt-5">
      <h1 className="fw-bolder mb-4">Our Cafe Menu</h1>
      <h2 className="fw-semibold pb-2 sub-title">Drinks</h2>
      <div className="row g-4">
        {data.drinks.map((drink, index) => (
          <CafeCard {...drink} key={index} img={img} />
        ))}
      </div>
      <h2 className="fw-semibold pb-2 sub-title mt-5">Food</h2>
      <div className="row g-4">
        {data.food.map((foodItem, index) => (
          <CafeCard {...foodItem} key={index} img={img} />
        ))}
      </div>
    </div>
  );
}

export default Cafe;
