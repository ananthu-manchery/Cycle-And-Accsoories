// // src/components/SearchResults.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import './product.css';
// import { Link,useNavigate } from 'react-router-dom';
// import { useAuth } from '../components/AuthContext';
// import { FaHeart } from 'react-icons/fa';

// export default function SearchResults() {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { userId } = useAuth();
//     const [wishlistItems, setWishlistItems] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate=useNavigate()

    
//     // Get the search query from the location state
//     const location = useLocation();
//     const query = new URLSearchParams(location.search).get('query');

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             if (query) {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
//                     setResults(response.data); // Adjust according to your response structure
//                 } catch (error) {
//                     console.error('Error fetching search results:', error);
//                 }
//             }
//         };

//         fetchSearchResults();
//     }, [query]);


//     const handleAddToWishlist = async (productId) => {
//       if (!userId) {
//         navigate('/signin');
//         return;
//       }
  
//       try {
//         const response = await axios.post('http://localhost:5000/api/wishlist/add', { userId, productId });
//         console.log('Wishlist response:', response.data); // Log the server response
//         setWishlistItems([...wishlistItems, { productId }]);
//       } catch (error) {
//         console.error('Error adding to wishlist:', error);
//         setError('Error adding product to wishlist. Please try again later.');
//       }
//     };
  
//     const isProductInWishlist = (productId) => {
//       return wishlistItems.some((item) => item.productId === productId);
//     };
  
//     // cart
//     const handleAddToCart = async (productId) => {
//       if (!userId) {
//         navigate('/signin');
//         return;
//       }
  
//       if (!productId) {
//         console.error('Product ID is not available');
//         return;
//       }
  
//       try {
//         await axios.post('http://localhost:5000/api/cart/add', { userId, productId });
//         setCartItems([...cartItems, { productId }]);
//         window.location.reload(); 
//       } catch (error) {
//         setError('Error adding product to cart. Please try again later.');
//       }
//     };
  
//     const isProductInCart = (productId) => {
//       return cartItems.some((item) => item.productId === productId);
//     };
  
//     return (
   

//     <div>
//     <ul className="product-list-container">
//       {results.map((result, index) => (
//         <li className="product-list-item" key={result._id}>
//           <Card
//             style={{
//               width: '18rem',
//               height: '24rem',
//               transition: 'transform 0.3s, box-shadow 0.3s',
//             }}
//             className="product-card"
//           >
//             <Link to={`/products/${result._id}`}>
//               <Card.Img
//                 variant="top"
//                 src={`http://localhost:5000/${result.image}`}
//                 className="product-image"
//                 style={{
//                   width: '100%',
//                   height: '12rem',
//                   objectFit: 'cover',
//                   transition: 'filter 0.3s',
//                 }}
//               />
//             </Link>
//             <Card.Body>
//             <div className="wishlist-icon-container">
//     {isProductInWishlist(results._id) ? (
//       <FaHeart color="red" size={24} onClick={() => handleAddToWishlist(results._id)} />
//     ) : (
//       <FaHeart color="grey" size={24} onClick={() => handleAddToWishlist(results._id)} />
//     )}
//   </div>
//               <Card.Title className="product-title">{result.name}</Card.Title>
//               <Card.Text className="product-category">{result.category}</Card.Text>
//               <Card.Text className="product-price">
//                 <span>&#8377;</span>{result.price}
//               </Card.Text>
//               {isProductInCart(results._id) ? (
//                 <Button
//                   className="addtocart-btn"
//                   onClick={() => window.location.href = '/cart'}
//                 >
//                   View Cart
//                 </Button>
//               ) : (
//                 <Button
//                   className="addtocart-btn"
//                   onClick={() => handleAddToCart(results._id)}
//                 >
//                   Add to Cart
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>
//         </li>
//       ))}
//     </ul>
//   </div>
//     );
// }



import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './product.css';
import { useAuth } from '../components/AuthContext';
import { FaHeart } from 'react-icons/fa';

export default function SearchResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            }
        };

        fetchSearchResults();
    }, [query]);

    const handleAddToWishlist = async (productId) => {
        if (!userId) {
            navigate('/signin');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/wishlist/add', { userId, productId });
            console.log('Wishlist response:', response.data);
            setWishlistItems([...wishlistItems, { productId }]);
        } catch (error) {
            console.error('Error adding to wishlist:', error);
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

    return (
        <div>
            <ul className="product-list-container">
                {results.map((result) => (
                    <li className="product-list-item" key={result._id}>
                        <Card
                            style={{
                                width: '18rem',
                                height: '24rem',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                            }}
                            className="product-card"
                        >
                            <Link to={`/products/${result._id}`}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:5000/${result.image}`}
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
                                    {isProductInWishlist(result._id) ? (
                                        <FaHeart color="red" size={24} onClick={() => handleAddToWishlist(result._id)} />
                                    ) : (
                                        <FaHeart color="grey" size={24} onClick={() => handleAddToWishlist(result._id)} />
                                    )}
                                </div>
                                <Card.Title className="product-title">{result.name}</Card.Title>
                                <Card.Text className="product-category">{result.category}</Card.Text>
                                <Card.Text className="product-price">
                                    <span>&#8377;</span>{result.price}
                                </Card.Text>
                                {isProductInCart(result._id) ? (
                                    <Button
                                        className="addtocart-btn"
                                        onClick={() => window.location.href = '/cart'}
                                    >
                                        View Cart
                                    </Button>
                                ) : (
                                    <Button
                                        className="addtocart-btn"
                                        onClick={() => handleAddToCart(result._id)}
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
    );
}
