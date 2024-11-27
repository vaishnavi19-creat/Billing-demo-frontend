import React from 'react';
import AddCustomer from '../../components/Customer/AddCustomer';
import CustomerList from '../../components/Customer/CustomerList';
import ShopList from '../../components/Shop/ShopList';
import Addshop from '../../components/Shop/AddShop'

function SuperAdminPage() {
  return (
    <div>
      <h2>Super Admin Portal</h2>
      <ShopList />
      <Addshop/>
      <AddCustomer/>
      <CustomerList/>
    </div>
  );
}

export default SuperAdminPage;