import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCustomer.css';

function AddCustomer({ searchTerm }) {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  // Fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customers');  // Assuming you have an API to fetch customers
        setCustomers(response.data);
        setFilteredCustomers(response.data);  // Set initial customer list
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter((customer) => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);  // Show all customers if no search term
    }
  }, [searchTerm, customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/customer', customerData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setMessage({ text: 'Customer added successfully!', type: 'success' });
        setCustomerData({ name: '', email: '', phone: '' });
      } else {
        setMessage({ text: 'Error: Could not add customer.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error: Unable to connect to the server.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-customer-container">
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
          disabled={isLoading}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>

      <h3>Customer List</h3>
      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.phone} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddCustomer;
