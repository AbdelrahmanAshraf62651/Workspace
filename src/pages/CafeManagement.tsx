import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const initialCafeItems = [
  {
    name: 'Espresso',
    category: 'Drinks',
    description: 'Rich espresso, steamed milk, and a thin layer of foam.',
    price: '$4.50',
    inStock: true,
  },
  {
    name: 'Cappuccino',
    category: 'Drinks',
    description:
      'A classic coffee drink with equal parts espresso, steamed milk, and foam.',
    price: '$5.00',
    inStock: true,
  },
  {
    name: 'Croissant',
    category: 'Food',
    description: 'A buttery, flaky, and delicious pastry.',
    price: '$3.50',
    inStock: false,
  },
  {
    name: 'Avocado Toast',
    category: 'Food',
    description:
      'Toasted sourdough bread with fresh avocado, salt, and pepper.',
    price: '$8.00',
    inStock: true,
  },
  {
    name: 'Iced Latte',
    category: 'Drinks',
    description: 'Chilled espresso with milk over ice.',
    price: '$5.50',
    inStock: true,
  },
  {
    name: 'Chocolate Cake',
    category: 'Food',
    description: 'A rich and decadent chocolate cake.',
    price: '$6.00',
    inStock: true,
  },
];

function CafeManagement() {
  const [category, setCategory] = useState('');
  const [addItems, setAddItems] = useState(false);
  const [cafeItems, setCafeItems] = useState(initialCafeItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    inStock: false,
  });

  if (addItems) {
    console.log('worked');
  }
  const handleAddItem = () => {
    setAddItems(!addItems);
  };

  const handleStockChange = (index: number) => {
    const updatedItems = [...cafeItems];
    updatedItems[index].inStock = !updatedItems[index].inStock;
    setCafeItems(updatedItems);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditFormData(cafeItems[index]);
  };

  const handleCloseEdit = () => {
    setEditingIndex(null);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...cafeItems];
      updatedItems[editingIndex] = editFormData;
      setCafeItems(updatedItems);
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedItems = cafeItems.filter((_, i) => i !== index);
    setCafeItems(updatedItems);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value =
      field === 'inStock' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : e.target.value;
    setEditFormData({ ...editFormData, [field]: value });
  };

  const filteredItems =
    category === ''
      ? cafeItems
      : cafeItems.filter((item) => item.category === category);

  return (
    <main className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="fw-bold">Cafe Management</h1>
          <p className="text-muted">
            Manage your cafe items, stock, and categories easily.
          </p>
        </div>
        <button className="btn sec-btn" onClick={handleAddItem}>
          Add Item
        </button>
        {addItems && (
          <div
            className="position-fixed bottom-0 end-0 top-0 start-0 bg-black bg-opacity-75 p-3 rounded-bottom d-flex flex-column justify-content-center align-items-center "
            style={{ height: '100vh' }}
          >
            <div
              className="d-flex flex-column p-5 bg-light gap-2 z-3"
              style={{ width: '50vw', minWidth: '300px' }}
            >
              <input type="text" placeholder="Name" className="form-control" />
              <input
                type="text"
                placeholder="Category"
                className="form-control"
              />
              <input
                type="text"
                placeholder="Description"
                className="form-control"
              />
              <div className="">
                <input
                  type="checkbox"
                  className="form-check-input border-2"
                  id="inStock"
                />
                <label className="form-check-label ms-2" htmlFor="inStock">
                  In Stock
                </label>
              </div>
              <input type="text" placeholder="Price" className="form-control" />
              <input type="file" name="Image" id="image" />
              <button className="btn btn-dark" onClick={handleAddItem}>
                Add Item
              </button>
              <button className="btn btn-secondary" onClick={handleAddItem}>
                {' '}
                Cancel
              </button>
            </div>
          </div>
        )}
        {editingIndex !== null && (
          <div
            className="position-fixed bottom-0 end-0 top-0 start-0 bg-black bg-opacity-75 p-3 rounded-bottom d-flex flex-column justify-content-center align-items-center "
            style={{ height: '100vh' }}
          >
            <div
              className="d-flex flex-column p-5 bg-light gap-2 z-3"
              style={{ width: '50vw' }}
            >
              <h4 className="fw-bold">Edit Item</h4>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={editFormData.name}
                onChange={(e) => handleEditInputChange(e, 'name')}
              />
              <input
                type="text"
                placeholder="Category"
                className="form-control"
                value={editFormData.category}
                onChange={(e) => handleEditInputChange(e, 'category')}
              />
              <textarea
                placeholder="Description"
                className="form-control"
                value={editFormData.description}
                onChange={(e) => handleEditInputChange(e, 'description')}
              />
              <div className="">
                <input
                  type="checkbox"
                  className="form-check-input border-2"
                  id="editInStock"
                  checked={editFormData.inStock}
                  onChange={(e) => handleEditInputChange(e, 'inStock')}
                />
                <label className="form-check-label ms-2" htmlFor="editInStock">
                  In Stock
                </label>
              </div>
              <input
                type="text"
                placeholder="Price"
                className="form-control"
                value={editFormData.price}
                onChange={(e) => handleEditInputChange(e, 'price')}
              />
              <button className="btn btn-dark" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={handleCloseEdit}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="row g-4">
          <aside className="col-12 col-md-3 border p-3 rounded">
            <h5 className="fw-bold py-4 text-center">Categories</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 justify-content-center text-center">
              <li
                className={`px-3 py-2 d-block btn main-btn ${
                  category === '' ? 'active-category' : ''
                } `}
                onClick={() => setCategory('')}
              >
                All
              </li>
              <li
                className={`px-3 py-2 d-block btn btn-light ${
                  category === 'Drinks' ? 'active-category' : ''
                } `}
                onClick={() => setCategory('Drinks')}
              >
                Drinks
              </li>
              <li
                className={`px-3 py-2 d-block btn btn-light ${
                  category === 'Food' ? 'active-category' : ''
                } `}
                onClick={() => setCategory('Food')}
              >
                Food
              </li>
            </ul>
          </aside>
          <div className="col-12 col-md-9 border p-3 rounded">
            <h5 className="fw-bold py-4">Menu Items</h5>

            <div style={{ overflowX: 'auto' }}>
              <table
                className="table table-bordered table-striped"
                style={{ minWidth: '900px' }}
              >
                <thead className="table-light">
                  <tr className="text-center">
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={index} className="text-center align-middle">
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td className="text-wrap">{item.description}</td>
                      <td>{item.price}</td>

                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`switchCheck-${index}`}
                          checked={item.inStock}
                          onChange={() => handleStockChange(index)}
                        />
                      </td>

                      <td className="d-flex flex-row">
                        <button
                          className="btn"
                          id="edit"
                          onClick={() => handleEdit(index)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button
                          className="btn"
                          id="delete"
                          onClick={() => handleDelete(index)}
                        >
                          <FontAwesomeIcon
                            className="text-danger"
                            icon={faTrashCan}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CafeManagement;
