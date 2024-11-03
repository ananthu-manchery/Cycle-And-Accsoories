
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './product.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FaHeart } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { userId } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sortOption, setSortOption] = useState('name');

  const navigate = useNavigate(); // Initialize navigate for redirection


  useEffect(() => {
    fetchProducts();
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const cycleProducts = response.data.filter(product => product.category === 'Cycle');

      setProducts(sortProducts(cycleProducts, sortOption));
    } catch (error) {
      setError('Error fetching products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

    // Sort function
    const sortProducts = (products, option) => {
      switch (option) {
        case 'price-asc':
          return products.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return products.sort((a, b) => b.price - a.price);
        case 'name':
          return products.sort((a, b) => a.name.localeCompare(b.name));
        default:
          return products;
      }
    };
  
    // Handle sorting change
    const handleSortChange = (option) => {
      setSortOption(option);
      setProducts(sortProducts([...products], option)); // Sort current products
    };



  const handleAddToWishlist = async (productId) => {
    if (!userId) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/wishlist/add', { userId, productId });
      console.log('Wishlist response:', response.data); // Log the server response
      setWishlistItems([...wishlistItems, { productId }]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setError('Error adding product to wishlist. Please try again later.');
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  // cart
  const handleAddToCart = async (productId) => {
    if (!userId) {
      navigate('/signin');
      return;
    }

    if (!productId) {
      console.error('Product ID is not available');
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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul className="product-list-container">
        {products.map((product) => (
          <li className="product-list-item" key={product._id}>
            <Card
              style={{
                width: '18rem',
                height: '24rem',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              className="product-card"
            >
              <Link to={`/products/${product._id}`}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${product.image}`}
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
                  {isProductInWishlist(product._id) ? (
                    <FaHeart color="red" size={24} onClick={() => handleAddToWishlist(product._id)} />
                  ) : (
                    <FaHeart color="grey" size={24} onClick={() => handleAddToWishlist(product._id)} />
                  )}
                </div>
                <Card.Title className="product-title">{product.name}</Card.Title>
                <Card.Text className="product-category">{product.category}</Card.Text>
                <Card.Text className="product-price">
                  <span>&#8377;</span>{product.price}
                </Card.Text>

                {product.quantity === 0 ? (
                  <p className="out-of-stock">Out of Stock</p> // Show "Out of Stock" if quantity is 0
                ) : isProductInCart(product._id) ? (
                  <Button
                    className="addtocart-btn"
                    onClick={() => window.location.href = '/cart'} // Redirect to cart page
                  >
                    View Cart
                  </Button>
                ) : (
                  <Button
                    className="addtocart-btn"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
      <div className="sort-container">
    <Dropdown className="sort-dropdown">
      <Dropdown.Toggle variant="secondary">Sort by</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSortChange('name')}>Name</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('price-asc')}>Price: Low to High</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('price-desc')}>Price: High to Low</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>

    </div>
  );
}
