import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch customer data when the component mounts
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getAllCustomers');
                setCustomers(response.data);
                setFilteredCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    // Get search term from URL parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search') || '';

        if (searchTerm === '') {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.id.toString().includes(searchTerm)
            );
            setFilteredCustomers(filtered);
        }
    }, [location.search, customers]);

    // Delete customer by ID
    const handleDeleteCustomer = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`);
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    // Navigate to update customer page
    const handleUpdateCustomer = (id) => {
        navigate(`/update-customer/${id}`);
    };

    // Navigate to view customer details page
    const handleViewCustomer = (id) => {
        navigate(`/view-customer/${id}`);
    };

    // Navigate to add shop page with customer ID
    const handleAddShop = (id) => {
        navigate(`/add-shop?customerId=${id}`);
    };

    return (
        <div className="customer-list-container">
            <h2>Customer List</h2>

            {/* Customer Table */}
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <button onClick={() => handleViewCustomer(customer.id)} className="action-button view">View</button>
                                    <button onClick={() => handleUpdateCustomer(customer.id)} className="action-button update">Update</button>
                                    <button onClick={() => handleDeleteCustomer(customer.id)} className="action-button delete">Delete</button>
                                    <button onClick={() => handleAddShop(customer.id)} className="action-button add-shop">Add Shop</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;




































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CustomerList.css';

// const CustomerList = () => {
//     // State variables for storing customers and search input
//     const [customers, setCustomers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredCustomers, setFilteredCustomers] = useState([]);

//     // Fetch customer data from backend when the component mounts
//     useEffect(() => {
//         const fetchCustomers = async () => {
//             try {
//                 const response = await axios.get('/api/customers');
//                 setCustomers(response.data); // Set the fetched customers to state
//             } catch (error) {
//                 console.error('Error fetching customers:', error);
//             }
//         };

//         fetchCustomers();
//     }, []);

//     // Filter customers based on search term (search by name or id)
//     useEffect(() => {
//         if (searchTerm === '') {
//             setFilteredCustomers(customers);
//         } else {
//             const filtered = customers.filter(customer =>
//                 customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 customer.id.toString().includes(searchTerm)
//             );
//             setFilteredCustomers(filtered);
//         }
//     }, [searchTerm, customers]);

//     // Handle change in search input
//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <div className="customer-list-container">
//             <h2>Customer List</h2>

//             {/* Search Bar */}
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search by Name or ID"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//             </div>

//             {/* Customer Table */}
//             <table className="customer-table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredCustomers.length > 0 ? (
//                         filteredCustomers.map(customer => (
//                             <tr key={customer.id}>
//                                 <td>{customer.id}</td>
//                                 <td>{customer.name}</td>
//                                 <td>{customer.email}</td>
//                                 <td>{customer.phone}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No customers found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CustomerList;
