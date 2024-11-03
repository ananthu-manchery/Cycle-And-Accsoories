import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './upload.css'

export default function Upload() {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('Cycle')
    const [newProductImage, setNewProductImage] = useState(null);
    const [newAgeGroup,setNewAgeGroup]=useState('');
    const [newProductBrand, setNewProductBrand] = useState('');
    const[newProductDescription,setNewProductDescription]=useState('')
    const [newProductQuantity, setNewProductQuantity] = useState('');



    useEffect(() => {
        fetchProducts();
      }, []);
    
      const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    
      };
   
    
    const addProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', newProductName);
      formData.append('price', newProductPrice);
      formData.append('category', newProductCategory);
      formData.append('ageGroup', newAgeGroup.trim());  
      formData.append('brand',newProductBrand);
      formData.append('image', newProductImage); 
      formData.append('description',newProductDescription);
      formData.append('quantity', newProductQuantity);



      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
       }
          try {
          await axios.post('http://localhost:5000/api/products', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          fetchProducts();
          setNewProductName('');
          setNewProductPrice('');
          setNewProductCategory('Cycle');
          setNewAgeGroup('');
          setNewProductImage(null);
          setNewProductBrand('');
          setNewProductDescription('');
          setNewProductQuantity('');
          
      } catch (error) {
        console.error('Error adding product:', error.response ? error.response.data : error.message);
      }
  };
  return (
    <div className="upload-container">
    <h2>Add New Product</h2>
    <form onSubmit={addProduct}>
        <input
            type="text"
            placeholder="Product Name"
            value={newProductName || ''}
            required
            onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Description"
            value={newProductDescription || ''}
            required
            onChange={(e) => setNewProductDescription(e.target.value)}
        />
                 <select
                    value={newProductCategory || ''}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    required
                >
                    <option value="Cycle">Cycle</option>
                    <option value="Accessory">Accessory</option>
                </select>
                <select
                    value={newAgeGroup}
                    onChange={(e) => setNewAgeGroup(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Age Group</option>
                    <option value="0-3 years">0-3 years</option>
                    <option value="4-7 years">4-9 years</option>
                    <option value="13-15 years">10-15 years</option>
                    <option value="15+ years">15+ years</option>
                </select>
        <input
            type="text"
            placeholder="Brand"
            required
            value={newProductBrand || ''}
            onChange={(e) => setNewProductBrand(e.target.value)}
        />
        <input
            type="file"
            required
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    setNewProductImage(file || null);
                } else {
                    console.error("No file selected");
                }
            }}
        />
        <input
            type="text"
            placeholder="Product Price"
            required
            value={newProductPrice || ''}
            onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <input
           type="number"
           placeholder="Quantity"
           required
           value={newProductQuantity || ''}
           onChange={(e) => setNewProductQuantity(e.target.value)}
        />

        <button type="submit">Add Product</button>
    </form>
</div>
);
}