

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
// import { useAuth } from '../components/AuthContext';
// import './checkout.css';

// export default function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract cartItems and totalPrice from location.state
//   const { cartItems, totalPrice } = location.state || {};

//   const { userId } = useAuth();
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     name: '',
//     address: '',
//     city: '',
//     postalCode: '',
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editAddressId, setEditAddressId] = useState(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       const fetchShippingDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/shipping/${userId}`);
//           setSavedAddresses(response.data);
//           if (response.data.length > 0) {
//             setSelectedAddress(response.data[0]);
//           }
//         } catch (error) {
//           console.error('Error fetching shipping details:', error);
//         }
//       };
//       fetchShippingDetails();
//     }
//   }, [userId]);

//   const handleInputChange = (e) => {
//     setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
//   };

//   const handleSaveAddress = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/shipping', {
//         userId,
//         ...newAddress,
//       });
//       setSavedAddresses([...savedAddresses, response.data]);
//       setSelectedAddress(response.data);
//       setShowModal(false);
//       resetAddressForm();
//     } catch (error) {
//       console.error('Error saving shipping details:', error);
//     }
//   };

//   const handleConfirmOrder = async () => {
//     const orderDetails = {
//       userId,
//       shippingAddress: selectedAddress,
//       orderItems: cartItems.map((item) => ({
//         productId: item.productId._id, 
//         name: item.productId.name,
//         quantity: item.quantity,
//         price: item.productId.price, 
//       })),
//       totalPrice,
//       paymentMethod: selectedPaymentMethod,
//     };
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/orders', orderDetails);
//       console.log('Order confirmed:', response.data);
//       alert('Order confirmed!');
//       navigate('/order-confirmation');
//     } catch (error) {
//       console.error('Error confirming order:', error.response?.data || error.message);
//       alert(`Error confirming order: ${error.response?.data?.message || error.message}`);
//     }
//   };
  

//   const handleDeleteAddress = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/shipping/${id}`);
//       setSavedAddresses(savedAddresses.filter((address) => address._id !== id));
//       if (selectedAddress?._id === id) {
//         setSelectedAddress(null);
//       }
//     } catch (error) {
//       console.error('Error deleting shipping address:', error);
//     }
//   };

//   const resetAddressForm = () => {
//     setNewAddress({
//       name: '',
//       address: '',
//       city: '',
//       postalCode: '',
//     });
//     setEditMode(false);
//     setEditAddressId(null);
//   };

//   const handleEditAddress = (address) => {
//     setEditMode(true);
//     setEditAddressId(address._id);
//     setNewAddress({
//       name: address.name,
//       address: address.address,
//       city: address.city,
//       postalCode: address.postalCode,
//     });
//     setShowModal(true);
//   };

//   const handlePaymentMethodSelection = (method) => {
//     setSelectedPaymentMethod(method);
//     setIsConfirmEnabled(true);
//   };

//   return (
//     <div className="payment-wrapper">
//       <h2 className="payment-title">Payment</h2>

//       <div className="shipping-section">
//         <h3 className="shipping-title">Shipping Address</h3>
//         {selectedAddress ? (
//           <div className="selected-address">
//             <p className="address-name">{selectedAddress.name}</p>
//             <p className="address-details">
//               {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.postalCode}
//             </p>
//           </div>
//         ) : (
//           <p className="no-address-msg">No saved address available.</p>
//         )}

//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           Add Shipping Address
//         </Button>
//       </div>

//       <div className="address-list">
//         <h3>Saved Addresses</h3>
//         {savedAddresses.map((address) => (
//           <div key={address._id} className="address-item">
//             <div>
//               <Button className="address-name" onClick={() => setSelectedAddress(address)}>
//                 {address.name}
//               </Button>
//               <span
//                 style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
//                 onClick={() => handleDeleteAddress(address._id)}
//               >
//                 Delete
//               </span>
//               <span
//                 style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}
//                 onClick={() => handleEditAddress(address)}
//               >
//                 Edit
//               </span>
//               {selectedAddress?._id === address._id && (
//                 <div className="address-details">
//                   <p>{address.address}, {address.city}, {address.postalCode}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>


