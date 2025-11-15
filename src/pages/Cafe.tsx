import CafeCard from '../components/CafeCard';

const data = {
  drinks: [
    {
      title: 'Classic Latte',
      description: 'Rich espresso, steamed milk, and a thin layer of foam.',
      img: '/images/cafe/drinks/img1.png',
      price: '$4.50',
    },
    {
      title: 'Americano',
      description:
        'Espresso shots topped with hot water, creating a light layer of crema.',
      img: '/images/cafe/drinks/img2.png',
      price: '$3.50',
    },
    {
      title: 'Cappuccino',
      description:
        'Espresso with a perfect balance of steamed milk and foamed milk.',
      img: '/images/cafe/drinks/img3.png',
      price: '$4.75',
    },
    {
      title: 'Matcha Latte',
      description:
        'Premium ceremonial grade matcha with steamed milk, served hot or iced.',
      img: '/images/cafe/drinks/img4.png',
      price: '$5.25',
    },
    {
      title: 'Iced Coffee',
      description:
        'Brewed coffee served over ice, customizable with milk and syrup.',
      img: '/images/cafe/drinks/img5.png',
      price: '$3.75',
    },
    {
      title: 'Herbal Tea Selection',
      description: 'A soothing selection of herbal teas, caffeine-free.',
      img: '/images/cafe/drinks/img6.png',
      price: '$3.00',
    },
  ],
  food: [
    {
      title: 'Butter Croissant',
      description: 'Classic flaky pastry, perfect for breakfast.',
      img: '/images/cafe/food/img1.png',
      price: '$4.50',
    },
    {
      title: 'Blueberry Muffin',
      description: 'Soft and moist muffin loaded with fresh blueberries.',
      img: '/images/cafe/food/img2.png',
      price: '$3.50',
    },
    {
      title: 'Avocado Toast',
      description:
        'Toasted sourdough with mashed avocado, chili flakes, and sprouts..',
      img: '/images/cafe/food/img3.png',
      price: '$4.75',
    },
    {
      title: 'Greek Yogurt Parfait',
      description:
        'Creamy Greek yogurt with granola, mixed berries, and a drizzle of honey.',
      img: '/images/cafe/food/img4.png',
      price: '$5.25',
    },
    {
      title: 'Chicken Caesar Wrap',
      description:
        'Grilled chicken, romaine lettuce, parmesan, and Caesar dressing in a soft tortilla.',
      img: '/images/cafe/food/img5.png',
      price: '$3.75',
    },
    {
      title: 'Veggie Delight Sandwich',
      description:
        'A medley of fresh vegetables, hummus, and provolone cheese on whole wheat bread.',
      img: '/images/cafe/food/img6.png',
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
          <CafeCard {...drink} key={index} />
        ))}
      </div>
      <h2 className="fw-semibold pb-2 sub-title mt-5">Food</h2>
      <div className="row g-4">
        {data.food.map((foodItem, index) => (
          <CafeCard {...foodItem} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Cafe;
