
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../components/AuthContext'; // Assuming you have AuthContext for user authentication
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';

// export default function Wishlist() {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const { userId } = useAuth(); // Assuming userId comes from AuthContext
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 


//   useEffect(() => {
//     fetchWishlistItems();
//   }, [userId]);

//   const fetchWishlistItems = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
//       console.log('Fetched wishlist:', response.data); // Debugging log to verify response
//       setWishlistItems(response.data.wishlist || []); // Ensure response is properly handled
//     } catch (error) {
//       if(error.response && error.response.status===404){
//         alert("Wishlist is empty")
//       }     else{

//         console.error('Error fetching wishlist items:', error);
//       }
//     }
//   };
  
//   const handleAddToCart = async (productId) => {
//     if (!userId) {
//       console.error('User ID is not available');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/cart/add', { userId, productId });
//       setCartItems([...cartItems, { productId }]);
//       window.location.reload();
//     } catch (error) {
//       setError('Error adding product to cart. Please try again later.');
//     }
//   };

//   const isProductInCart = (productId) => {
//     return cartItems.some((item) => item.productId === productId);
//   };

//   const removeFromWishlist = async (productId) => {
//     try {
//       console.log('Removing product with ID:', productId); // Add this log for debugging
//       await axios.delete(`http://localhost:5000/api/wishlist/${userId}/remove/${productId}`);
//       setWishlistItems(wishlistItems.filter(item => item.productId._id !== productId));
//     } catch (error) {
//       console.error('Error removing item from wishlist:', error);
//     }
//   };
  
//   return (
//     <div cart-container >
//     {wishlistItems.length === 0 ? (
//       <div className="empty-wishlist">
//         <img
//           src={require('../images/emptywishlist.png')}
//           alt="Empty Wishlist"
//           className="empty-cart-image"
//         />
//         <h3>Your Wishlist is empty!</h3>
//         <p>Browse our amazing products and start adding items to your wishlist.</p>
//         <Button as={Link} to="/products" variant="primary">
//           Start Shopping
//         </Button>
//       </div>
//     ) : (
//       <ul className="product-list-container">
//         {wishlistItems.map((item) => (
//           <li className="product-list-item" key={item.productId._id}>
//             <Card
//               style={{
//                 width: '18rem',
//                 height: '24rem',
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//               }}
//               className="product-card"
//             >
//               <Link to={`/products/${item.productId._id}`}>
//                 <Card.Img
//                   variant="top"
//                   src={`http://localhost:5000/${item.productId.image}`}
//                   className="product-image"
//                   style={{
//                     width: '100%',
//                     height: '12rem',
//                     objectFit: 'cover',
//                     transition: 'filter 0.3s',
//                   }}
//                 />
//               </Link>
//               <Card.Body>
//                 <Card.Title className="product-title">{item.productId.name}</Card.Title>
//                 <Card.Text className="product-category">{item.productId.category}</Card.Text>
//                 <Card.Text className="product-price">
//                   <span>&#8377;</span>{item.productId.price}
//                 </Card.Text>
//                 <Button
//                   variant="danger"
//                   onClick={() => removeFromWishlist(item.productId._id)}
//                   className="remove-btn"
//                 >
//                   Remove
//                 </Button>
//               </Card.Body>
//             </Card>
//           </li>
//         ))}
//       </ul>
//     )}
//   </div>
// );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { userId } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlistItems();
  }, [userId]);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
      console.log('Fetched wishlist:', response.data);
  
      const validWishlistItems = response.data.wishlist?.filter(item => item.productId) || [];
      setWishlistItems(validWishlistItems); // Ensure it falls back to an empty array
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Wishlist is empty");
      } else {
        console.error('Error fetching wishlist items:', error);
      }
    }
  };
  const handleAddToCart = async (productId) => {
    if (!userId) {
      console.error('User ID is not available');
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

  const removeFromWishlist = async (productId) => {
    try {
      console.log('Removing product with ID:', productId);
      await axios.delete(`http://localhost:5000/api/wishlist/${userId}/remove/${productId}`);
      setWishlistItems(wishlistItems.filter(item => item.productId?._id !== productId)); // Use optional chaining
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="cart-container">
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <img
            src={require('../images/emptywishlist.png')}
            alt="Empty Wishlist"
            className="empty-cart-image"
          />
          <h3>Your Wishlist is empty!</h3>
          <p>Browse our amazing products and start adding items to your wishlist.</p>
          <Button as={Link} to="/products" variant="primary">
            Start Shopping
          </Button>
        </div>
      ) : (
        <ul className="product-list-container">
          {wishlistItems.map((item) => (
            <li className="product-list-item" key={item.productId?._id}> {/* Use optional chaining */}
              <Card
                style={{
                  width: '18rem',
                  height: '24rem',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                className="product-card"
              >
                <Link to={`/products/${item.productId?._id}`}> {/* Use optional chaining */}
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${item.productId?.image}`} // Use optional chaining
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
                  <Card.Title className="product-title">{item.productId?.name}</Card.Title> {/* Use optional chaining */}
                  <Card.Text className="product-category">{item.productId?.category}</Card.Text> {/* Use optional chaining */}
                  <Card.Text className="product-price">
                    <span>&#8377;</span>{item.productId?.price} {/* Use optional chaining */}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeFromWishlist(item.productId?._id)} // Use optional chaining
                    className="remove-btn"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
