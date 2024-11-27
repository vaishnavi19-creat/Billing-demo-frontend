import React, { useState } from 'react';
import axios from 'axios';
import './Addshop.css';

function Addshop() {
  // State variables for form fields
  const [shopName, setShopName] = useState('');
  const [shopType, setShopType] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [packageType, setPackageType] = useState('');
  const [message, setMessage] = useState(null); // For success or error message
  const [isLoading, setIsLoading] = useState(false); // For form loading state

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage(null); // Clear previous message

    const shopData = {
      shopName,
      shopType,
      admin: {
        name: adminName,
        email: adminEmail,
      },
      packageType,
    };

    try {
      const response = await axios.post('http://localhost:3000/shop', shopData);
      
      if (response.status === 200) {
        // Success response
        setMessage({ text: 'Shop added successfully!', type: 'success' });
        // Clear form fields
        setShopName('');
        setShopType('');
        setAdminName('');
        setAdminEmail('');
        setPackageType('');
      } else {
        // Error response
        setMessage({ text: 'Error: Could not add shop.', type: 'error' });
      }
    } catch (error) {
      // Network or other error
      setMessage({ text: 'Error: Unable to connect to the server.', type: 'error' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="addshop-container">
      {/* Display success or error message above the heading */}
      {message && (
        <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}
      
      <h2>Register New Shop</h2>

      <form onSubmit={handleSubmit} className="addshop-form">
        {/* Shop Name */}
        <label>Shop Name</label>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
          disabled={isLoading} // Disable input when loading
        />

        {/* Shop Type */}
        <label>Shop Type</label>
        <select 
          value={shopType} 
          onChange={(e) => setShopType(e.target.value)} 
          required 
          disabled={isLoading} // Disable input when loading
        >
          <option value="">Select Shop Type</option>
          <option value="medical">Medical</option>
          <option value="general">General</option>
          <option value="bakery">Clothes</option>
          <option value="footwear">Footwear</option>
          <option value="electrical">Electrical</option>
          {/* Add more shop types as needed */}
        </select>

        {/* Admin Name */}
        <label>Owner Name</label>
        <input
          type="text"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          required
          disabled={isLoading} // Disable input when loading
        />

        {/* Admin Email */}
        <label>Email</label>
        <input
          type="email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
          disabled={isLoading} // Disable input when loading
        />

        {/* Package Type */}
        <label>Package Type</label>
        <select 
          value={packageType} 
          onChange={(e) => setPackageType(e.target.value)} 
          required 
          disabled={isLoading} // Disable input when loading
        >
          <option value="">Select Package</option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Shop'}
        </button>
      </form>
    </div>
  );
}

export default Addshop;






























// import React, { useState } from 'react';
// import axios from 'axios';
// import './Addshop.css';

// function Addshop() {
//   // State variables for form fields
//   const [shopName, setShopName] = useState('');
//   const [shopType, setShopType] = useState('');
//   const [adminName, setAdminName] = useState('');
//   const [adminEmail, setAdminEmail] = useState('');
//   const [packageType, setPackageType] = useState('');
  
//   // Handler for form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const shopData = {
//       shopName,
//       shopType,
//       admin: {
//         name: adminName,
//         email: adminEmail,
//       },
//       packageType,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/api/shops', shopData);
//       console.log('Shop registered successfully:', response.data);
//       // Clear form or redirect as needed
//     } catch (error) {
//       console.error('Error registering shop:', error);
//     }
//   };

//   return (
//     <div className="addshop-container">
//       <h2>Register New Shop</h2>
//       <form onSubmit={handleSubmit} className="addshop-form">
        
//         {/* Shop Name */}
//         <label>Shop Name</label>
//         <input
//           type="text"
//           value={shopName}
//           onChange={(e) => setShopName(e.target.value)}
//           required
//         />

//         {/* Shop Type */}
//         <label>Shop Type</label>
//         <select value={shopType} onChange={(e) => setShopType(e.target.value)} required>
//           <option value="">Select Shop Type</option>
//           <option value="medical">Medical</option>
//           <option value="general">General</option>
//           <option value="bakery">Clothes</option>
//           <option value="footwear">Footwear</option>
//           <option value="footwear">Electrical</option>

//           {/* Add more shop types as needed */}
//         </select>

//         {/* Admin Name */}
//         <label>Owner Name</label>
//         <input
//           type="text"
//           value={adminName}
//           onChange={(e) => setAdminName(e.target.value)}
//           required
//         />

//         {/* Admin Email */}
//         <label> Email</label>
//         <input
//           type="email"
//           value={adminEmail}
//           onChange={(e) => setAdminEmail(e.target.value)}
//           required
//         />
       
//         {/* Package Type */}
//         <label>Package Type</label>
//         <select value={packageType} onChange={(e) => setPackageType(e.target.value)} required>
//           <option value="">Select Package</option>
//           <option value="basic">Basic</option>
//           <option value="standard">Standard</option>
//           <option value="premium">Premium</option>
//         </select>

//         {/* Submit Button */}
//         <button type="submit">Register Shop</button>
//       </form>
//     </div>
//   );
// }

// export default Addshop;




