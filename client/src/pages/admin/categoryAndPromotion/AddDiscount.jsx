import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

export default function AddDiscount() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCatergories, setSelectedCatergories] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    discountAmount: "",
  });

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch(`/api/listing/get`); // Assuming this API endpoint returns all listings
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, []);

  const handleChange1 = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    try {
      setLoading(true);
      const discountData = {
        productId: productId,
        discountAmount: formData.discountAmount,
      };
      const res = await fetch("/api/discount/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discountData),
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

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/category/`);
        const data = await res.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

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

  //   console.log(product);

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

  return (
    <div className="flex h-auto">
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

        <div className="flex flex-row max-w-7xl mx-auto h-screen ">
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
                  onChange={handleChange}
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
              <button
                onClick={downloadPdf}
                className="bg-sideNavButton hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Report
              </button>
            </div>
            <hr className="my-7 h-0.5 bg-searchBarBackground border-0 " />
            <div className="overflow-x-auto ">
              <table className=" mb-11 min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-5 dark:bg-emerald-100 dark:text-gray-850">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((prod) => (
                    <tr
                      key={prod._id}
                      className="text-black bg-white border-b dark:bg-sideNavBackground dark:border-gray-700"
                    >
                      <td className="px-3 py-4">{prod.name}</td>
                      <td className="px-3 py-4">{prod.description}</td>
                      <td className="px-3 py-4">{prod.regularPrice}</td>
                      <td className="px-3 py-4">
                        <form
                          onSubmit={(e) =>
                            handleSubmit(e, prod._id, discountAmount)
                          }
                          className="flex flex-col gap-4"
                        >
                          <input
                            type="text"
                            placeholder="Discount Amount"
                            className="border p-3 rounded-lg"
                            id="discountAmount"
                            onChange={handleChange1}
                          />

                          <button className="bg-backgreen4 text-white rounded-2xl">
                            {loading ? "Adding..." : "Add Discount"}
                          </button>
                        </form>
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
