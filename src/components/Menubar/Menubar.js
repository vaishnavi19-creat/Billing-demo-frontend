import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';

const Menubar = () => {
  const [openCustomerMenu, setOpenCustomerMenu] = useState(false);
  const [openShopMenu, setOpenShopMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  const handleMenuClick = (menu) => {
    if (menu === 'customer') {
      setOpenCustomerMenu(!openCustomerMenu);
      if (openShopMenu) setOpenShopMenu(false);
    } else if (menu === 'shop') {
      setOpenShopMenu(!openShopMenu);
      if (openCustomerMenu) setOpenCustomerMenu(false);
    }
  };

  return (
    <nav className="menubar">
      {/* Left side - Menu Items (Customer, Shop) */}
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
                  <Link to="/add-customer">Add Customer</Link>
                </li>
                <li>
                  <Link to="/customer-list">Customer List</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onClick={() => handleMenuClick('shop')}
            className={openShopMenu ? 'show-dropdown' : ''}
          >
            Shop
            {openShopMenu && (
              <ul>
                <li>
                  <Link to="/add-shop">Add Shop</Link>
                </li>
                <li>
                  <Link to="/shop-list">Shop List</Link>
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
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Menubar;























