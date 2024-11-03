// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import './checkout.css'; 
// import axios from 'axios';

// export default function Checkout() {
//   const location = useLocation();
//   const { cartItems, totalPrice } = location.state || {};
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [address, setAddress] = useState({
//     name: '',
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//   });
//   const [savedAddresses, setSavedAddresses] = useState([]);

//   // Fetch saved addresses when the component mounts
//   useEffect(() => {
//     const userIdFromLocalStorage = localStorage.getItem('user_id');
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/address/${userIdFromLocalStorage}`);
//         setSavedAddresses(response.data);
//       } catch (error) {
//         console.error('Error fetching addresses:', error);
//       }
//     };

//     if (userIdFromLocalStorage) {
//       fetchAddresses();
//     }
//   }, []);

//   const handleProceedToPayment = () => {
//     setShowAddressForm(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveAddress = async () => {
//     const userIdFromLocalStorage = localStorage.getItem('user_id'); 
//     const addressData = {
//       userId: userIdFromLocalStorage,
//       name: address.name,
//       street: address.street,
//       city: address.city,
//       state: address.state,
//       zip: address.zip,
//       country: address.country,
//     };
  
//     try {
//       const response = await fetch("http://localhost:5000/api/address", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(addressData),
//       });
//       const data = await response.json();
//       console.log(data);

//       // Update saved addresses after saving a new one
//       setSavedAddresses((prev) => [...prev, data.address]);
//       // Reset the address form
//       setAddress({
//         name: '',
//         street: '',
//         city: '',
//         state: '',
//         zip: '',
//         country: '',
//       });

//     } catch (error) {
//       console.error("Error saving address:", error);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h2 className="checkout-title">Checkout</h2>

//       <div className="checkout-items">
//         <h3 className="items-title">Your Items</h3>
//         {cartItems.map((item) => (
//           <Card key={item.productId._id} className="item-card">
//             <Card.Img
//               variant="top"
//               src={`http://localhost:5000/${item.productId.image}`}
//               className="item-image"
//             />
//             <Card.Body>
//               <Card.Title>{item.productId.name}</Card.Title>
//               <Card.Text>Quantity: {item.quantity}</Card.Text>
//               <Card.Text>Price: <span>&#8377;</span>{item.productId.price}</Card.Text>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>

//       <div className="checkout-summary">
//         <h3 className="summary-title">Total Price: <span>&#8377;</span>{totalPrice}</h3>
//         {!showAddressForm && (
//           <Button variant="success" onClick={handleProceedToPayment} className="payment-button">
//             Proceed to Payment
//           </Button>
//         )}

//         {showAddressForm && (
//           <div className="address-form">
//             <h3>Shipping Address</h3>
//             <form onSubmit={(e) => { e.preventDefault(); handleSaveAddress(); }}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={address.name}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="street"
//                 placeholder="Street Address"
//                 value={address.street}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={address.city}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={address.state}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="zip"
//                 placeholder="ZIP Code"
//                 value={address.zip}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={address.country}
//                 onChange={handleInputChange}
//                 required
//               />
//               <Button style={{ color: 'black' }} variant="primary" type="submit">
//                 Save Address & Complete Payment
//               </Button>
//             </form>

//             <div className="saved-addresses">
//               <h4>Saved Addresses</h4>
//               {savedAddresses.map((savedAddress) => (
//                 <div key={savedAddress._id} className="saved-address">
//                   <p>{savedAddress.name}</p>
//                   <p>{savedAddress.street}, {savedAddress.city}, {savedAddress.state}, {savedAddress.zip}, {savedAddress.country}</p>
//                   <Button variant="outline-secondary" onClick={() => {
//                     console.log('Selected Address:', savedAddress);
//                   }}>
//                     Select
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './checkout.css';

export default function Checkout() {
  const location = useLocation(); // Use useLocation to get cart items and total price
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || {}; // Destructure state from location

  const handleNext = () => {
    navigate('/payment', {
      state: { cartItems, totalPrice } // Pass cartItems and totalPrice to the Payment page
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-items">
        <h3>Your Items</h3>
        {cartItems?.map((item) => (
          <Card key={item.productId._id} className="item-card">
            <Card.Img
              src={`http://localhost:5000/${item.productId.image}`}
              className="item-image"
            />
            <Card.Body>
              <Card.Title>{item.productId.name}</Card.Title>
              <Card.Text>Quantity: {item.quantity}</Card.Text>
              <Card.Text>Price: ₹{item.productId.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="checkout-summary">
        <h3>Total Price: ₹{totalPrice}</h3>
        <Button className='next-btn' variant="primary" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
