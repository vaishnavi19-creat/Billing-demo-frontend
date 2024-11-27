import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
// import RegisterPage from './pages/Register/RegisterPage';
import SuperAdminPage from './pages/SuperAdmin/SuperAdminPage';
import Menubar from './components/Menubar/Menubar';
import CustomerList from './components/Customer/CustomerList';
import ShopList from './components/Shop/ShopList';
import AddCustomer from './components/Customer/AddCustomer';
import AddShop from './components/Shop/AddShop';
import AddProduct from './components/Admin/Product/AddProduct';
import ProductList from './components/Admin/Product/ProductList';
import AdminPage from './pages/Admin/AdminPage';
import AdminMenubar from './components/Admin/Menubar/AdminMenubar';
import AddInvoice from './components/Admin/Invoice/AddInvoice';
import InvoiceList from './components/Admin/Invoice/InvoiceList';

// Component to handle rendering of menubars and routes
function AppContent() {
  const location = useLocation(); // Hook to get the current path
  
  // Define which routes should show which menubar
  const isSuperAdminRoute = [
    '/superadmin',
    '/add-shop',
    '/add-customer',
    '/customer-list',
    '/shop-list'
  ].includes(location.pathname);
  
  const isAdminRoute = [
  './admin',
  './admin/addcustomer',
  './admin/customerlist',
  './admin/addproduct',
  './admin/productlist',
  './admin/add-invoice',
  './admin/invoice-list',
  ].includes(location.pathname)

  return (
    <div>
      {/* Render Menubar only for SuperAdmin routes */}
      {isSuperAdminRoute && <Menubar />}

      {/* Render AdminMenubar only for Admin routes */}
      {isAdminRoute && <AdminMenubar />}

      <Routes>
        {/* SuperAdmin Routes */}
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path='/menubar' element={<Menubar/>}/>
        <Route path="/superadmin" element={<SuperAdminPage />} />
        <Route path="/add-shop" element={<AddShop />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/shop-list" element={<ShopList />} />

        {/* Admin Routes */}
        <Route path='/admin-menubar' element={<AdminMenubar/>}/>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/addcustomer" element={<AddCustomer />} />
        <Route path="/admin/customerlist" element={<CustomerList />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route path="/admin/add-invoice" element={<AddInvoice/>} />
        <Route path="/admin/invoice-list" element={<InvoiceList />} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;



















// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/Login/LoginPage';
// // import RegisterPage from './pages/Register/RegisterPage';
// import SuperAdminPage from './pages/SuperAdmin/SuperAdminPage';
// import Menubar from './components/Menubar/Menubar';
// import CustomerList from './components/Customer/CustomerList';
// import ShopList from './components/Shop/ShopList';
// import AddCustomer from './components/Customer/AddCustomer';
// import AddShop from './components/Shop/AddShop';
// import AddProduct from './components/Admin/Product/AddProduct';
// import ProductList from './components/Admin/Product/ProductList';
// import AdminPage from './pages/Admin/AdminPage';
// import AdminMenubar from './components/Admin/Menubar/AdminMenubar';

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* superadmin-portal */}
//         <Menubar /> {/* Menubar is now visible on all pages */}
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           {/* <Route path="/register" element={<RegisterPage />} /> */}
//           <Route path="/superadmin" element={<SuperAdminPage />} />
//           <Route path="/add-shop" element={<AddShop />} />
//           <Route path="/add-customer" element={<AddCustomer />} />
//           <Route path="/customer-list" element={<CustomerList />} />
//           <Route path="/shop-list" element={<ShopList />} />
//         </Routes>
//         </div>

//       <div>

//         {/* Admin */}
//         <AdminMenubar/>
//         <Routes>
//           <Route path='/admin'element={<AdminPage/>}    />
//           <Route path='/addcustomer'element={<AddCustomer/>}    />
//           <Route path='/customerlist'element={<CustomerList/>}    />
//           <Route path='/addproduct'element={<AddProduct/>}    />
//           <Route path='/productlist'element={<ProductList/>}    />
          
//               </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
























