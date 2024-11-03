


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './product.css';
import { useParams, Link } from 'react-router-dom';

import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FaHeart } from 'react-icons/fa';

export default function ProductDetails() {
  const { productId } = useParams(); // Get productId from the URL
  const [product, setProduct] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchProductDetails();
    fetchAccessories();
    window.scrollTo(0, 0);
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchAccessories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setAccessories(response.data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleAddToWishlist = async (productId) => {
    if (!userId) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/wishlist/add', { userId, productId });
      setWishlistItems([...wishlistItems, { productId }]);
    } catch (error) {
      setError('Error adding product to wishlist. Please try again later.');
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  const handleAddToCart = async (productId) => {
    if (!userId) {
      navigate('/signin');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', { userId, productId });
      setCartItems([...cartItems, { productId }]);
      window.location.reload();
    } catch (error) {
      setError('Error adding product to cart. Please try again later.');
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.productId === productId);
  };

 
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details-container">
      <div className="product-image-card">
        <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price"><span>&#8377;</span>{product.price}</p>
        {product.quantity === 0 ? (
          <p className="out-of-stock">Out of Stock</p>
        ) : isProductInCart(productId) ? (
          <Button
            className="addtocart-btn"
            onClick={() => navigate('/cart')}
          >
            View Cart
          </Button>
        ) : (
          <Button
            className="addtocart-btn"
            onClick={() => handleAddToCart(productId)}
          >
            Add to Cart
          </Button>
        )}
      </div>
      
      <h3>Suggested Products</h3>
      <div>
        <h2> Products</h2>
        <ul className="product-list-container">
          {accessories.map((accessory) => (
            <li className="product-list-item" key={accessory._id}>
              <Card
                style={{
                  width: '18rem',
                  height: '24rem',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                className="product-card"
              >
                <Link to={`/products/${accessory._id}`}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${accessory.image}`}
                    className="product-image"
                    style={{
                      width: '100%',
                      height: '12rem',
                      objectFit: 'cover',
                      transition: 'filter 0.3s',
                    }}
                  />
                </Link>
                <Card.Body>
                  <div className="wishlist-icon-container">
                    {isProductInWishlist(accessory._id) ? (
                      <FaHeart color="red" size={24} onClick={() => handleAddToWishlist(accessory._id)} />
                    ) : (
                      <FaHeart color="grey" size={24} onClick={() => handleAddToWishlist(accessory._id)} />
                    )}
                  </div>
                  <Card.Title className="product-title">{accessory.name}</Card.Title>
                  <Card.Text className="product-category">{accessory.category}</Card.Text>
                  <Card.Text className="product-price">
                    <span>&#8377;</span>{accessory.price}
                  </Card.Text>

                  {accessory.quantity === 0 ? (
                    <p className="out-of-stock">Out of Stock</p>
                  ) : isProductInCart(accessory._id) ? (
                    <Button
                      className="addtocart-btn"
                      onClick={() => window.location.href = '/cart'}
                    >
                      View Cart
                    </Button>
                  ) : (
                    <Button
                      className="addtocart-btn"
                      onClick={() => handleAddToCart(accessory._id)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}