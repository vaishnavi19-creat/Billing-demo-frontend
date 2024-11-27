import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        console.log('Fetched Products:', response.data);  // Log fetched products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle view and edit actions
  const handleView = (product) => {
    setSelectedProduct(product);
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Handle inventory updates
  const handleUpdateInventory = (newStock) => {
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        stock: newStock
      }));
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${productId}`);
      alert(response.data.message || 'Product deleted successfully');
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product', error);
      alert('Failed to delete product');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${selectedProduct.id}`, selectedProduct);
      alert(response.data.message || 'Product updated successfully');
      setProducts(products.map((product) => (product.id === selectedProduct.id ? selectedProduct : product)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>

      {products.length === 0 && <p>No products available.</p>}

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-info-horizontal">
              <span className="label">Name:</span>
              <span>{product.name}</span>
              <span className="label">Category:</span>
              <span>{product.category}</span>
            </div>
            <div className="product-info-horizontal">
              <span className="label">Price:</span>
              <span>{product.price}</span>
              <span className="label">Stock:</span>
              <span>{product.stock}</span>
            </div>
            <button onClick={() => handleView(product)}>View</button>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="selected-product-container">
          <h2>{isEditing ? 'Edit Product' : 'Product Details'}</h2>
          <div className="product-details">
            <p><span className="label">Name:</span> {selectedProduct.name}</p>
            <p><span className="label">Category:</span> {selectedProduct.category}</p>
            <p><span className="label">Price:</span> {selectedProduct.price}</p>
            <p><span className="label">Stock:</span> {selectedProduct.stock}</p>
          </div>

          {isEditing && (
            <form onSubmit={handleUpdate}>
              <div className="form-row">
                <label>Update Stock</label>
                <input
                  type="number"
                  value={selectedProduct.stock}
                  onChange={(e) => handleUpdateInventory(parseInt(e.target.value))}
                />
              </div>
              <button type="submit" className="submit-button">Update Product</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProductList.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/products');
//         console.log('Fetched Products:', response.data);  // Log fetched products
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleView = (product) => {
//     setSelectedProduct(product);
//     setIsEditing(false);
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setIsEditing(true);
//   };

//   const handleDelete = async (productId) => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/api/products/${productId}`);
//       alert(response.data.message || 'Product deleted successfully');
//       setProducts(products.filter((product) => product.id !== productId));
//     } catch (error) {
//       console.error('Error deleting product', error);
//       alert('Failed to delete product');
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:3000/api/products/${selectedProduct.id}`, selectedProduct);
//       alert(response.data.message || 'Product updated successfully');
//       setProducts(products.map((product) => (product.id === selectedProduct.id ? selectedProduct : product)));
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating product', error);
//       alert('Failed to update product');
//     }
//   };

//   return (
//     <div className="product-list-container">
//       <h2>Product List</h2>

//       {/* Conditional rendering for no products */}
//       {products.length === 0 && <p>No products available.</p>}

//       <div className="product-list">
//         {products.map((product) => (
//           <div className="product-card" key={product.id}>
//             <div className="product-info-horizontal">
//               <span className="product-name">{product.name}</span> |
//               <span className="product-category">{product.category}</span> |
//               <span className="product-price">${product.price}</span> |
//               <span className="product-quantity">Quantity: {product.quantity}</span> |
//               <span className="product-stock">Stock: {product.stock}</span> |
//               <span className="product-keywords">Keywords: {product.keywords}</span>
//             </div>
//             <div className="product-actions">
//               <button onClick={() => handleView(product)} className="view-btn">👁️ View</button>
//               <button onClick={() => handleEdit(product)} className="edit-btn">✏️ Edit</button>
//               <button onClick={() => handleDelete(product.id)} className="delete-btn">🗑️ Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <div className="product-modal">
//           <h3>{isEditing ? 'Edit Product' : 'Product Details'}</h3>
//           {isEditing ? (
//             <form onSubmit={handleUpdate}>
//               <input
//                 type="text"
//                 value={selectedProduct.name}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
//                 placeholder="Product Name"
//                 required
//               />
//               <input
//                 type="text"
//                 value={selectedProduct.category}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
//                 placeholder="Category"
//                 required
//               />
//               <input
//                 type="number"
//                 value={selectedProduct.price}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
//                 placeholder="Price"
//                 required
//               />
//               <button type="submit">Save Changes</button>
//             </form>
//           ) : (
//             <div className="product-details">
//               <p><strong>Description:</strong> {selectedProduct.description}</p>
//               <p><strong>Price:</strong> ${selectedProduct.price}</p>
//               <p><strong>Category:</strong> {selectedProduct.category}</p>
//               <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
//               <p><strong>Stock:</strong> {selectedProduct.stock}</p>
//               <p><strong>Keywords:</strong> {selectedProduct.keywords}</p>
//             </div>
//           )}
//           <button onClick={() => setSelectedProduct(null)} className="close-btn">Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;





















