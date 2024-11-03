import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './adminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


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


  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/users'); // Use full URL if needed
              setUsers(response.data.users);
          } catch (error) {
              console.error("Error fetching users:", error);
              setError("Failed to load users");  // Set error message
          }
      };

      fetchUsers();
  }, []);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders'); 
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    
    fetchOrders();
  }, []);
  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>

      {/* Overview Section */}
      <div className="dashboard-overview">
        <div className="overview-card">
          <h2>Total Users</h2>
          <p>{users.length}</p> {/* Example stats */}
        </div>
        <div className="overview-card">
          <h2>Total Products</h2>
          <p>{products.length}</p> {/* Display product count */}
        </div>
        <div className="overview-card">
          <h2>Total Orders</h2>
          <p>{orders.length}</p> {/* Example stats */}
        </div>
      </div>

      {/* Management Links */}
      <div className="dashboard-links">
        <h3 className='headmanage'>Manage Users</h3>
        <Link to="/adminusers">View All Users</Link>

        <h3 className='headmanage'>Manage Products</h3>
        <Link to="/adminproducts">View All Products</Link>
        <Link to="/upload">Add New Product</Link>

        <h3 className='headmanage'>Manage Orders</h3>
        <Link to="/orderstatus">View All Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
