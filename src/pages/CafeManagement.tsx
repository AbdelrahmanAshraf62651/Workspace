import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faPenToSquare,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
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

const initialNewItem: CafeItem = {
  id: 0,
  name: '',
  image: '',
  category: '',
  description: '',
  price: '',
  in_stock: true,
};

function CafeManagement() {
  const [initialCafeItems, setInitialCafeItems] = useState<CafeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setBase64Image] = useState<string | null>(null);
  const [category, setCategory] = useState('');

  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [formData, setFormData] = useState<CafeItem>(initialNewItem);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item'
        );
        setInitialCafeItems(response.data);
      } catch (error) {
        console.error('Error fetching cafe items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems =
    category === ''
      ? initialCafeItems
      : initialCafeItems.filter((item) => item.category === category);

  const handleOpenAdd = () => {
    setFormData(initialNewItem);
    setFormMode('add');
  };

  const handleOpenEdit = (item: CafeItem) => {
    setFormData(item);
    setFormMode('edit');
  };

  const handleCloseForm = () => {
    setFormMode(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleCloseForm();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => {
    const value =
      field === 'in_stock' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    try {
      if (formMode === 'add') {
        const response = await axios.post(
          'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item',
          formData
        );
        setInitialCafeItems([...initialCafeItems, response.data]);
        console.log('Item added:', response.data);
      } else if (formMode === 'edit') {
        const response = await axios.patch(
          `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item/${formData.id}`,
          formData
        );
        setInitialCafeItems(
          initialCafeItems.map((item) =>
            item.id === formData.id ? response.data : item
          )
        );
        console.log('Item updated:', response.data);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStockChange = async (item: CafeItem) => {
    const newStockStatus = !item.in_stock;
    try {
      const response = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item/${item.id}`,
        { in_stock: newStockStatus }
      );
      setInitialCafeItems(
        initialCafeItems.map((cafeItem) =>
          cafeItem.id === item.id
            ? { ...cafeItem, in_stock: newStockStatus }
            : cafeItem
        )
      );
      console.log('Stock status updated:', response.data);
    } catch (error) {
      console.error('Error updating stock status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item/${id}`
      );
      setInitialCafeItems(initialCafeItems.filter((item) => item.id !== id));
      console.log(`Item with ID ${id} deleted.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const isFormOpen = formMode !== null;
  const isAddMode = formMode === 'add';

  return (
    <main className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="fw-bold">Cafe Management</h1>
          <p className="text-muted">
            Manage your cafe items, stock, and categories easily.
          </p>
        </div>
        <button className="btn sec-btn" onClick={handleOpenAdd}>
          Add Item
        </button>

        {isFormOpen && (
          <div
            className="position-fixed bottom-0 end-0 top-0 start-0 bg-black bg-opacity-75 p-3 rounded-bottom d-flex flex-column justify-content-center align-items-center"
            style={{ height: '100vh', zIndex: 1050 }}
            onClick={handleBackdropClick}
          >
            <div
              ref={formRef}
              className="d-flex flex-column p-5 bg-light gap-2 z-3"
              style={{ width: '50vw', minWidth: '300px' }}
            >
              <h4 className="fw-bold">
                {isAddMode ? 'Add New Item' : 'Edit Item'}
              </h4>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'name')}
                disabled={isSubmitting}
              />
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => handleInputChange(e, 'category')}
                disabled={isSubmitting}
              >
                <option value="">Select Category</option>
                <option value="Drinks">Drinks</option>
                <option value="Food">Food</option>
              </select>
              <textarea
                placeholder="Description"
                className="form-control"
                value={formData.description}
                onChange={(e) => handleInputChange(e, 'description')}
                disabled={isSubmitting}
              />
              <div className="">
                <input
                  type="checkbox"
                  className="form-check-input border-2"
                  id="in_stock"
                  checked={formData.in_stock}
                  onChange={(e) => handleInputChange(e, 'in_stock')}
                  disabled={isSubmitting}
                />
                <label className="form-check-label ms-2" htmlFor="in_stock">
                  In Stock
                </label>
              </div>
              <input
                type="text"
                placeholder="Price"
                className="form-control"
                value={formData.price}
                onChange={(e) => handleInputChange(e, 'price')}
                disabled={isSubmitting}
              />
              <input
                type="file"
                name="Image"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isSubmitting}
              />
              <div className="d-flex justify-content-end gap-2">
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-dark"
                    onClick={handleSubmitForm}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {isAddMode ? 'Adding...' : 'Saving...'}
                      </>
                    ) : (
                      <>{isAddMode ? 'Add Item' : 'Save Changes'}</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container">
        <div className="row g-4">
          <aside className="col-12 col-lg-2  rounded">
            <h5 className="fw-bold py-4 text-center">Categories</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 justify-content-center text-center">
              <li
                className={`px-3 py-2 d-block btn main-btn ${
                  category === '' ? 'active-category' : ''
                }`}
                onClick={() => setCategory('')}
              >
                All
              </li>
              <li
                className={`px-3 py-2 d-block btn btn-light ${
                  category === 'Drinks' ? 'active-category' : ''
                }`}
                onClick={() => setCategory('Drinks')}
              >
                Drinks
              </li>
              <li
                className={`px-3 py-2 d-block btn btn-light ${
                  category === 'Food' ? 'active-category' : ''
                }`}
                onClick={() => setCategory('Food')}
              >
                Food
              </li>
            </ul>
          </aside>
          <div className="col-12 col-lg-10">
            <h5 className="fw-bold py-4">Menu Items</h5>

            <div className="table-responsive rounded shadow-sm">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center">Name</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Availability</th>
                    <th className="text-center" style={{ width: '150px' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="text-center py-5">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="align-middle">
                        <td className="text-center">
                          <strong>{item.name}</strong>
                        </td>
                        <td className="text-center">
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
                        <td className="text-center">
                          <strong>{item.category}</strong>
                        </td>
                        <td className="text-center">
                          <strong>{item.description}</strong>
                        </td>
                        <td className="text-center">
                          <strong>{item.price} EGP</strong>
                        </td>
                        <td className="text-center">
                          <div className="form-check form-switch d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheckChecked-${item.id}`}
                              checked={item.in_stock}
                              onChange={() => handleStockChange(item)}
                              disabled={isFormOpen}
                            />
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-outline-primary"
                              title="Edit"
                              onClick={() => handleOpenEdit(item)}
                              type="button"
                              disabled={isFormOpen}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              disabled={isFormOpen}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-5">
                        <div className="text-muted">
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="me-2"
                            size="3x"
                          />
                          <div className="mt-3">No Cafe Items Available</div>
                        </div>
                      </td>
                    </tr>
                  )}
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
