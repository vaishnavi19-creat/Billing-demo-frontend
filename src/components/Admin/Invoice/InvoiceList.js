import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvoiceList.css';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        // Fetch invoices from the API when the component mounts
        axios.get('/api/admin/invoices')
            .then((res) => {
                setInvoices(res.data); // Assuming the response is an array of invoices
            })
            .catch((error) => {
                console.error('Error fetching invoices', error);
            });
    }, []);

    return (
        <div className="invoice-list-container">
            <h2>Invoice List</h2>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Due Date</th>
                        <th>Created On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.invoiceId}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.customerName}</td>
                            <td>{invoice.amount.toFixed(2)}</td>
                            <td>{invoice.paymentMode}</td>
                            <td>{invoice.dueDate}</td>
                            <td>{new Date(invoice.createdOn).toLocaleDateString()}</td>
                            <td>
                                {/* Add actions like View, Edit, Delete */}
                                <button onClick={() => handleViewInvoice(invoice.invoiceId)}>View</button>
                                <button onClick={() => handleEditInvoice(invoice.invoiceId)}>Edit</button>
                                <button onClick={() => handleDeleteInvoice(invoice.invoiceId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const handleViewInvoice = (invoiceId) => {
    // Logic to view the invoice details (redirect or open modal)
    console.log(`Viewing invoice with ID: ${invoiceId}`);
};

const handleEditInvoice = (invoiceId) => {
    // Logic to edit the invoice (redirect or open edit page)
    console.log(`Editing invoice with ID: ${invoiceId}`);
};

const handleDeleteInvoice = async (invoiceId) => {
    try {
        await axios.delete(`/api/admin/invoices/${invoiceId}`);
        alert(`Invoice with ID: ${invoiceId} deleted successfully.`);
        // Optionally, refresh the invoices list
    } catch (error) {
        console.error('Error deleting invoice', error);
    }
};

export default InvoiceList;
