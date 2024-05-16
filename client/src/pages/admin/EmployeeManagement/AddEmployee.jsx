import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-dashboard-layout-24.png";
import notification from "../../../images/icons8-notification-50.png";
import profilepic from "../../../images/219969.png";
import arrowicon from "../../../images/icons8-arrow-50.png";
import whitearrowicon from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

const positions = [
  "Order Management",
  "Product Management",
  "Supplier Management",
  "Customer Management",
  "Customer Care Management",
  "Payment Management",
  "Employee Management",
  "Category & Promotion Management",
];

export default function AddEmployee() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/employee/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <div className="flex max-h-max">
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}

        <Link to="/mainDashboard">
          <div className="flex justify-center items-center mb-8">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </div>
        </Link>

        {/* Separate Line */}
        <hr className="border-gray-700 my-4" />
        {/* Navigation */}
        <div className="space-y-1">
          <NavLink icon={dashboard} text="Main Dashboard" to="/empDashboard" />
          <NavLink icon={dashboard} text="Add Employees" to="/addEmployee" />
          <NavLink icon={dashboard} text="Employees" to="/employeeList" />
          <NavLink icon={dashboard} text="Employee Payment" to="/paymentList" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />
        

        <div className="p-3 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-40">
            <p className="text-sideNavText text-lg">Employee Name :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-2 rounded-lg bg-sideNavBackground basis-5/6"
                id="name"
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">NIC :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-2 rounded-lg bg-sideNavBackground basis-5/6"
                id="nic"
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">Email :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-2 rounded-lg bg-sideNavBackground basis-5/6"
                id="email"
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">Mobile :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-2 rounded-lg bg-sideNavBackground basis-5/6"
                id="mobile"
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">Salary {`(Basic)`} :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-2 rounded-lg bg-sideNavBackground basis-5/6"
                id="basicSlary"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <select
                id="position"
                onChange={handleChange}
                className="border p-2 rounded-lg bg-sideNavBackground basis-5/6"
              >
                <option value="">Select Position</option>
                {positions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-center items-center mt-10">
              <button
                disabled={loading}
                className="bg-buttonbackground text-white text-xl rounded-2xl p-3 text-center"
              >
                {loading ? "Adding..." : "Add Employee"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}


// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center text-white py-2 px-4 rounded-md bg-sideNavButton hover:bg-sideNavButtonhover"
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}
