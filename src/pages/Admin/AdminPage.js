import React from 'react'; 
import AddProduct from '../../components/Admin/Product/AddProduct';
import ProductList from '../../components/Admin/Product/ProductList'
import CustomerList from '../../components/Admin/Customer/CustomerList'
import AddCustomer from '../../components/Admin/Customer/AddCustomer';
import ShopList from '../../components/Shop/ShopList';

function AdminPage() {
  return (
    <div>
      <h2>Admin Portal</h2>

      {/* Shop Management */}
      <section>
        <h3>Manage Shops</h3>
        <ShopList />
      </section>

      {/* Product Management */}
      <section>
        <h3>Manage Products</h3>
        <AddProduct />
        <ProductList />
      </section>

      {/* Customer Management */}
      <section>
        <h3>Manage Customers</h3>
        <AddCustomer />
        <CustomerList />
      </section>
    </div>
  );
}

export default AdminPage;
