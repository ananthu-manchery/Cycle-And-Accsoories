import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './orderstatus.css'; 
import { useAuth } from '../components/AuthContext'; 
export default function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const { userId } = useAuth(); 
  const [loading, setLoading] = useState(false); // Add loading state for cancellation requests
 

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/orders?userId=${userId}`);
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders", error);
        }
      }
    };
  
    fetchOrders();
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    setLoading(true);  
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`);
      if (response.status === 200) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        ));
      }
    } catch (error) {
      console.error("Error canceling order", error);
    }finally {
      setLoading(false); 
    }
  };

 
  const handleRemoveCancelledOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      if (response.status === 200) {
        setOrders(orders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error("Error removing cancelled order", error);
    }
  };

  return (
    <div className="order-status-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <div className="order-cards">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p><strong>Customer Name:</strong> {order.shippingAddress.name || 'N/A'}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
              <div className="order-items">
                <h4>Order Items:</h4>
                <ul>
                  {order.orderItems.map(item => (
                    <li key={item.name}>
                      <Link to={`/products/${item.productId}`}>
                        {item.productId} - Qty: {item.quantity} - Price: ₹{item.price.toFixed(2)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
              {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                  <button onClick={() => handleCancelOrder(order._id)} disabled={loading}>
                    {loading ? 'Cancelling...' : 'Cancel the order'}
                  </button>
                )}

                {order.status === 'Cancelled' && (
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveCancelledOrder(order._id)}
                  >
                     Remove
                  </button>
                )} 
              </div> 
              </div>
          ))}
        </div>
      )}
    </div>
  );
}
