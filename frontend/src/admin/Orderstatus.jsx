// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Orderstatus.css'; // Import the CSS file for styling

// export default function Orderstatus() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/orders'); 
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching orders", error);
//       }
//     };
    
//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
//       setOrders(orders.map(order => 
//         order._id === orderId ? { ...order, status } : order
//       ));
//     } catch (error) {
//       console.error("Error updating order status", error);
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     console.log("Attempting to delete order with ID:", orderId); // Debugging step

//     try {
//         await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 // Additional headers if required by your server
//             }
//         });
//         setOrders(orders.filter(order => order._id !== orderId)); // Remove the order from the state
//     } catch (error) {
//         console.error("Error deleting order", error.response ? error.response.data : error.message);
//     }
// };



//   return (
//     <div className="order-status-container">
//       <h2>Order Status</h2>
//       {orders.length === 0 ? (
//         <p>No orders available</p>
//       ) : (
//         <table className="order-status-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Buyer Name</th>
//               <th>Shipping Address</th>
//               <th>Payment Amount</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.shippingAddress.name || 'N/A'}</td> 
//                 <td>
//                   {order.shippingAddress
//                     ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
//                     : 'N/A'}
//                 </td>
//                 <td>₹{order.totalPrice.toFixed(2)}</td> 
//                 <td>{order.status}</td>
//                 <td>
//   {(order.status === 'Pending' || order.status === 'Shipped') && (
//     <>
//       {order.status === 'Pending' && (
//         <>
//           <button className="btn-ship" onClick={() => updateOrderStatus(order._id, 'Shipped')}>Mark as Shipped</button>
//           <button className="btn-deliver" onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
//         </>
//       )}
//       {order.status === 'Shipped' && (
//         <button className="btn-deliver" onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
//       )}
//     </>
//   )}
//   {(order.status === 'Delivered' || order.status === 'Cancelled') && (
//     <button className="btn-remove" onClick={() => deleteOrder(order._id)}>Remove</button>
//   )}
// </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orderstatus.css'; // Import the CSS file for styling

export default function Orderstatus() {
  const [orders, setOrders] = useState([]);

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

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const deleteOrder = async (orderId) => {
    console.log("Attempting to delete order with ID:", orderId); // Debugging step

    try {
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
        setOrders(orders.filter(order => order._id !== orderId)); // Remove the order from the state
    } catch (error) {
        console.error("Error deleting order", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="order-status-container">
      <h2>Order Status</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <table className="order-status-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer Name</th>
              <th>Shipping Address</th>
              <th>Payment Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.shippingAddress.name || 'N/A'}</td> 
                <td>
                  {order.shippingAddress
                    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
                    : 'N/A'}
                </td>
                <td>₹{order.totalPrice.toFixed(2)}</td> 
                <td>{order.status}</td>
                <td>
                  {(order.status === 'Pending' || order.status === 'Shipped') && (
                    <>
                      {order.status === 'Pending' && (
                        <>
                          <button className="btn-ship" onClick={() => updateOrderStatus(order._id, 'Shipped')}>Mark as Shipped</button>
                          <button className="btn-deliver" onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
                        </>
                      )}
                      {order.status === 'Shipped' && (
                        <button className="btn-deliver" onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
                      )}
                    </>
                  )}
                  {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                    <button className="btn-remove" onClick={() => deleteOrder(order._id)}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
