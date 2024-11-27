import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './AdminMenubar.css';

const AdminMenubar = ({ onSearch }) => {
  const [openCustomerMenu, setOpenCustomerMenu] = useState(false);
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle change in the search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle the search submit when either button is clicked or Enter is pressed
  const handleSearchSubmit = (e) => {
    e.preventDefault();  // Prevent form submission
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  // Handle key press to trigger search on Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  // Toggle menus when clicked and close the other menu
  const handleMenuClick = (menu) => {
    if (menu === 'customer') {
      setOpenCustomerMenu(!openCustomerMenu);
      if (openProductMenu) setOpenProductMenu(false); // Close product menu if open
    } else if (menu === 'product') {
      setOpenProductMenu(!openProductMenu);
      if (openCustomerMenu) setOpenCustomerMenu(false); // Close customer menu if open
    }
  };

  return (
    <nav className="admin-menubar">
      {/* Left side - Menu Items (Customer, Product) */}
      <div className="menu-items">
        <ul>
          <li
            onClick={() => handleMenuClick('customer')}
            className={openCustomerMenu ? 'show-dropdown' : ''}
          >
            Customer
            {openCustomerMenu && (
              <ul>
                <li>
                  {/* Link to Add Customer page */}
                  <Link to="/admin/addcustomer">Add Customer</Link>
                </li>
                <li>
                  {/* Link to Customer List page */}
                  <Link to="/admin/customerlist">Customer List</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onClick={() => handleMenuClick('product')}
            className={openProductMenu ? 'show-dropdown' : ''}
          >
            Product
            {openProductMenu && (
              <ul>
                <li>
                  {/* Link to Add Product page */}
                  <Link to="/admin/addproduct">Add Product</Link>
                </li>
                <li>
                  {/* Link to Product List page */}
                  <Link to="/admin/productlist">Product List</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Right side - Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search products by name, category, price, etc."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress} // Trigger search on Enter key
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default AdminMenubar;








































// import React, { useState } from 'react';
// import './AdminMenubar.css';

// const AdminMenubar = ({ onSearch }) => {
//   const [openCustomerMenu, setOpenCustomerMenu] = useState(false);
//   const [openProductMenu, setOpenProductMenu] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Handle change in the search input
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//   };

//   // Handle the search submit when either button is clicked or Enter is pressed
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();  // Prevent form submission
//     onSearch(searchTerm); // Pass the search term to the parent component
//   };

//   // Handle key press to trigger search on Enter
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearchSubmit(e);
//     }
//   };

//   // Toggle menus when clicked and close the other menu
//   const handleMenuClick = (menu) => {
//     if (menu === 'customer') {
//       setOpenCustomerMenu(!openCustomerMenu);
//       if (openProductMenu) setOpenProductMenu(false); // Close product menu if open
//     } else if (menu === 'product') {
//       setOpenProductMenu(!openProductMenu);
//       if (openCustomerMenu) setOpenCustomerMenu(false); // Close customer menu if open
//     }
//   };

//   return (
//     <nav className="admin-menubar">
//       {/* Left side - Menu Items (Customer, Product) */}
//       <div className="menu-items">
//         <ul>
//           <li
//             onClick={() => handleMenuClick('customer')}
//             className={openCustomerMenu ? 'show-dropdown' : ''}
//           >
//             Customer
//             {openCustomerMenu && (
//               <ul>
//                 <li>Add Customer</li>
//                 <li>Customer List</li>
//               </ul>
//             )}
//           </li>
//           <li
//             onClick={() => handleMenuClick('product')}
//             className={openProductMenu ? 'show-dropdown' : ''}
//           >
//             Product
//             {openProductMenu && (
//               <ul>
//                 <li>Add Product</li>
//                 <li>Product List</li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       </div>

//       {/* Right side - Search Bar */}
//       <div className="search-bar">
//         <form onSubmit={handleSearchSubmit} className="search-form">
//           <input
//             type="text"
//             placeholder="Search products by name, category, price, etc."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             onKeyPress={handleKeyPress} // Trigger search on Enter key
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>
//     </nav>
//   );
// };

// export default AdminMenubar;

