//       <div className="cart-items-section">
//         <h3>Your Cart Items</h3>
//         {cartItems && cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item.productId._id} className="cart-item">
//               <p>{item.productId.name} - Quantity: {item.quantity}</p>
//               <p>Price: ₹{item.productId.price}</p>
//             </div>
//           ))
//         ) : (
//           <p>No items in the cart</p>
//         )}
//       </div>

//       <div className="payment-methods-section">
//         <h3 className="payment-methods-title">Select Payment Method</h3>
//         <Button
//           className={`payment-method-btn ${selectedPaymentMethod === 'Credit/Debit Card' ? 'selected' : ''}`}
//           onClick={() => handlePaymentMethodSelection('Credit/Debit Card')}
//         >
//           Credit/Debit Card
//         </Button>
//         <Button
//           className={`payment-method-btn ${selectedPaymentMethod === 'Net Banking' ? 'selected' : ''}`}
//           onClick={() => handlePaymentMethodSelection('Net Banking')}
//         >
//           Net Banking
//         </Button>
//         <Button
//           className={`payment-method-btn ${selectedPaymentMethod === 'UPI' ? 'selected' : ''}`}
//           onClick={() => handlePaymentMethodSelection('UPI')}
//         >
//           UPI
//         </Button>
//         <Button
//           className={`payment-method-btn ${selectedPaymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
//           onClick={() => handlePaymentMethodSelection('Cash on Delivery')}
//         >
//           Cash on Delivery
//         </Button>
//       </div>

//       <h4 className="total-price">Total Price: ₹{totalPrice}</h4>

//       <Button
//         variant="success"
//         className="confirm-btn"
//         disabled={!isConfirmEnabled}
//         onClick={handleConfirmOrder}
//       >
//         Confirm Order
//       </Button>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import './checkout.css';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

