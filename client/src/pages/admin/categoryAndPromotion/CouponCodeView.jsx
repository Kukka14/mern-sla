import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function CouponCodeView() {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/coupon");
        const couponData = res.data;
        // Map through each coupon and fetch product names using their IDs
        const couponWithProductNames = await Promise.all(
          couponData.map(async (coupon) => {
            const productNames = await Promise.all(
              coupon.items.map(async (productId) => {
                try {
                  const productRes = await axios.get(
                    `/api/listing/${productId}`
                  );
                  return productRes.data.name;
                } catch (error) {
                  // Handle error fetching product name
                  console.error(
                    `Error fetching product name for product ID ${productId}: ${error.message}`
                  );
                  return "Unknown Product";
                }
              })
            );
            return { ...coupon, productNames };
          })
        );
        setCoupons(couponWithProductNames);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  const handleStatusChange = async (couponId, newStatus) => {
    try {
      const res = await axios.put(`/api/coupon/${couponId}`, {
        status: newStatus,
      });
      // If the status update is successful, update the local state
      if (res.data.success) {
        const updatedCoupons = coupons.map((coupon) =>
          coupon._id === couponId ? { ...coupon, status: newStatus } : coupon
        );
        setCoupons(updatedCoupons);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      const res = await axios.delete(`/api/coupon/delete/${couponId}`);
      if (res.data.success) {
        // If deletion is successful, remove the coupon from the state
        const updatedCoupons = coupons.filter((coupon) => coupon._id !== couponId);
        setCoupons(updatedCoupons);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
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

        <div className="flex flex-col max-w-7xl mx-auto h-screen">
          <div className="basis-3/4 ml-8">
            <h1 className="text-2xl font-bold mt-8 mb-4">Coupon Codes</h1>
            <div className="overflow-x-auto">
              <table className="mb-11 min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-5 dark:bg-emerald-100 dark:text-gray-850">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Coupon Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Discount Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Names
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Manage
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr
                      key={coupon._id}
                      className="text-black bg-white border-b dark:bg-sideNavBackground dark:border-gray-700"
                    >
                      <td className="px-3 py-4">{coupon.couponCode}</td>
                      <td className="px-3 py-4">{coupon.discountAmount}</td>
                      <td className="px-3 py-4">
                        {coupon.productNames.map((productName, index) => (
                          <div key={index}>{productName}</div>
                        ))}
                      </td>
                      <td className="px-3 py-4">
                        {coupon.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(coupon._id, "inactive")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full"
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(coupon._id, "active")
                            }
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full"
                          >
                            Inactive
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        <Link to={`/managecoupon/${coupon._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full">
                            Manage
                          </button>
                        </Link>
                      </td>
                      <td className="px-3 py-4">
                        <button
                          onClick={() => handleDeleteCoupon(coupon._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
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
