import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'react-bootstrap';
import {
  faTrashCan,
  faPenToSquare,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { CafeItem } from '../types';

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
  const [cafeItems, setCafeItems] = useState<CafeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [formData, setFormData] = useState<CafeItem>(initialNewItem);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');
  // const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item'
        );
        setCafeItems(response.data);
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
      ? cafeItems
      : cafeItems.filter((item) => item.category === category);

  const handleOpenAdd = () => {
    setFormData(initialNewItem);
    setFormMode('add');
  };

  const handleOpenEdit = (item: CafeItem) => {
    setFormData(item);
    setFormMode('edit');
  };

  const handleCloseForm = () => setFormMode(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => {
    const value =
      field === 'in_stock' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : field === 'price'
        ? Number(e.target.value)
        : e.target.value;

    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      in_stock: Boolean(formData.in_stock),
    };

    try {
      if (formMode === 'add') {
        const response = await axios.post(
          'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item',
          payload
        );
        setCafeItems([...cafeItems, response.data]);
      } else if (formMode === 'edit') {
        const response = await axios.patch(
          `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item/${formData.id}`,
          payload
        );
        setCafeItems(
          cafeItems.map((item) =>
            item.id === formData.id ? response.data : item
          )
        );
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
      setCafeItems(
        cafeItems.map((cafeItem) =>
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
      setCafeItems(cafeItems.filter((item) => item.id !== id));
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
      </div>

      <Modal show={isFormOpen} onHide={handleCloseForm} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {isAddMode ? 'Add New Item' : 'Edit Item'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            id="cafe-form"
            className="d-flex flex-column gap-3"
            onSubmit={handleSubmitForm}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => handleInputChange(e, 'category')}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Short item description..."
                value={formData.description}
                onChange={(e) => handleInputChange(e, 'description')}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Stock Status</label>
                <select
                  className="form-select"
                  value={formData.in_stock ? 'in' : 'out'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      in_stock: e.target.value === 'in',
                    })
                  }
                  disabled={isSubmitting}
                >
                  <option value="in">In Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Price (EGP)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) => handleInputChange(e, 'price')}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold">Upload Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isSubmitting}
              />
              {formData.image && (
                <div className="mt-2">
                  <small className="text-muted">Current Image:</small>
                  <br />
                  <img
                    src={formData.image}
                    alt="Item"
                    className="rounded border mt-1"
                    style={{
                      maxWidth: '120px',
                      maxHeight: '120px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseForm}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            variant="dark"
            type="submit"
            form="cafe-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : isAddMode ? (
              'Add Item'
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

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
                        <td className="text-center">{item.name}</td>
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
                        <td className="text-center">{item.category}</td>
                        <td className="text-center">{item.description}</td>
                        <td className="text-center">{item.price} EGP</td>
                        <td className="text-center">
                          <div className="form-check form-switch d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
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
                              disabled={isFormOpen}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              title="Delete"
                              onClick={() => handleDelete(item.id)}
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
