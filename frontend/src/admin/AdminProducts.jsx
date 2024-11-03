import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the modal component
import './AdminProducts.css';

const AdminProducts = ( ) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Modal state
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: '',
    price: '',
    quantity: '',
    image: null // This will store the selected image file
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
     
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };


  const handleEditClick = (product) => {
    setEditingProductId(product._id);  // Set the product being edited
    setEditProductData({ 
      name: product.name, 
      price: product.price, 
      quantity: product.quantity,
      image: product.image // Store the current image for display
    });
    setEditModalOpen(true);  // Open the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setEditProductData(prevData => ({ ...prevData, image: e.target.files[0] })); // Update the image file
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editProductData.name);
      formData.append('price', editProductData.price);
      formData.append('quantity', editProductData.quantity);
      
      if (editProductData.image && editProductData.image instanceof File) {
        formData.append('image', editProductData.image);
      }

      await axios.put(`http://localhost:5000/api/products/${editingProductId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === editingProductId ? { ...product, ...editProductData } : product
        )
      );
      setEditModalOpen(false);  // Close the modal
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  return (
    <div>
      <h1>Manage Products</h1>

      {loading && <p>Loading products...</p>}

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product._id}>
                <td>
                  <img 
                    src={`http://localhost:5000/${product.image}`}    
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                    alt={product.name}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for editing product */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h2>Edit Product</h2>
        <input
          type="text"
          name="name"
          value={editProductData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <input
          type="number"
          name="price"
          value={editProductData.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="quantity"
          value={editProductData.quantity} // Display the current quantity
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {editProductData.image && typeof editProductData.image === 'string' && (
          <img 
            src={`http://localhost:5000/${editProductData.image}`} 
            alt="Current Product" 
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        )}
        <button onClick={handleEditSubmit}>Save</button>
      </Modal>
    </div>
  );
};

export default AdminProducts;
