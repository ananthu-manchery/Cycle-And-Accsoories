import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);  // For error handling

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

    // const banUser = async (userId) => {
    //     try {
    //         const token = localStorage.getItem('authToken'); 
    //         const response = await axios.post(
    //             `http://localhost:5000/api/users/ban/${userId}`,
    //             {},
    //             { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
    //         );
    //         alert("User banned successfully");
    //     } catch (error) {
    //         console.error("Error banning user:", error);
    //         alert("Failed to ban user");
    //     }
    // };

    const banUser = async (userId) => {
        try {
            const token = localStorage.getItem('authToken'); 
            await axios.post(
                `http://localhost:5000/api/users/ban/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
            );
            alert("User banned successfully");
            // Update the local state to reflect the banned status
            setUsers(users.map(user => user._id === userId ? { ...user, banned: true } : user));
        } catch (error) {
            console.error("Error banning user:", error);
            alert("Failed to ban user");
        }
    };
    const unbanUser = async (userId) => {
        try {
            await axios.post(`http://localhost:5000/api/users/unban/${userId}`);
            alert("User unbanned successfully");
            setUsers(users.map(user => user._id === userId ? { ...user, banned: false } : user));
        } catch (error) {
            console.error("Error unbanning user:", error);
        }
    };
    

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td>{user.banned ? 'Banned' : 'Active'}</td>
                            <td>
                                {!user.banned ? (
                                    <button onClick={() => banUser(user._id)}>
                                        Ban User
                                    </button>
                                ) : (
                                    <button onClick={() => unbanUser(user._id)}>
                                        Unban User
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
