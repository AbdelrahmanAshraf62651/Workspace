import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface CafeItem {
  id: number;
  category: string;
  name: string;
  image: string;
  description: string;
  price: string;
  in_stock: boolean;
}

function CafeManagement() {
  const [initialCafeItems, setInitialCafeItems] = useState<CafeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item')
      .then((response) => {
        setInitialCafeItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cafe items:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const [category, setCategory] = useState('');
  const [addItems, setAddItems] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    id: 0,
    name: '',
    image: '',
    category: '',
    description: '',
    price: '',
    in_stock: false,
  });
  const [addItem, setAddItem] = useState<CafeItem>({
    id: 0,
    name: '',
    image: '',
    category: '',
    description: '',
    price: '',
    in_stock: true,
  });
  // if (addItems) {
  //   console.log("worked");
  // }
  const handleAddItem = () => {
    setAddItems(!addItems);
    setAddItem({
      id: 0,
      name: '',
      image: '',
      category: '',
      description: '',
      price: '',
      in_stock: true,
    });
  };
  const handleNewItem = () => {
    axios
      .post('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item', addItem)
      .then((response) => {
        console.log('Item added:', response.data);
        setInitialCafeItems([...initialCafeItems, response.data]);
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
    handleAddItem();
  };
  const handleStockChange = (index: number) => {
    axios
      .patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item/${filteredItems[index].id}`,
        { in_stock: !filteredItems[index].in_stock }
      )
      .then((response) => {
        console.log('Stock status updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating stock status:', error);
      });
    const updatedItems = [...filteredItems];
    updatedItems[index].in_stock = !updatedItems[index].in_stock;
    setInitialCafeItems(updatedItems);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditFormData(filteredItems[index]);
  };

  const handleCloseEdit = () => {
    setEditingIndex(null);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      axios
        .patch(
          `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item/${editFormData.id}`,
          editFormData
        )
        .then((response) => {
          console.log('Item updated:', response.data);
        })
        .catch((error) => {
          console.error('Error updating item:', error);
        });
      const updatedItems = [...filteredItems];
      updatedItems[editingIndex] = editFormData;
      setEditingIndex(null);
      setInitialCafeItems(updatedItems);
    }
  };

  const handleDelete = (index: number) => {
    const updatedItems = filteredItems.filter((_, i) => i !== index);
    setInitialCafeItems(updatedItems);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => {
    const value =
      field === 'in_stock' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : e.target.value;
    setEditFormData({ ...editFormData, [field]: value });
  };

  const filteredItems =
    category === ''
      ? initialCafeItems
      : initialCafeItems.filter((item) => item.category === category);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
        setAddItem({ ...addItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
    console.log(base64Image);
  };
  // const base64ToImage = (base64String: string) => {
  //   const img = new Image();
  //   img.src = base64String;
  //   return img;
  // }
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
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={addItem.name}
                onChange={(e) =>
                  setAddItem({ ...addItem, name: e.target.value })
                }
              />
              <select
                name=""
                id=""
                className="form-select"
                value={addItem.category}
                onChange={(e) =>
                  setAddItem({ ...addItem, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Drinks">Drinks</option>
                <option value="Food">Food</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                className="form-control"
                value={addItem.description}
                onChange={(e) =>
                  setAddItem({ ...addItem, description: e.target.value })
                }
              />
              <div className="">
                <input
                  type="checkbox"
                  className="form-check-input border-2"
                  id="in_stock"
                  checked={addItem.in_stock}
                  onChange={(e) =>
                    setAddItem({ ...addItem, in_stock: e.target.checked })
                  }
                />
                <label className="form-check-label ms-2" htmlFor="in_stock">
                  In Stock
                </label>
              </div>
              <input
                type="text"
                placeholder="Price"
                className="form-control"
                value={addItem.price}
                onChange={(e) =>
                  setAddItem({ ...addItem, price: e.target.value })
                }
              />
              <input
                type="file"
                name="Image"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button className="btn btn-dark" onClick={handleNewItem}>
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
              <select
                name=""
                id=""
                className="form-select"
                value={editFormData.category}
                onChange={(e) => handleEditInputChange(e, 'category')}
              >
                <option value="">Select Category</option>
                <option value="Drinks">Drinks</option>
                <option value="Food">Food</option>
              </select>
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
                  id="editin_stock"
                  checked={editFormData.in_stock}
                  onChange={(e) => handleEditInputChange(e, 'in_stock')}
                />
                <label className="form-check-label ms-2" htmlFor="editin_stock">
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

            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '300px' }}
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table
                  className="table table-bordered table-striped"
                  style={{ minWidth: '900px' }}
                >
                  <thead className="table-light">
                    <tr className="text-center">
                      <th>Name</th>
                      <th>Image</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr
                        key={index}
                        id={`item-${item.id}`}
                        className="text-center align-middle"
                      >
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                            }}
                          />
                        </td>
                        <td>{item.category}</td>
                        <td className="text-wrap">{item.description}</td>
                        <td>{item.price}</td>

                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`switchCheck-${index}`}
                            checked={item.in_stock}
                            onChange={() => handleStockChange(index)}
                          />
                        </td>

                        <td>
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CafeManagement;
