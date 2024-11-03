//cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cart.css'; // Optional for custom styling
import { useAuth } from '../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    } else {
      fetchCartItems();
    }
  }, [userId, navigate]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      console.log('Cart fetch response:', response.data);
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Cart Not Found");
      } else {
        console.error('Error fetching cart items:', error);
        setError('Error fetching cart items. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${userId}/update/${productId}`, {
        quantity: newQuantity,
      });
      console.log('Cart updated:', response.data);
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart quantity:', error.response ? error.response.data : error.message);
    }
  };
  

  const removeCartItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/remove/${productId}`);
      setCartItems(cartItems.filter(item => item.productId._id !== productId));
      window.location.reload();
    } catch (error) {
      setError('Error removing item from cart. Please try again later.');
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.productId && item.productId.price) {
        return total + item.productId.price * item.quantity;
      }
      return total; 
    }, 0);
  };
  const handleBuyNow = () => {
    const totalPrice = calculateTotalPrice();
        navigate('/checkout', { state: { cartItems, totalPrice } });
  };


  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img
              src={require('../images/emptycart.png')}
              alt="Empty Cart"
              className="empty-cart-image"
            />
            <h3>Your cart is empty!</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Button as={Link} to="/products" variant="primary">
              Browse Products
            </Button>
            <p>Check out our latest products and offers!</p>
          </div>
        ) : (
          <div className='cart-no'>
          <>
            {cartItems.map((item) => (
              item.productId && (
                <Card key={item.productId._id} className="cart-item-card" style={{ marginBottom: '1rem' }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${item.productId.image}`}
                    className="cart-item-image"
                    style={{
                      width: '100%',
                      height: '12rem',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{item.productId.name}</Card.Title>
                    <Card.Text>Category: {item.productId.category}</Card.Text>
                    <Card.Text>Price: <span>&#8377;</span>{item.productId.price}</Card.Text>
                    <Card.Text>
                      Quantity: 
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                        style={{ width: '60px', marginLeft: '10px' }}
                      />
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeCartItem(item.productId._id)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              )
            ))}
          
           
          </>
          <div className="total-price-section">
              <h3>Total Price: ₹<span>&#8377;</span>{calculateTotalPrice()}</h3>
            

            <div className="buy-now-section" >
              <Button 
                variant="success" 
                onClick={handleBuyNow} 
                style={{ marginTop: '20px' }}
              >
                Buy Now
              </Button>
              </div>
            </div>
     
          </div>
          
          
          
        )}
      </div>
    
      
      
    </div>
  );
}
