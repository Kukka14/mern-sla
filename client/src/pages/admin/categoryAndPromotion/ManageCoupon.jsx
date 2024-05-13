import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

export default function ManageCoupon({ match }) {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [couponCode, setCouponCode] = useState(""); // Added couponCode state

  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/coupon/get/${id}`);
        setCoupon(res.data);
        setSelectedProducts(res.data.items);
        setCouponCode(res.data.couponCode); // Set couponCode from fetched coupon
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCoupon();
  }, [id]); // <-- Fixed dependency

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
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [search, selectedCategory]);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedCouponData = {
        couponCode: couponCode, // Use couponCode state
        items: selectedProducts,
      };
      const res = await axios.put(
        `/api/coupon/update/${coupon._id}`,
        updatedCouponData
      );
      console.log(res.data);
      // handle success or error
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
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

        <div className="flex flex-row max-w-7xl mx-auto h-screen ">
          <div className="basis-3/4 ml-8">
            <div className="flex flex-row justify-between mt-9">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {coupon && (
                <form onSubmit={handleUpdateCoupon}>
                  <div>
                    <label htmlFor="couponCode">Coupon Code:</label>
                    <input
                      type="text"
                      id="couponCode"
                      placeholder={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border rounded-lg px-4 py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-backgreen4 text-white rounded-2xl px-4 py-2 mt-4"
                  >
                    Add Coupon
                  </button>
                  <div>
                    <h2>Products:</h2>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-searchBarBackground w-80 rounded-2xl border h-11 pl-6"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="ml-4 p-2 rounded-2xl border"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 overflow-x-auto ">
                    <table className="mb-11 min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
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
                          <th scope="col" className="px-6 py-3">
                            Add Coupon
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.regularPrice}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedProducts.includes(product._id)}
                                onChange={() =>
                                  handleCheckboxChange(product._id)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
              )}
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
