import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerList.css';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [updatedCustomerData, setUpdatedCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle the update of customer data
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/customers/${selectedCustomer.id}`,
        updatedCustomerData
      );
      if (response.status === 200) {
        alert('Customer updated successfully!');
        setCustomers((prevState) =>
          prevState.map((customer) =>
            customer.id === selectedCustomer.id ? { ...customer, ...updatedCustomerData } : customer
          )
        );
        setSelectedCustomer(null);
      } else {
        alert('Error updating customer!');
      }
    } catch (error) {
      alert('Error: Unable to update customer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the deletion of a customer
  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setIsLoading(true);
      try {
        const response = await axios.delete(`http://localhost:3000/customers/${customerId}`);
        if (response.status === 200) {
          setCustomers(customers.filter((customer) => customer.id !== customerId));
          alert('Customer deleted successfully!');
        } else {
          alert('Error deleting customer!');
        }
      } catch (error) {
        alert('Error: Unable to delete customer.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setUpdatedCustomerData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      {isLoading ? (
        <p>Loading customers...</p>
      ) : (
        <>
          <div className="customer-list">
            {customers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="customer-info">
                  <p>{customer.name}</p>
                  <p>{customer.phone}</p>
                  <p>{customer.email}</p>
                </div>
                <div className="customer-actions">
                  <button onClick={() => handleViewCustomer(customer)}>View</button>
                  <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                  <button onClick={() => handleViewCustomer(customer)}>Update</button>
                </div>
              </div>
            ))}
          </div>

          {selectedCustomer && (
            <div className="update-customer-form">
              <h3>Update Customer</h3>
              <form onSubmit={handleUpdateCustomer}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedCustomerData.name}
                  onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, name: e.target.value })}
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedCustomerData.email}
                  onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, email: e.target.value })}
                  required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={updatedCustomerData.phone}
                  onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, phone: e.target.value })}
                  required
                />

                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Customer'}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CustomerList;
