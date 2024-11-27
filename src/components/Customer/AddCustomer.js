import React, { useState } from 'react';
import './AddCustomer.css';

function AddCustomer() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState(null); // For success or error message
  const [isLoading, setIsLoading] = useState(false); // For form loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage(null); // Clear previous message

    try {
      const response = await fetch('http://localhost:3000/customer', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        // Success response
        setMessage({ text: 'Customer added successfully!', type: 'success' });
        setCustomerData({ name: '', email: '', phone: '' }); 
      } else {
        // Error response
        setMessage({ text: 'Error: Could not add customer.', type: 'error' });
      }
    } catch (error) {
      // Network or other error
      setMessage({ text: 'Error: Unable to connect to the server.', type: 'error' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="add-customer-container">

      {/* Display success or error message */}
      {message && (
        <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}

      <h2>Add Customer</h2>

      <form onSubmit={handleSubmit} className="customer-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          required
          disabled={isLoading} // Disable input when loading
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          required
          disabled={isLoading} // Disable input when loading
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
          required
          disabled={isLoading} // Disable input when loading
        />

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;




































// import React, { useState } from 'react';
// import './AddCustomer.css';

// function AddCustomer() {
//   const [customerData, setCustomerData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });
//   const [message, setMessage] = useState(null); // For success or error message
//   const [isLoading, setIsLoading] = useState(false); // For form loading state

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading
//     setMessage(null); // Clear previous message

//     try {
//       const response = await fetch('http://localhost:3000/customer', { // Replace with your backend endpoint
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(customerData),
//       });

//       if (response.ok) {
//         // Success response
//         setMessage({ text: 'Customer added successfully!', type: 'success' });
//         setCustomerData({ name: '', email: '', phone: '' }); // Reset form fields
//       } else {
//         // Error response
//         setMessage({ text: 'Error: Could not add customer.', type: 'error' });
//       }
//     } catch (error) {
//       // Network or other error
//       setMessage({ text: 'Error: Unable to connect to the server.', type: 'error' });
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="add-customer-container">
//       <h2>Add Customer</h2>

//       {/* Display success or error message */}
//       {message && (
//         <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="customer-form">
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={customerData.name}
//           onChange={handleChange}
//           required
//           disabled={isLoading} // Disable input when loading
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={customerData.email}
//           onChange={handleChange}
//           required
//           disabled={isLoading} // Disable input when loading
//         />

//         <label htmlFor="phone">Phone:</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={customerData.phone}
//           onChange={handleChange}
//           required
//           disabled={isLoading} // Disable input when loading
//         />

//         <button type="submit" className="submit-button" disabled={isLoading}>
//           {isLoading ? 'Adding...' : 'Add Customer'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddCustomer;

























































// import React, { useState } from 'react';
// import './AddCustomer.css';

// function AddCustomer() {
//   const [customerData, setCustomerData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Customer Added:', customerData);
//   };

//   return (
//     <div className="add-customer-container">
//       <h2>Add Customer</h2>
//       <form onSubmit={handleSubmit} className="customer-form">
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={customerData.name}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={customerData.email}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="phone">Phone:</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={customerData.phone}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" className="submit-button">Add Customer</button>
//       </form>
//     </div>
//   );
// }

// export default AddCustomer;



















