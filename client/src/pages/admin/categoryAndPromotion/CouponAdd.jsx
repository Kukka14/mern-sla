import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

export default function CouponAdd() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [couponProducts, setCouponProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/category/`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/listing?";
        if (search) {
          url += `productName=${search}`;
          if (selectedCategory) {
            url += `&category=${selectedCategory}`;
          }
        } else if (selectedCategory) {
          url += `category=${selectedCategory}`;
        }

        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [search, selectedCategory]);

  const handleCheckboxChange = (productId) => {
    const index = couponProducts.indexOf(productId);
    if (index === -1) {
      setCouponProducts([...couponProducts, productId]);
    } else {
      setCouponProducts(couponProducts.filter((id) => id !== productId));
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Employee List", 14, 16);
    doc.autoTable({
      theme: "striped",
      startY: 22,
      head: [["Name", "NIC", "Email", "Mobile Number"]],
      body: product.map((emp) => [emp.name, emp.nic, emp.email, emp.mobile]),
    });
    doc.save("employee-list.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const couponData = {
        couponCode: couponCode,
        discountAmount: discountAmount,
        items: couponProducts,
      };
      const res = await fetch("/api/coupon/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(couponData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex h-auto">
      {/* Sidebar */}
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}
         
        <Link  to="/mainDashboard">
      <div className="flex justify-center items-center mb-8">
          <img src={logo} alt="Company Logo" className="w-48 h-auto" />
        </div>
      
      </Link>

        {/* Separate Line */}
        <hr className="border-gray-700 my-4" />

        {/* Navigation */}
        <div className="space-y-1">
          <NavLink
            icon={dashboard}
            text="Main Dashboard"
            to="/category-admin-dashboard"
          />
          <NavLink icon={dashboard} text="Add Category" to="/addcategories" />
          <NavLink icon={dashboard} text="View Category" to="/viewcategories" />
          <NavLink icon={dashboard} text="Add Discount" to="/adddiscount" />
          <NavLink icon={dashboard} text="View Discount" to="/viewdiscount" />
          <NavLink icon={dashboard} text="Create Coupon" to="/couponadd" />
          <NavLink icon={dashboard} text="View Coupon" to="/couponcodeview" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      <div className="basis-4/5 ">
        <AdminHeader />

        <div className="flex justify-center flex-row max-w-7xl mx-auto h-screen ">
          <div className="basis-3/4 ml-8">
            <div className="flex flex-row justify-between mt-9">
              <form>
                <input
                  type="text"
                  placeholder="Search by name..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-searchBarBackground w-80 rounded-2xl border h-11 pl-6"
                />
              </form>
              {!loading && categories.length === 0 && (
                <p className="text-xl text-slate-700">No categories found!</p>
              )}
              {!loading && categories.length > 0 && (
                <select
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                  className="ml-4 p-2 rounded-2xl border"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>
              )}
              
            </div>
            <hr className="my-7 h-0.5 bg-searchBarBackground border-0 " />
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mt-6">
                <label htmlFor="couponCode">Coupon Code:</label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <label htmlFor="couponCode">Discount Amount:</label>
                <input
                  type="text"
                  id="discountAmount"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex justify-center items-center mt-7">
                <table className="table-auto w-11/12 bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-green-300">
                      <th scope="col" className="px-6 py-3 rounded-tl-lg">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-tr-lg">
                        Add Coupon
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((prod, index) => (
                      <tr
                        key={prod._id}
                        className={
                          index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                        }
                      >
                        <td className="px-3 py-4">{prod.name}</td>
                        <td className="px-3 py-4">{prod.description}</td>
                        <td className="px-3 py-4">{prod.regularPrice}</td>
                        <td className="px-3 py-4">
                          <input
                            type="checkbox"
                            checked={couponProducts.includes(prod._id)}
                            onChange={() => handleCheckboxChange(prod._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {search && product.length === 0 && (
                  <p className="text-red-500 mt-5 text-center">
                    No results found.
                  </p>
                )}
                {error && <p className="text-red-500 mt-5">{error}</p>}
              </div>
              <button
                type="submit"
                className="bg-backgreen4 text-white rounded-xl px-4 py-2 mt-4"
              >
                Add Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

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