const { cartItems = [], totalPrice = 0 } = location.state || {};

  const { userId } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone:'',
  });
  const [editMode, setEditMode] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchShippingDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/shipping/${userId}`);
          setSavedAddresses(response.data);
          if (response.data.length > 0) {
            setSelectedAddress(response.data[0]); // Automatically select the first address
          }
        } catch (error) {
          console.error('Error fetching shipping details:', error);
        }
      };
      fetchShippingDetails();
    }
  }, [userId]);

  // Handle input changes in the address form
  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    try {
      if (editMode) {
        // Update existing address
        await axios.put(`http://localhost:5000/api/shipping/${editAddressId}`, { userId, ...newAddress });
        setSavedAddresses(savedAddresses.map((address) =>
          address._id === editAddressId ? { ...address, ...newAddress } : address
        ));
        setSelectedAddress({ ...newAddress, _id: editAddressId });
      } else {
        // Save new address
        const response = await axios.post('http://localhost:5000/api/shipping', {
          userId,
          ...newAddress,
        });
        setSavedAddresses([...savedAddresses, response.data]);
        setSelectedAddress(response.data);
      }
      setShowModal(false);
      resetAddressForm();
    } catch (error) {
      console.error('Error saving shipping details:', error);
    }
  };

  const handleConfirmOrder = async () => {
    const orderDetails = {
      userId,
      shippingAddress: selectedAddress,
      orderItems: cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalPrice,
      paymentMethod: selectedPaymentMethod,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderDetails);
      console.log('Order confirmed:', response.data);
      alert('Order confirmed!');
  
      await axios.delete(`http://localhost:5000/api/cart/${userId}/clear`);
      navigate('/order-confirmation');
      window.location.reload();

    } catch (error) {
      console.error('Error confirming order:', error.response?.data || error.message);
      alert(`Error confirming order: ${error.response?.data?.message || error.message}`);
    }
  };
  

  // Handle deleting a selected address
  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/shipping/${id}`);
      const updatedAddresses = savedAddresses.filter((address) => address._id !== id);
      setSavedAddresses(updatedAddresses);
      if (selectedAddress?._id === id) {
        setSelectedAddress(updatedAddresses.length > 0 ? updatedAddresses[0] : null); // Select another address if one exists
      }
    } catch (error) {
      console.error('Error deleting shipping address:', error);
    }
  };

  // Reset the address form
  const resetAddressForm = () => {
    setNewAddress({
      name: '',
      address: '',
      city: '',
      postalCode: '',
      phone:'',
    });
    setEditMode(false);
    setEditAddressId(null);
  };

  // Handle editing an existing address
  const handleEditAddress = (address) => {
    setEditMode(true);
    setEditAddressId(address._id);
    setNewAddress({
      name: address.name,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode,
      phone:address.phone,
    });
    setShowModal(true);
  };

  // Handle payment method selection
  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setIsConfirmEnabled(true);
  };

  return (
    <div className="payment-wrapper">
      <h2 className="payment-title">Payment</h2>

      <div className="shipping-section">
        <h3 className="shipping-title">Shipping Address</h3>
        {selectedAddress ? (
          <div className="selected-address">
            <p className="address-name">{selectedAddress.name}</p>
            <p className="address-details">
              {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.postalCode}, Phone: {selectedAddress.phone},
            </p>
          </div>
        ) : (
          <p className="no-address-msg">No saved address available.</p>
        )}

        <Button variant="primary" className='ship-btn' onClick={() => setShowModal(true)}>
          {editMode ? 'Edit Address' : 'Add Shipping Address'}
        </Button>
      </div>

      <div className="address-list">
        <h3>Saved Addresses</h3>
        {savedAddresses.map((address) => (
          <div key={address._id} className="address-item">
            <div>
              <Button className="address-name" onClick={() => setSelectedAddress(address)}>
                {address.name}
              </Button>
              <span
                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                onClick={() => handleDeleteAddress(address._id)}
              >
                Delete
              </span>
              <span
                style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}
                onClick={() => handleEditAddress(address)}
              >
                Edit
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-items-section">
        <h3>Your ordered Items</h3>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <p>{item.productId.name} - Quantity: {item.quantity}</p>
              <p>Price: ₹{item.productId.price}</p>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>

      <div className="payment-methods-section">
        <h3 className="payment-methods-title">Select Payment Method</h3>
        <Button
          className={`payment-method-btn ${selectedPaymentMethod === 'Credit/Debit Card' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodSelection('Credit/Debit Card')}
        >
          Credit/Debit Card
        </Button>
        <Button
          className={`payment-method-btn ${selectedPaymentMethod === 'Net Banking' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodSelection('Net Banking')}
        >
          Net Banking
        </Button>
        <Button
          className={`payment-method-btn ${selectedPaymentMethod === 'UPI' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodSelection('UPI')}
        >
          UPI
        </Button>
        <Button
          className={`payment-method-btn ${selectedPaymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodSelection('Cash on Delivery')}
        >
          Cash on Delivery
        </Button>
      </div>

      <div className="confirm-order-section">
        <h3>Total Price: ₹{totalPrice}</h3>
        <Button variant="success" onClick={handleConfirmOrder} disabled={!isConfirmEnabled}>
          Confirm Order
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-container">
  <Modal.Header closeButton className="modal-header">
    <Modal.Title className="modal-title">
      {editMode ? 'Edit Address' : 'Add Shipping Address'}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="modal-body">
    <form className="address-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newAddress.name}
        onChange={handleInputChange}
        className="input-field name-input"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={newAddress.address}
        onChange={handleInputChange}
        className="input-field address-input"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={newAddress.city}
        onChange={handleInputChange}
        className="input-field city-input"
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={newAddress.postalCode}
        onChange={handleInputChange}
        className="input-field postal-code-input"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={newAddress.phone}
        onChange={handleInputChange}
        className="input-field phone-input"
      />
    </form>
  </Modal.Body>
  <Modal.Footer className="modal-footer">
    <Button variant="secondary" onClick={() => setShowModal(false)} className="close-button">
      Close
    </Button>
    <Button variant="primary" onClick={handleSaveAddress} className="save-button">
      {editMode ? 'Save Changes' : 'Save Address'}
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}
