

import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import "./home.css";
import { FaBars, FaSearch, FaShoppingCart ,FaHeart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useAuth } from '../components/AuthContext';

export default function Navbar() {
    const [showProfile, setShowProfile] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [searchResults, setSearchResults] = useState([]); 
    const [cartItems, setCartItems] = useState([]);
    const { userId, setUserId} = useAuth();
    const [username, setUsername] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const storedUsername = localStorage.getItem('name');
            if (storedUsername) {
                setUsername(storedUsername);
            } else {
                console.log('No username found in localStorage');
            }
    
            fetchCartItems();  // Fetch cart items if userId exists
        } else {
            setCartItems([]);  // Clear cart if userId is null
        }
    }, [userId]);
    
    useEffect(() => {
        if (userId) {
            const fetchWishlistItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
                    setWishlistItems(response.data.wishlistItems || []);
                } catch (error) {
                    console.error("Error fetching wishlist items:", error);
                }
            };
    
            fetchWishlistItems();
        } else {
            setWishlistItems([]);  // Clear wishlist if userId is null
        }
    }, [userId]);
    
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
            setCartItems(response.data.cartItems || []);
        } catch (error) {
            console.log('Error fetching cart items. Please try again later.');
        }
    };

   
const handleLogout = () => {
    localStorage.clear();  
    // setUsername(''); 
    // setCartItems([]);  
    // setWishlistItems([]);  
    // setUserId(null); 
    // handleCloseProfile();  
    navigate("/signin")
    window.location.reload(); 

    
};

    const handleCloseProfile = () => setShowProfile(false);
    const handleProfile = () => setShowProfile(true);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search-results?query=${searchQuery}`);
    };

    return (
        <div className='container-fluid'>
            <div className='home-css'>
                <Nav id='nav-det' variant="underline" defaultActiveKey="/home" className="justify-content-between">
                    <div className="nav-links-section">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Menu"
                            variant="secondary"
                            className="custom-dropdown"
                        >
                            <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/products">Bikes</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/accessories">Accessories</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/aboutus">About us</Dropdown.Item>

                        </DropdownButton>
                    </div>

                    <div className="search-icon" onClick={() => setShowSearchBar(!showSearchBar)}>
                        <FaSearch color="white" size={33} />
                    </div>

                    <div className='search-css'>
                        {showSearchBar && (
                            <Form className='search-place' onSubmit={handleSearch}>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button variant="outline-success" type="submit">Search</Button>
                            </Form>
                        )}
                    </div>

                    <div className="wishlist-icon">
                        <Link to="/wishlist">
                            <FaHeart color="white" size={35} />
                            {wishlistItems.length > 0 && (
                                <span className="wishlist-count">{wishlistItems.length}</span>
                            )}
                        </Link>
                    </div>

                    <div className="cart-icon">
                        <Link to="/cart">
                            <FaShoppingCart color="white" size={35} />
                            {cartItems.length > 0 && (
                                <span className="cart-count">{cartItems.length}</span>
                            )}
                        </Link>
                    </div>

                    <div className="profile-section">
                        <Button variant="primary" onClick={handleProfile} className="me-2">
                            <div className="menu-section">
                                <FaBars id="menu-icon" />
                            </div>
                        </Button>

                        <Offcanvas show={showProfile} onHide={handleCloseProfile}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Profile</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {username ? (
                                    <>
                                        <p>Welcome, {username}</p>
                                        <div style={{ paddingTop: "20px", fontSize: "20px" }}>
                                            <p><Link to="/order-status" onClick={handleCloseProfile}>Orders</Link></p>
                                        </div>
                                        <Button variant="danger" onClick={handleLogout}>Log out</Button>
                                    </>
                                ) : (
                                    <>
                                        
                                        <div className="mt-3">
                                        <p>New user? <Link to="/signup" onClick={handleCloseProfile}>Sign up here</Link></p>
                                        <p>Already a user? <Link to="/signin" onClick={handleCloseProfile}>Sign in here</Link></p>
                                       </div>
                                    </>
                                )}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </Nav>

                {loading && <p>Loading search results...</p>}
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h4>Search Results for "{searchQuery}":</h4>
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>
                                    <Link to={`/product/${result.id}`}>{result.name}</Link>
                                    <p>{result.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
