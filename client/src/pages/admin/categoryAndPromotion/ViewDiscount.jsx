import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function ViewDiscount() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(""); // State to hold the discount amount input value

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Fetch discount data
        const discountRes = await fetch("/api/discount/get");
        const discountData = await discountRes.json();

        // Fetch product data and merge with discount amount
        const productsPromises = discountData.map(async (discount) => {
          const productRes = await fetch(`/api/listing/${discount.productId}`);
          const productData = await productRes.json();
          return {
            productId: discount.productId,
            productName: productData.name,
            description: productData.description,
            regularPrice: productData.regularPrice,
            discountAmount: discount.discountAmount, // Include discount amount
          };
        });

        const productsData = await Promise.all(productsPromises);
        setProduct(productsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleChange1 = (e) => {
    setDiscountAmount(e.target.value); // Update discount amount state with input value
  };

  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Prepare the data for update
      const updatedDiscount = {
        productId: productId,
        discountAmount: discountAmount,
      };
      // Send update request to server
      const res = await fetch(`/api/discount/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDiscount),
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

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      // Send delete request to server
      const res = await fetch(`/api/discount/delete/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      // Remove the deleted discount from the product state
      setProduct(product.filter((prod) => prod.productId !== productId));
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

        <div className="flex justify-center flex-row max-w-7xl mx-auto h-screen">
          <div className="basis-3/4 ml-8">
            <hr className="my-7 h-0.5 bg-searchBarBackground border-0 " />
            <div className="overflow-x-auto">
              <table className="table-auto w-11/12 bg-white shadow-md rounded-lg">
                <thead >
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
                    <th scope="col" className="px-6 py-3">
                      Discount Amount
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((prod, index) => (
                    <tr
                      key={prod.productId}
                      className={
                        index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                      }
                    >
                      <td className="px-3 py-4">{prod.productName}</td>
                      <td className="px-3 py-4">{prod.description}</td>
                      <td className="px-3 py-4">{prod.regularPrice}</td>
                      <td className="px-3 py-4">
                        <form
                          onSubmit={(e) => handleSubmit(e, prod.productId)} // Pass productId to handleSubmit
                          className="flex flex-col gap-4"
                        >
                          <input
                            type="text"
                            className="border p-3 rounded-lg"
                            placeholder={prod.discountAmount} // Bind input value to discountAmount state
                            onChange={handleChange1}
                          />

                          <button className="bg-backgreen4 text-white rounded-2xl">
                            {loading ? "Updating..." : "Update Discount"}
                          </button>
                        </form>
                      </td>
                      <td className="px-3 py-4">
                        <button
                          className="bg-red-500 text-white rounded-2xl"
                          onClick={() => handleDelete(prod.productId)}
                        >
                          {loading ? "Deleting..." : "Delete Discount"}
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
