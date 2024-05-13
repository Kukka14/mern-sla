import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";
import { FaSearch } from 'react-icons/fa'; // Import FaSearch icon

function Sproduct() {
  const [products, setProducts] = useState([]);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [reportSign, setReportSign] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/sproduct/getall');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Calculate total amount paid whenever filteredProducts changes
    const total = filteredProducts.reduce((total, product) => total + parseFloat(product.Supplier_Price) * parseInt(product.Quantity), 0);
    setTotalAmountPaid(total);
  }, [filteredProducts]);

  const generatePDF = () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Add company logo to the top-left corner

    doc.setFontSize(20);
    doc.setFont('bold');
    doc.textWithLink('Saradha Lanka Agro', 105, 20, { align: 'center', url: 'https://example.com' }); // Underlined and linked text
    doc.text('Supplier Product Report', 105, 30, { align: 'center' }); // Second line of the title


    // Initialize table
    const tableColumn = ["Supplier Name", "Supplier Email", "Product Name", "Supplier Price", "Quantity", "Total Amount Paid (LKR)"];
    const tableRows = [];

    // Push filtered data to table rows
    filteredProducts.forEach(product => {
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

    // Add the sum of total amount paid as the last row
    const sumRow = ["Total:", "", "", "", "", totalAmountPaid.toFixed(2)];
    tableRows.push(sumRow);

    // Add the table to the document
    doc.autoTable({ head: [tableColumn], body: tableRows, theme: 'striped', margin: { top: 40 } });

    // Print report generated time and date
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.setFontSize(10);
    doc.setFont('normal');
    doc.text(`Report generated on: ${currentDate} at ${currentTime}`, 14, doc.autoTable.previous.finalY + 20);

    // Add sign with a small line for signature
    const signatureY = doc.internal.pageSize.height - 20; // Adjusted position for signature
    const lineY = signatureY - 5; // Position for the small line above the signature
    doc.setLineWidth(0.5); // Set line width for the small line
    doc.setDrawColor(0); // Set color for the small line to black
    doc.setLineDash([1, 1], 0); // Set line dash for dotted line
    doc.line(14, lineY, 50, lineY); // Draw the small line

    // Add text "Supplier Manager" below the line
    doc.setFontSize(10); // Adjust font size for the text
    doc.text("Supplier Manager", 14, signatureY + 10); // Adjusted position for the text
    doc.text(`${reportSign}`, 50, signatureY); // Adjusted position to be at the bottom

    // Save the document
    doc.save('Supplier_Products_Report.pdf');
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = products.filter((product) => {
      return Object.values(product).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
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
              <div className="flex items-center">
                <FaSearch className="mr-2" /> {/* Search icon */}
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="px-3 py-1 w-full border" // Changed width to full
                />

              </div>
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
                {filteredProducts.map((product) => (
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
            <div>Total Amount Paid for All Products: {totalAmountPaid.toFixed(2)} LKR</div>
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
