import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

function Sproduct() {
    const [products, setProducts] = useState([]);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/sproduct/getall');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const generatePDF = () => {
        // Initialize jsPDF instance
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setFont('bold');
        doc.text('Saradha Lanka Agro - Supplier Product Report', 105, 20, { align: 'center' });

        // Initialize table
        const tableColumn = ["Supplier Name", "Supplier Email", "Product Name", "Supplier Price", "Quantity", "Total Amount Paid (LKR)"];
        const tableRows = [];

        // Push data to table rows
        products.forEach(product => {
            const totalAmountPaid = parseFloat(product.Supplier_Price) * parseInt(product.Quantity);
            const rowData = [
                product.Supplier_Name,
                product.Supplier_Email,
                product.Product_Name,
                product.Supplier_Price,
                product.Quantity,
                totalAmountPaid.toFixed(2)
            ];
            tableRows.push(rowData);
        });

        // Calculate and set total amount paid
        const total = products.reduce((total, product) => total + parseFloat(product.Supplier_Price) * parseInt(product.Quantity), 0);
        setTotalAmountPaid(total);

        // Add the sum of total amount paid as the last row
        const sumRow = ["Total:", "", "", "", "", total.toFixed(2)];
        tableRows.push(sumRow);

        // Add the table to the document
        doc.autoTable({ head: [tableColumn], body: tableRows, theme: 'striped', margin: { top: 30 } });

        // Print report generated time and date
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        doc.setFontSize(10);
        doc.setFont('normal');
        doc.text(`Report generated on: ${currentDate} at ${currentTime}`, 14, doc.autoTable.previous.finalY + 20);

        // Save the document
        doc.save('Supplier_Products_Report.pdf');
    };

    return (

        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-sideNavBackground w-1/5 p-4">
          {/* Logo */}
          <div className="flex justify-center items-center mb-8">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </div>
  
          {/* Separate Line */}
          <hr className="border-gray-700 my-4" />
  
          {/* Navigation */}
            
          <div className="space-y-1">
          <NavLink
            icon={dashboard}
            text="Main Dashboard"
            to="/sdashboard"
          />

         <NavLink
            icon={dashboard}
            text="Add Supplier"
            to="/add-supplier"
          />
          <NavLink
            icon={dashboard}
            text="View Suppliers"
            to="/view-suppliers"
          />
          
           <NavLink
            icon={dashboard}
            text="Add Product"
            to="/create-sproduct"
          />
          <NavLink icon={dashboard} text="View Products" to="/sproduct" />
          
          <NavLink
            icon={dashboard}
            text="Generate Reports"
            to="/sproductreport"
          />
          
          
          {/* Add more navigation items as needed */}
        </div>




        </div>
  
        <div className="basis-4/5 ">
          <AdminHeader />
     

        <div className="min-h-screen bg-primary flex items-center justify-center">
            <div className="w-3/4 bg-white rounded p-3">
                <div className="flex justify-between mb-4">
                    <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Report</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Supplier Name</th>
                            <th className="px-4 py-2">Supplier Email</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Supplier Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total Amount Paid (LKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="border px-4 py-2">{product.Supplier_Name}</td>
                                <td className="border px-4 py-2">{product.Supplier_Email}</td>
                                <td className="border px-4 py-2">{product.Product_Name}</td>
                                <td className="border px-4 py-2">{product.Supplier_Price}</td>
                                <td className="border px-4 py-2">{product.Quantity}</td>
                                <td className="border px-4 py-2">{(parseFloat(product.Supplier_Price) * parseInt(product.Quantity)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>Total Amount Paid for All Products: {(products.reduce((total, product) => total + parseFloat(product.Supplier_Price) * parseInt(product.Quantity), 0)).toFixed(2)} LKR</div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Sproduct;

function NavLink({ icon, text, to }) {
    return (
      <Link
        to={to}
        className="flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover "
      >
        <img src={icon} alt={text} className="w-6 h-6 mr-4" />
        <span className="text-lg font-semibold">{text}</span>
      </Link>
    );
  }
  