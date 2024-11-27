import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShopList.css';

const ShopListPage = ({ searchTerm }) => {
    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);

    // Fetch shop data from the backend when the component mounts
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getAllShops');
                setShops(response.data);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        fetchShops();
    }, []);

    // Filter shops based on the search term from the menubar search input
    useEffect(() => {
        if (!searchTerm) {
            setFilteredShops(shops);
        } else {
            const filtered = shops.filter(shop =>
                shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredShops(filtered);
        }
    }, [searchTerm, shops]);

    // Handle delete operation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/shops/${id}`);
            setShops(shops.filter(shop => shop.id !== id));
        } catch (error) {
            console.error('Error deleting shop:', error);
        }
    };

    // Handle view and update (stub functions for now)
    const handleView = (id) => {
        console.log(`View shop with ID: ${id}`);
        // navigate to view page (add navigation logic here)
    };

    const handleUpdate = (id) => {
        console.log(`Update shop with ID: ${id}`);
        // navigate to update page (add navigation logic here)
    };

    return (
        <div className="shop-list-container">
            <h2>Shop List</h2>

            {/* Shop Table */}
            <table className="shop-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Shop Name</th>
                        <th>Owner Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShops.length > 0 ? (
                        filteredShops.map(shop => (
                            <tr key={shop.id}>
                                <td>{shop.id}</td>
                                <td>{shop.name}</td>
                                <td>{shop.ownerName}</td>
                                <td>{shop.location}</td>
                                <td>
                                    <button onClick={() => handleView(shop.id)} className="action-button view">View</button>
                                    <button onClick={() => handleUpdate(shop.id)} className="action-button update">Update</button>
                                    <button onClick={() => handleDelete(shop.id)} className="action-button delete">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No shops found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShopListPage;







































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ShopList.css';

// const ShopListPage = () => {
//     // State variables for storing shops and search input
//     const [shops, setShops] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredShops, setFilteredShops] = useState([]);

//     // Fetch shop data from backend when the component mounts
//     useEffect(() => {
//         const fetchShops = async () => {
//             try {
//                 const response = await axios.get('/api/shops');
//                 setShops(response.data); // Set the fetched shops to state
//             } catch (error) {
//                 console.error('Error fetching shops:', error);
//             }
//         };

//         fetchShops();
//     }, []);

//     // Filter shops based on search term (search by name or owner name)
//     useEffect(() => {
//         if (searchTerm === '') {
//             setFilteredShops(shops);
//         } else {
//             const filtered = shops.filter(shop =>
//                 shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//             setFilteredShops(filtered);
//         }
//     }, [searchTerm, shops]);

//     // Handle change in search input
//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <div className="shop-list-container">
//             <h2>Shop List</h2>

//             {/* Search Bar */}
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search by Shop Name or Owner Name"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//             </div>

//             {/* Shop Table */}
//             <table className="shop-table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Shop Name</th>
//                         <th>Owner Name</th>
//                         <th>Location</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredShops.length > 0 ? (
//                         filteredShops.map(shop => (
//                             <tr key={shop.id}>
//                                 <td>{shop.id}</td>
//                                 <td>{shop.name}</td>
//                                 <td>{shop.ownerName}</td>
//                                 <td>{shop.location}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No shops found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ShopListPage;
